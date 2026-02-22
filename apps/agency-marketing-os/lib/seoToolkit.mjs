import { promises as fs } from "node:fs";

import { generateWithLlm } from "./llm.mjs";
import { runMcpPlan } from "./mcp.mjs";

const DEFAULT_URLS = [
  "https://example.com/",
  "https://example.com/services",
  "https://example.com/contact"
];

const hoboSourcesPath = new URL("../../../knowledge-base/SOURCES.md", import.meta.url);
let cachedHoboBenchmarkLinks = null;

function cleanUrl(value) {
  const url = String(value || "").trim();
  return url || "";
}

function cleanUrls(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((u) => cleanUrl(u))
    .filter(Boolean)
    .slice(0, 25);
}

function cleanList(value, limit = 25) {
  if (Array.isArray(value)) {
    return value.map((v) => String(v || "").trim()).filter(Boolean).slice(0, limit);
  }
  return String(value || "")
    .split(/[\n,]+/)
    .map((v) => v.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function hostFromUrl(value) {
  const raw = cleanUrl(value);
  if (!raw) return "";
  try {
    const parsed = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    return parsed.hostname.replace(/^www\./i, "");
  } catch {
    return raw.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split("/")[0];
  }
}

function competitorNamesFromInput(input = {}, body = {}) {
  const fromInput = cleanList(input.competitors || []);
  const fromBody = cleanList(body.competitors || []);
  const fromUrls = cleanUrls(body.competitorUrls || []).map((url) => hostFromUrl(url));
  const all = [...fromInput, ...fromBody, ...fromUrls].filter(Boolean);
  const deduped = [];
  const seen = new Set();
  for (const item of all) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }
  return deduped.slice(0, 8);
}

function numFromString(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parseJsonFromText(text) {
  if (!text || typeof text !== "string") return null;
  try {
    return JSON.parse(text);
  } catch {
    // continue
  }

  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    try {
      return JSON.parse(fenced[1]);
    } catch {
      // continue
    }
  }

  const objectLike = text.match(/\{[\s\S]*\}$/);
  if (objectLike?.[0]) {
    try {
      return JSON.parse(objectLike[0]);
    } catch {
      return null;
    }
  }

  return null;
}

function normalizeQueryText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/[|:]+/g, " ")
    .trim();
}

function queryFromUrl(url) {
  const normalized = cleanUrl(url);
  if (!normalized) return "";
  try {
    const parsed = new URL(normalized.startsWith("http") ? normalized : `https://${normalized}`);
    const slug = parsed.pathname
      .split("/")
      .filter(Boolean)
      .pop() || "";
    return normalizeQueryText(slug.replace(/[-_]+/g, " "));
  } catch {
    return "";
  }
}

function queryFromSnapshot(snapshot = {}) {
  const h1 = normalizeQueryText(snapshot.h1);
  if (h1) return h1;

  const title = normalizeQueryText(snapshot.title);
  if (title) {
    return title
      .split(/[-|:•]/)[0]
      .trim();
  }

  return queryFromUrl(snapshot.url || "");
}

async function loadHoboBenchmarkLinks() {
  if (Array.isArray(cachedHoboBenchmarkLinks)) return cachedHoboBenchmarkLinks;
  try {
    const raw = await fs.readFile(hoboSourcesPath, "utf8");
    const lines = raw.split("\n");
    const links = [];
    for (const line of lines) {
      if (!line.includes("hobo-web.co.uk")) continue;
      const parts = line.split("|").map((v) => v.trim());
      if (parts.length < 4) continue;
      const topic = parts[1] || "";
      const url = parts[2] || "";
      const mappedSkills = parts[3] || "";
      if (!/^https?:\/\//i.test(url)) continue;
      links.push({
        topic,
        url,
        mappedSkills
      });
    }
    cachedHoboBenchmarkLinks = links.slice(0, 24);
    return cachedHoboBenchmarkLinks;
  } catch {
    cachedHoboBenchmarkLinks = [];
    return cachedHoboBenchmarkLinks;
  }
}

function benchmarkDimensionCatalog() {
  return [
    { id: "signal-coherence", description: "Title-H1-URL-intro alignment and topical intent clarity." },
    { id: "mustang-quality", description: "Initial document quality, completeness, and technical eligibility." },
    { id: "topicality-abc", description: "Anchors, body coverage, and click-aligned topical relevance." },
    { id: "navboost-readiness", description: "CTR potential, snippet clarity, and post-click satisfaction cues." },
    { id: "content-effort", description: "Depth, originality, structured sections, and content effort signals." },
    { id: "authority-signals", description: "Authority cues, trust markers, and internal/external evidence." },
    { id: "technical-hygiene", description: "Canonical/indexability/schema/mobile and basic technical integrity." }
  ];
}

function coreContextLines(input) {
  return [
    `- Agency: ${input.agencyName || "Agency"}`,
    `- Business: ${input.businessName || input.agencyName || "Not specified"}`,
    `- Website: ${input.website || "Not specified"}`,
    `- Market: ${input.market || "Not specified"}`,
    `- Geography: ${input.geography || "Not specified"}`,
    `- Product/service: ${input.product || "Not specified"}`,
    `- Target customer: ${input.targetCustomer || "Not specified"}`,
    `- Goal: ${input.goal || "full-funnel"}`,
    `- Budget: $${input.budget || 0}/month`,
    `- Capacity: ${input.capacity || 0} hours/week`,
    `- Constraints: ${input.constraints || "None specified"}`
  ];
}

function defaultScanResult(url, targetKeyword = "") {
  return {
    module: "scan",
    url,
    score: 62,
    targetKeyword,
    findings: [
      {
        category: "on-page",
        severity: "critical",
        issue: "Primary keyword is weak or missing in title/H1 alignment",
        recommendation: "Align title, H1, URL slug, and intro with the target keyword intent."
      },
      {
        category: "technical",
        severity: "warning",
        issue: "Schema coverage and social tags are incomplete",
        recommendation: "Add JSON-LD schema and complete Open Graph/Twitter metadata."
      },
      {
        category: "experience",
        severity: "warning",
        issue: "Content depth and intent coverage likely below top SERP competitors",
        recommendation: "Expand page with entity coverage, examples, and clear answer blocks."
      },
      {
        category: "authority",
        severity: "warning",
        issue: "Internal link prominence and authority signals are under-leveraged",
        recommendation: "Strengthen internal links from hub pages and add proof assets."
      }
    ],
    quickWins: [
      "Rewrite title/meta for stronger SERP CTR",
      "Fix heading hierarchy and keyword coherence",
      "Deploy schema markup for page type",
      "Add FAQ/answer blocks for AEO readiness"
    ],
    nextActions: [
      "Run competitor comparison on this URL",
      "Add this URL to weekly bulk scan tracking",
      "Track CTR and conversion changes after edits"
    ]
  };
}

function defaultBulkResult(urls) {
  const normalized = urls.length ? urls : DEFAULT_URLS;
  const rows = normalized.map((url, idx) => ({
    url,
    score: Math.max(45, 78 - idx * 6),
    criticalIssues: idx === 0 ? 2 : idx === 1 ? 1 : 0,
    topFix: idx === 0
      ? "Improve title/H1 coherence + schema"
      : idx === 1
        ? "Increase intent coverage and internal links"
        : "Tune snippets and AEO formatting"
  }));

  return {
    module: "bulk",
    summary: {
      totalUrls: rows.length,
      averageScore: Math.round(rows.reduce((sum, r) => sum + r.score, 0) / rows.length),
      criticalIssueUrls: rows.filter((r) => r.criticalIssues > 0).length
    },
    rows,
    recurringIssues: [
      "Title/H1 mismatch on commercial pages",
      "Missing or partial schema deployment",
      "Thin content on high-impression URLs"
    ],
    prioritizedFixQueue: [
      "Fix all critical metadata and heading issues",
      "Deploy schema on revenue pages",
      "Expand thin pages with intent-complete sections"
    ]
  };
}

function defaultCompareResult(primaryUrl, competitorUrls) {
  const comps = competitorUrls.length
    ? competitorUrls
    : ["https://competitor-a.example.com/page", "https://competitor-b.example.com/page"];

  return {
    module: "compare",
    primaryUrl,
    competitorUrls: comps,
    comparison: [
      {
        dimension: "Content depth",
        yourScore: 58,
        competitorAverage: 73,
        gap: -15,
        action: "Add missing intent sections, FAQs, and proof points."
      },
      {
        dimension: "Snippet quality (title/meta)",
        yourScore: 61,
        competitorAverage: 76,
        gap: -15,
        action: "Rewrite title/meta with tighter intent + benefit framing."
      },
      {
        dimension: "Schema and rich result readiness",
        yourScore: 54,
        competitorAverage: 70,
        gap: -16,
        action: "Implement page-type schema and validate."
      },
      {
        dimension: "Internal authority routing",
        yourScore: 57,
        competitorAverage: 68,
        gap: -11,
        action: "Add internal links from high-authority clusters."
      }
    ],
    strategicRecommendations: [
      "Ship metadata + schema fixes first for quick SERP lift.",
      "Close content intent gaps on primary conversion page.",
      "Improve internal authority flow from top organic pages."
    ]
  };
}

function defaultSchemaForType(input) {
  const pageType = String(input.pageType || "Service").trim();
  const pageUrl = input.pageUrl || input.website || "https://example.com";
  const orgName = input.organizationName || input.businessName || input.agencyName || "Example Business";
  const pageTitle = input.pageTitle || `${orgName} ${pageType}`;
  const pageDescription = input.pageDescription || `${pageTitle} - optimized structured data payload.`;

  if (pageType.toLowerCase() === "product") {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: pageTitle,
      description: pageDescription,
      image: input.imageUrl || "https://example.com/product.jpg",
      offers: {
        "@type": "Offer",
        priceCurrency: input.priceCurrency || "USD",
        price: input.price || "0",
        availability: "https://schema.org/InStock",
        url: pageUrl
      },
      brand: {
        "@type": "Brand",
        name: orgName
      }
    };
  }

  if (pageType.toLowerCase() === "article") {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pageTitle,
      description: pageDescription,
      datePublished: input.datePublished || new Date().toISOString().slice(0, 10),
      dateModified: input.dateModified || new Date().toISOString().slice(0, 10),
      author: {
        "@type": "Person",
        name: input.authorName || "Editorial Team"
      },
      publisher: {
        "@type": "Organization",
        name: orgName
      },
      mainEntityOfPage: pageUrl
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pageTitle,
    description: pageDescription,
    provider: {
      "@type": "Organization",
      name: orgName
    },
    areaServed: input.geography || "Global",
    url: pageUrl
  };
}

function defaultSchemaResult(input) {
  const schema = defaultSchemaForType(input);
  return {
    module: "schema",
    pageType: String(input.pageType || "Service"),
    schema,
    recommendations: [
      "Validate schema in Rich Results Test before deployment.",
      "Ensure content on page matches schema claims exactly.",
      "Pair schema deployment with snippet rewrite tests."
    ]
  };
}

function defaultAiVisibilityResult(urls) {
  const trackedUrls = urls.length ? urls : DEFAULT_URLS.slice(0, 2);
  return {
    module: "ai-visibility",
    baselineScore: 57,
    targetScore90d: 74,
    trackedUrls,
    findings: [
      "Answer formatting is inconsistent across key pages.",
      "Entity clarity and citation-ready facts are underdeveloped.",
      "FAQ and direct-response blocks are missing on high-intent pages."
    ],
    priorityActions: [
      "Add concise answer blocks for core commercial questions.",
      "Expand entity definitions and factual claim citations.",
      "Deploy FAQ schema where relevant."
    ]
  };
}

function defaultReportResult(input, modules = {}) {
  const scoreCandidates = [
    numFromString(modules.scan?.score, 0),
    numFromString(modules.bulk?.summary?.averageScore, 0),
    numFromString(modules.aiVisibility?.baselineScore, 0)
  ].filter((n) => n > 0);

  const overallScore = scoreCandidates.length
    ? Math.round(scoreCandidates.reduce((sum, n) => sum + n, 0) / scoreCandidates.length)
    : 61;

  return {
    module: "report",
    business: input.businessName || input.agencyName || "Business",
    overallSeoHealth: overallScore,
    topOpportunities: [
      "Fix metadata + heading coherence on revenue pages.",
      "Deploy schema and snippet upgrades for CTR lift.",
      "Improve AEO/GEO formatting for AI visibility gains."
    ],
    roadmap: {
      days1to30: [
        "Critical on-page and schema fixes",
        "Snippet rewrite tests for top pages",
        "Baseline tracking dashboard setup"
      ],
      days31to60: [
        "Competitor gap closure on intent coverage",
        "Internal authority routing improvements",
        "AEO answer block rollout"
      ],
      days61to90: [
        "Scale content cluster expansion",
        "AI visibility optimization cycle",
        "Monthly performance reporting and reprioritization"
      ]
    }
  };
}

function defaultMarketResearchResult(input, body = {}) {
  const competitors = competitorNamesFromInput(input, body);
  const market = input.market || input.industry || "Not specified";
  const geography = input.geography || "Primary market";
  const business = input.businessName || input.agencyName || "Business";
  const baseCompetitors = competitors.length ? competitors : ["Competitor A", "Competitor B", "Competitor C"];
  const facets = ["technical", "onPage", "content", "authority", "local", "aiVisibility"];
  const direction = {
    technical: "crawl/index speed",
    onPage: "title/H1/intent alignment",
    content: "semantic coverage and depth",
    authority: "link + brand signal strength",
    local: "local pack relevance and reviews",
    aiVisibility: "AEO/GEO answer readiness"
  };

  const competitorLandscape = baseCompetitors.map((name, idx) => {
    const base = 74 - idx * 6;
    const strengths = {};
    for (const facet of facets) {
      strengths[facet] = Math.max(48, Math.min(89, base + (facet === "content" ? 4 : 0) - (facet === "local" ? idx * 2 : 0)));
    }
    return {
      competitor: name,
      positioning: idx === 0 ? "premium authority leader" : idx === 1 ? "volume-focused growth challenger" : "niche local specialist",
      estimatedShareOfVoice: Math.max(8, 28 - idx * 7),
      strengths,
      weaknesses: [
        idx === 0 ? "Slow content refresh cadence on commercial pages" : "Inconsistent schema deployment on service templates",
        idx === 1 ? "Thin conversion intent coverage on high-value pages" : "Weak AI answer-block formatting and FAQ coverage"
      ]
    };
  });

  return {
    module: "market-research",
    business,
    market,
    geography,
    competitorLandscape,
    marketOpportunities: [
      {
        theme: "Commercial intent keyword clusters",
        rationale: "Competitors are ranking with weaker conversion paths; better intent matching can win clicks and leads.",
        estimatedImpact: "High",
        firstActions: [
          "Ship pillar + service-page clusters with transactional query mapping",
          "Improve title/meta angle around speed, trust, and outcomes",
          "Route internal links from authority pages into money pages"
        ]
      },
      {
        theme: "AI visibility and answer capture",
        rationale: "SERP competitors underutilize concise answer blocks and entity-rich evidence.",
        estimatedImpact: "Medium-high",
        firstActions: [
          "Add 40-80 word direct answers near top of key pages",
          "Embed FAQ + HowTo schema where intent is procedural",
          "Cite proprietary data points and named entity references"
        ]
      }
    ],
    facetPriorities: facets.map((facet, idx) => ({
      facet,
      whatItMeans: direction[facet],
      priority: idx < 2 ? "now" : idx < 4 ? "next" : "build",
      targetDelta90d: idx < 2 ? "+15" : "+10"
    })),
    strategyImplications: [
      "Prioritize pages with high impression potential but weak CTR first to generate faster gains.",
      "Pair technical and snippet fixes with stronger offer framing to convert organic demand.",
      "Build authority around 3 to 5 core service entities instead of spreading content too wide."
    ]
  };
}

function defaultGscProfileAuditResult(input, body = {}) {
  const propertyUrl = cleanUrl(body.propertyUrl || input.website || "https://example.com");
  const market = input.market || input.industry || "General";
  return {
    module: "gsc-profile-audit",
    propertyUrl,
    market,
    profileChecks: [
      {
        area: "Property setup",
        status: "warning",
        issue: "Domain property and URL-prefix property parity may be incomplete.",
        businessImpact: "Partial data coverage can hide indexing and performance issues.",
        fixes: [
          "Verify a domain-level property exists and is validated.",
          "Confirm all protocol/hostname variants are associated.",
          "Align property naming convention across environments."
        ]
      },
      {
        area: "Indexing hygiene",
        status: "critical",
        issue: "High-probability crawl/index drift between sitemap URLs and live templates.",
        businessImpact: "Revenue pages can remain unindexed or indexed with stale variants.",
        fixes: [
          "Submit clean sitemap index with canonical URLs only.",
          "Investigate Excluded/Discovered-not-indexed clusters by template type.",
          "Patch canonical/noindex conflicts on low-value filters and parameter pages."
        ]
      },
      {
        area: "Performance segmentation",
        status: "warning",
        issue: "Query and page performance is likely tracked at aggregate level only.",
        businessImpact: "Missed opportunities for low-CTR, high-impression queries.",
        fixes: [
          "Build saved views by intent type: informational, commercial, transactional.",
          "Create weekly watchlist of pages with >2k impressions and CTR below market baseline.",
          "Track top devices and geos separately to isolate SERP snippet mismatch."
        ]
      },
      {
        area: "International / geo targeting",
        status: "good",
        issue: "No critical geo targeting blockers detected from provided context.",
        businessImpact: "N/A",
        fixes: [
          "Maintain hreflang and region-specific URL consistency if multi-region.",
          "Monitor country-level query drift monthly."
        ]
      }
    ],
    queryOpportunityQueue: [
      {
        queryType: "High impression / low CTR commercial terms",
        action: "Rewrite title + meta + first-screen value proposition",
        expectedOutcome: "CTR lift in 14-28 days"
      },
      {
        queryType: "Mid-position rankings (positions 8-20)",
        action: "Expand intent coverage and tighten internal links from hub pages",
        expectedOutcome: "Ranking lift and more qualified clicks"
      },
      {
        queryType: "Long-tail informational queries with assisted conversions",
        action: "Add answer blocks + CTA bridge into service pages",
        expectedOutcome: "Higher lead assist rate"
      }
    ],
    governanceCadence: {
      weekly: ["Index coverage anomalies", "Query CTR watchlist", "Core money-page performance"],
      monthly: ["Template-level technical QA", "SERP snippet experiments", "Entity and FAQ coverage expansion"]
    }
  };
}

function scoreTitle(title, keyword) {
  const normalized = String(title || "").trim();
  const len = normalized.length;
  const containsKeyword = keyword && normalized.toLowerCase().includes(keyword.toLowerCase());
  let score = 58;
  if (len >= 45 && len <= 62) score += 18;
  if (containsKeyword) score += 12;
  if (/[0-9]/.test(normalized)) score += 5;
  if (/\b(guide|best|checklist|services|pricing|audit|strategy)\b/i.test(normalized)) score += 5;
  return Math.min(95, score);
}

function scoreMeta(meta, keyword) {
  const normalized = String(meta || "").trim();
  const len = normalized.length;
  const containsKeyword = keyword && normalized.toLowerCase().includes(keyword.toLowerCase());
  let score = 55;
  if (len >= 140 && len <= 165) score += 20;
  if (containsKeyword) score += 10;
  if (/\b(learn|discover|get|book|request|download|compare)\b/i.test(normalized)) score += 7;
  return Math.min(95, score);
}

function defaultSnippetLabResult(input, body = {}) {
  const pageUrl = cleanUrl(body.pageUrl || input.website || "https://example.com");
  const keyword = String(body.primaryKeyword || body.targetKeyword || "commercial lead generation").trim();
  const business = input.businessName || input.agencyName || "Business";
  const titleVariants = [
    `${keyword} for ${business}: Strategy + Execution Checklist`,
    `Best ${keyword}: Proven Framework to Increase Qualified Leads`,
    `${business} ${keyword} Services | Results-Driven Growth Plan`
  ].map((title) => ({
    title,
    length: title.length,
    score: scoreTitle(title, keyword)
  }));
  const metaDescriptionVariants = [
    `Need better ${keyword}? Get a full market analysis, competitor breakdown, and 90-day execution roadmap built for measurable growth.`,
    `Discover how to improve ${keyword} with on-page fixes, technical cleanup, authority building, and AI visibility optimization.`,
    `${business} helps teams scale ${keyword} with data-led SEO strategy, conversion-focused pages, and clear weekly implementation plans.`
  ].map((metaDescription) => ({
    metaDescription,
    length: metaDescription.length,
    score: scoreMeta(metaDescription, keyword)
  }));

  return {
    module: "snippet-lab",
    pageUrl,
    primaryKeyword: keyword,
    titleVariants,
    metaDescriptionVariants,
    recommendedSnippet: {
      title: titleVariants.slice().sort((a, b) => b.score - a.score)[0].title,
      metaDescription: metaDescriptionVariants.slice().sort((a, b) => b.score - a.score)[0].metaDescription
    },
    implementationChecklist: [
      "Match page H1 and first paragraph promise to snippet messaging.",
      "Ensure schema and Open Graph description are consistent.",
      "Test 2 variants for 14 days and keep the CTR winner."
    ]
  };
}

function defaultContentAnalysisResult({
  input,
  url,
  primaryQuery,
  targetSnapshot,
  serpPages = [],
  hoboLinks = []
}) {
  const query = primaryQuery || queryFromSnapshot(targetSnapshot) || "primary query";
  const topPages = serpPages.length
    ? serpPages
    : [
      { rank: 1, url: "https://example.org/article-a", title: "Competitor Guide A", domain: "example.org", whyRanking: "Strong topic depth and trust signals" },
      { rank: 2, url: "https://example.net/article-b", title: "Competitor Guide B", domain: "example.net", whyRanking: "Clear structure and high intent match" }
    ];

  return {
    module: "content-analysis",
    url,
    detectedPrimaryQuery: query,
    searchIntent: "informational-commercial",
    benchmarkDimensions: benchmarkDimensionCatalog(),
    targetSnapshot: targetSnapshot || {},
    topPagesAnalyzed: topPages.slice(0, 5),
    competitorPatternSummary: [
      "Top pages front-load direct answers and match title/H1 to query intent.",
      "High-ranking pages use stronger section hierarchy and richer evidence blocks.",
      "Authority and trust indicators are explicit near the top of content."
    ],
    comparativeFindings: [
      {
        area: "Signal coherence",
        targetStatus: "warning",
        gap: "Title/H1/query alignment is weaker than top SERP pages.",
        evidence: "Top competitors use exact or tightly aligned query language in first screen.",
        recommendation: "Align title, H1, URL slug, and intro around one primary intent phrase."
      },
      {
        area: "Content effort",
        targetStatus: "warning",
        gap: "Content depth and entity coverage trail SERP leaders.",
        evidence: "Top pages typically include broader subtopic coverage and richer examples.",
        recommendation: "Expand content with missing subtopics, answer blocks, and original proof."
      },
      {
        area: "NavBoost readiness",
        targetStatus: "critical",
        gap: "Snippet promise and above-the-fold clarity likely reduce CTR and dwell quality.",
        evidence: "Competitors emphasize stronger SERP hooks and cleaner opening framing.",
        recommendation: "Rewrite title/meta + first 120 words to improve click satisfaction signals."
      }
    ],
    benchmarkScore: {
      overall: 63,
      signalCoherence: 58,
      contentEffort: 61,
      navboostReadiness: 55,
      authoritySignals: 67,
      technicalHygiene: 74
    },
    prioritizedFixes: [
      { priority: "critical", fix: "Rebuild title/H1/intro coherence around primary query", owner: "seo-content-lead", effort: "low", expectedImpact: "CTR + relevance lift" },
      { priority: "high", fix: "Add missing subtopics based on top-5 structure map", owner: "content-strategist", effort: "medium", expectedImpact: "Topical depth + ranking uplift" },
      { priority: "high", fix: "Improve trust/authority cues and proof elements", owner: "editor", effort: "medium", expectedImpact: "Higher quality and conversion confidence" }
    ],
    implementationRoadmap: {
      days1to7: [
        "Rewrite title/meta/H1 and intro alignment for target query",
        "Fix section hierarchy for scanability and answer-first flow"
      ],
      days8to30: [
        "Expand subtopic/entity coverage based on top-5 competitor structures",
        "Add FAQ/answer blocks and internal links from relevant hubs"
      ],
      days31to60: [
        "Run snippet and intro A/B tests from GSC low-CTR opportunities",
        "Refresh content with proof updates and monitor CTR + rank deltas"
      ]
    },
    benchmarkSources: hoboLinks.slice(0, 10)
  };
}

function defaultFullAuditResult(input, modules = {}) {
  const overallScore = Math.round((
    numFromString(modules.scan?.score, 60) +
    numFromString(modules.bulk?.summary?.averageScore, 60) +
    numFromString(modules.aiVisibility?.baselineScore, 55)
  ) / 3);

  return {
    module: "full-audit",
    business: input.businessName || input.agencyName || "Business",
    market: input.market || input.industry || "Not specified",
    overallScore,
    executiveSummary: [
      "Core SEO growth ceiling is driven by mixed intent coverage and incomplete technical consistency.",
      "Fastest gains are available through snippet CTR upgrades, index hygiene cleanup, and authority routing.",
      "AI visibility uplift depends on answer-ready formatting and stronger entity/citation confidence."
    ],
    components: modules,
    priorityPlan: {
      days1to14: [
        "Resolve index/canonical conflicts on top templates",
        "Deploy new title/meta set on highest-impression pages",
        "Fix schema coverage gaps on money pages"
      ],
      days15to45: [
        "Ship competitor gap pages and intent-complete service content",
        "Strengthen internal links from authority clusters",
        "Run weekly GSC query optimization loop"
      ],
      days46to90: [
        "Scale topical clusters and link acquisition cadence",
        "Expand AI answer blocks + entity reinforcement",
        "Institutionalize SEO QA and reporting cadence"
      ]
    },
    kpiTargets90d: {
      organicCtrDelta: "+20-35%",
      top10KeywordGrowth: "+25-40%",
      leadConversionFromOrganic: "+15-25%",
      aiVisibilityScore: "+12-20 points"
    }
  };
}

function isObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function mergeWithFallback(fallback, candidate) {
  if (Array.isArray(fallback)) {
    return Array.isArray(candidate) && candidate.length ? candidate : fallback;
  }

  if (isObject(fallback)) {
    const next = {};
    const keys = new Set([
      ...Object.keys(fallback || {}),
      ...Object.keys(isObject(candidate) ? candidate : {})
    ]);
    for (const key of keys) {
      const fallbackValue = fallback?.[key];
      const candidateValue = isObject(candidate) ? candidate[key] : undefined;
      if (fallbackValue === undefined) {
        next[key] = candidateValue;
      } else {
        next[key] = mergeWithFallback(fallbackValue, candidateValue);
      }
    }
    return next;
  }

  if (candidate === undefined || candidate === null || candidate === "") {
    return fallback;
  }

  return candidate;
}

function compactText(value, maxChars = 260) {
  const clean = String(value || "").replace(/\s+/g, " ").trim();
  if (!clean) return "";
  return clean.length <= maxChars ? clean : `${clean.slice(0, maxChars)}...`;
}

function normalizeUrl(url) {
  const raw = cleanUrl(url);
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

function uniqueValues(values) {
  const output = [];
  const seen = new Set();
  for (const item of values || []) {
    const value = String(item || "").trim();
    if (!value) continue;
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(value);
  }
  return output;
}

function stripHtmlTags(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(html, regex, fallback = "") {
  const match = String(html || "").match(regex);
  return compactText(match?.[1] || fallback, 320);
}

async function fetchPageSnapshot(url) {
  const normalized = normalizeUrl(url);
  if (!normalized) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);

  try {
    const response = await fetch(normalized, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "User-Agent": "AgencyMarketingOS/1.0 (+SEO Toolkit)"
      }
    });
    const html = await response.text();
    const text = stripHtmlTags(html);
    const schemaMatches = html.match(/<script[^>]*application\/ld\+json[^>]*>/gi) || [];

    return {
      url: normalized,
      status: response.status,
      ok: response.ok,
      title: extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i, ""),
      metaDescription: extractTag(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i, ""),
      h1: extractTag(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i, ""),
      canonical: extractTag(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i, ""),
      hasRobotsNoindex: /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html),
      schemaBlocks: schemaMatches.length,
      textWordEstimate: text ? text.split(/\s+/).length : 0
    };
  } catch (error) {
    return {
      url: normalized,
      ok: false,
      status: 0,
      error: compactText(error?.message || "Failed to fetch page snapshot", 180)
    };
  } finally {
    clearTimeout(timeout);
  }
}

const modulePlanMap = {
  scan: [
    { tool: "google-search-console", query: "Top queries, page CTR gaps, and ranking trend for target URL over 90 days." },
    { tool: "semrush", query: "Domain and URL-level organic visibility, keyword positions, and SERP volatility." },
    { tool: "ga4", query: "Organic landing session quality and conversion contribution for target page." }
  ],
  bulk: [
    { tool: "google-search-console", query: "Top pages by impressions/clicks and low CTR opportunities grouped by template." },
    { tool: "ga4", query: "Top organic landing pages by sessions and conversion rate with engagement split." },
    { tool: "semrush", query: "Site-wide keyword and page-level opportunity clusters for bulk prioritization." }
  ],
  compare: [
    { tool: "semrush", query: "Competitor keyword overlap, shared SERP positions, and ranking deltas against target." },
    { tool: "ahrefs", query: "Backlink strength, referring domain gap, and content gap between domains/pages." },
    { tool: "google-search-console", query: "Queries where target page ranks but underperforms CTR vs expected." }
  ],
  schema: [
    { tool: "google-search-console", query: "Rich result eligibility cues and pages likely to benefit from schema upgrades." }
  ],
  "ai-visibility": [
    { tool: "google-search-console", query: "Question-based query clusters and featured-snippet/FAQ opportunities." },
    { tool: "semrush", query: "SERP feature ownership trends and answer intent keyword opportunities." }
  ],
  "market-research": [
    { tool: "google-search-console", query: "Query clusters, CTR gaps, and page-level opportunity map for last 90 days." },
    { tool: "ahrefs", query: "Competitor authority trends, backlink gaps, and top referring domain opportunities." },
    { tool: "semrush", query: "SERP overlap, ranking trend deltas, and keyword portfolio opportunities." },
    { tool: "ga4", query: "Organic landing-page conversion performance and assisted conversion contribution." }
  ],
  "gsc-profile-audit": [
    { tool: "google-search-console", query: "Property health audit: coverage, pages, queries, countries, devices, and trends." },
    { tool: "ga4", query: "Organic landing pages and conversion contribution for GSC-reported pages." }
  ],
  "snippet-lab": [
    { tool: "google-search-console", query: "High-impression / low-CTR query-page pairs for snippet rewrite tests." },
    { tool: "semrush", query: "SERP title/meta pattern benchmarks for top ranking competitor pages." }
  ],
  "content-analysis": [
    { tool: "google-search-console", query: "Top queries and pages for this URL/topic with CTR and position trends." },
    { tool: "semrush", query: "Top ranking pages and keyword landscape for the target query cluster." },
    { tool: "ahrefs", query: "Top competing pages and link authority indicators for query leaders." },
    { tool: "ga4", query: "Landing page engagement and conversion quality for the analyzed URL." }
  ],
  "full-audit": [
    { tool: "google-search-console", query: "Full property performance map by query, page, device, and country." },
    { tool: "ga4", query: "Organic channel quality and conversion funnel map with page cohorts." },
    { tool: "semrush", query: "Domain/competitor keyword and visibility trend map." },
    { tool: "ahrefs", query: "Domain authority and backlink gap map for market leaders." }
  ],
  report: [
    { tool: "google-search-console", query: "Executive trend summary for impressions, clicks, CTR, and top query themes." },
    { tool: "ga4", query: "Organic contribution to leads/revenue and page-level conversion opportunity map." },
    { tool: "semrush", query: "Competitive share-of-voice and ranking momentum summary." }
  ]
};

function buildModulePlan(moduleId, input = {}) {
  const basePlan = modulePlanMap[moduleId] || [];
  const selectedIntegrations = Array.isArray(input?.selectedIntegrations)
    ? input.selectedIntegrations.map((tool) => String(tool || "").trim().toLowerCase()).filter(Boolean)
    : [];

  const seen = new Set(basePlan.map((item) => String(item.tool || "").toLowerCase()));
  const selectedPlan = [];
  for (const tool of selectedIntegrations) {
    if (seen.has(tool)) continue;
    selectedPlan.push({
      tool,
      query: `Provide SEO-relevant indicators for ${moduleId} analysis including major deltas and anomalies for last 90 days.`
    });
    seen.add(tool);
  }

  return [...basePlan, ...selectedPlan];
}

function summarizeMcpResults(mcp) {
  if (!mcp || mcp.status !== "ok") {
    return {
      status: mcp?.status || "error",
      note: mcp?.note || "No MCP data returned",
      toolCount: 0,
      tools: []
    };
  }

  const results = Array.isArray(mcp.results) ? mcp.results : [];
  const tools = results.map((item) => ({
    tool: String(item?.tool || item?.provider || "unknown"),
    status: String(item?.status || "ok"),
    summary: compactText(item?.summary || item?.result || item?.output || item?.data || "Data received", 180)
  }));
  const liveTools = tools.filter((item) => item.status === "ok");
  const nonLiveTools = tools.filter((item) => item.status !== "ok");
  const effectiveStatus = liveTools.length ? "ok" : (tools.length ? "partial" : "error");

  return {
    status: effectiveStatus,
    note: liveTools.length
      ? `Collected live integration data from ${liveTools.length}/${tools.length} sources`
      : (tools.length ? "No live integration data sources returned; using fallbacks" : "No integration data sources returned"),
    toolCount: tools.length,
    liveToolCount: liveTools.length,
    nonLiveToolCount: nonLiveTools.length,
    tools
  };
}

function fallbackWebSignals({ moduleId, input, primaryUrl, competitors = [] }) {
  return {
    module: moduleId,
    querySummary: `Fallback web signal synthesis for ${input.market || input.industry || "market"}.`,
    highIntentQueries: [
      `${input.product || "service"} pricing`,
      `${input.product || "service"} near me`,
      `${input.product || "service"} best provider`
    ],
    competitorSignals: competitors.slice(0, 4).map((url, idx) => ({
      source: `Competitor ${idx + 1}`,
      url,
      publishedDate: "",
      signal: "Competing pages emphasize trust, proof, and clearer commercial intent alignment.",
      implication: "Prioritize snippet quality and conversion-focused intent coverage."
    })),
    localSignals: [
      "Local pack and map results favor businesses with stronger review and service-area clarity.",
      "Pages with explicit geo terms and proof elements are gaining more click share."
    ],
    trendSignals: [
      "Question-style queries continue to grow for high-intent service discovery.",
      "AI-search exposure favors concise answer blocks and entity clarity."
    ],
    sources: primaryUrl ? [{ title: "Primary URL", url: primaryUrl }] : []
  };
}

async function runWebSignalResearch({ moduleId, input, primaryUrl, competitorUrls = [] }) {
  if (process.env.MARKET_RESEARCH_WITH_WEB === "false") {
    return {
      result: fallbackWebSignals({ moduleId, input, primaryUrl, competitors: competitorUrls }),
      llm: { ok: false, reason: "web_disabled" },
      usedFallback: true
    };
  }

  const fallback = fallbackWebSignals({ moduleId, input, primaryUrl, competitors: competitorUrls });
  const prompt = [
    "Collect real-time SEO market signals and return strict JSON.",
    `- Module: ${moduleId}`,
    `- Business: ${input.businessName || input.agencyName || "Business"}`,
    `- Website: ${primaryUrl || input.website || "Not specified"}`,
    `- Market: ${input.market || input.industry || "Not specified"}`,
    `- Geography: ${input.geography || "Not specified"}`,
    `- Product: ${input.product || "Not specified"}`,
    `- Competitor URLs: ${competitorUrls.length ? competitorUrls.join(", ") : "None provided"}`,
    "",
    "Return strict JSON with shape:",
    "{ module, querySummary, highIntentQueries:[...], competitorSignals:[{source,url,publishedDate,signal,implication}], localSignals:[...], trendSignals:[...], sources:[{title,url,publishedDate}] }"
  ].join("\n");

  const llm = await generateWithLlm({
    system: "You are an SEO research analyst. Use web results and return only valid JSON.",
    prompt,
    maxOutputTokens: 2200,
    tools: [{ type: "web_search_preview" }]
  });

  if (!llm.ok) {
    return { result: fallback, llm, usedFallback: true };
  }

  const parsed = parseJsonFromText(llm.text);
  if (!parsed || typeof parsed !== "object") {
    return { result: fallback, llm, usedFallback: true };
  }

  return { result: mergeWithFallback(fallback, parsed), llm, usedFallback: false };
}

async function inferPrimaryQuery({ input, targetSnapshot, explicitQuery = "" }) {
  const fromInput = normalizeQueryText(explicitQuery || input?.targetKeyword || "");
  if (fromInput) {
    return {
      primaryQuery: fromInput,
      searchIntent: "mixed",
      reason: "user-specified"
    };
  }

  const fallbackQuery = queryFromSnapshot(targetSnapshot) || queryFromUrl(input?.website || "") || "primary topic";
  const prompt = [
    "Infer the primary target search query for this page and classify intent.",
    `- URL: ${targetSnapshot?.url || input?.website || "Not specified"}`,
    `- Title: ${targetSnapshot?.title || "Not specified"}`,
    `- H1: ${targetSnapshot?.h1 || "Not specified"}`,
    `- Meta description: ${targetSnapshot?.metaDescription || "Not specified"}`,
    "",
    "Return strict JSON: { primaryQuery, searchIntent, reason }"
  ].join("\n");

  const llm = await generateWithLlm({
    system: "You are an SEO query-mapping analyst. Return only valid JSON.",
    prompt,
    maxOutputTokens: 300
  });

  if (!llm.ok) {
    return {
      primaryQuery: fallbackQuery,
      searchIntent: "mixed",
      reason: "fallback"
    };
  }

  const parsed = parseJsonFromText(llm.text);
  if (!parsed || typeof parsed !== "object") {
    return {
      primaryQuery: fallbackQuery,
      searchIntent: "mixed",
      reason: "fallback"
    };
  }

  return {
    primaryQuery: normalizeQueryText(parsed.primaryQuery) || fallbackQuery,
    searchIntent: normalizeQueryText(parsed.searchIntent) || "mixed",
    reason: normalizeQueryText(parsed.reason) || "llm"
  };
}

async function runLiveSerpCapture({ query, primaryUrl = "", fallbackUrls = [] }) {
  const fallbackTopPages = uniqueValues([
    ...fallbackUrls,
    primaryUrl
  ])
    .filter(Boolean)
    .slice(0, 5)
    .map((url, idx) => ({
      rank: idx + 1,
      url,
      title: hostFromUrl(url),
      domain: hostFromUrl(url),
      whyRanking: "Fallback source (no live search result available)"
    }));

  if (!query || process.env.MARKET_RESEARCH_WITH_WEB === "false") {
    return {
      usedFallback: true,
      llm: { ok: false, reason: "web_disabled_or_missing_query" },
      query,
      topPages: fallbackTopPages
    };
  }

  const prompt = [
    "Find the current top 5 organic pages for this search query.",
    `- Query: ${query}`,
    `- Primary URL under analysis: ${primaryUrl || "Not specified"}`,
    "",
    "Rules:",
    "- Prefer organic pages, not ads.",
    "- Include government/authority domains only if they are genuinely ranking.",
    "- Return strict JSON only.",
    "",
    "Return shape:",
    "{ query, topPages:[{ rank, url, title, domain, whyRanking }] }"
  ].join("\n");

  const llm = await generateWithLlm({
    system: "You are a SERP research analyst. Use web search and return only valid JSON.",
    prompt,
    maxOutputTokens: 1200,
    tools: [{ type: "web_search_preview" }]
  });

  if (!llm.ok) {
    return {
      usedFallback: true,
      llm,
      query,
      topPages: fallbackTopPages
    };
  }

  const parsed = parseJsonFromText(llm.text);
  const topPages = Array.isArray(parsed?.topPages)
    ? parsed.topPages
      .map((item, idx) => ({
        rank: Number(item?.rank) || idx + 1,
        url: normalizeUrl(item?.url || ""),
        title: compactText(item?.title || "", 180),
        domain: hostFromUrl(item?.url || ""),
        whyRanking: compactText(item?.whyRanking || "", 200)
      }))
      .filter((item) => item.url)
      .slice(0, 5)
    : [];

  if (!topPages.length) {
    return {
      usedFallback: true,
      llm,
      query,
      topPages: fallbackTopPages
    };
  }

  return {
    usedFallback: false,
    llm,
    query: normalizeQueryText(parsed?.query || query),
    topPages
  };
}

function buildEvidenceWorkflow({ moduleId, mcpSummary, snapshots, webUsedFallback }) {
  const fetchedPages = snapshots.filter((item) => item && item.ok).length;
  const integrationStepStatus = mcpSummary.status === "ok"
    ? "completed"
    : (mcpSummary.status === "partial" ? "partial" : "fallback");
  return [
    {
      step: `${moduleId}: integration telemetry`,
      status: integrationStepStatus,
      detail: mcpSummary.note
    },
    {
      step: `${moduleId}: page snapshot crawl`,
      status: fetchedPages > 0 ? "completed" : "partial",
      detail: `Fetched ${fetchedPages}/${snapshots.length} URL snapshots`
    },
    {
      step: `${moduleId}: real-time web signals`,
      status: webUsedFallback ? "fallback" : "completed",
      detail: webUsedFallback ? "Fallback web synthesis used" : "Live web signal synthesis completed"
    }
  ];
}

async function collectSeoEvidence({
  moduleId,
  input,
  body,
  primaryUrl = "",
  urls = [],
  competitorUrls = [],
  sharedEvidence = null
}) {
  if (sharedEvidence) return sharedEvidence;

  const allUrls = uniqueValues([
    primaryUrl,
    ...urls,
    ...competitorUrls,
    input.website
  ]).slice(0, 6);

  const snapshots = (await Promise.all(allUrls.map((url) => fetchPageSnapshot(url))))
    .filter(Boolean);

  const mcpPlan = buildModulePlan(moduleId, input);
  const mcp = mcpPlan.length
    ? await runMcpPlan({ plan: mcpPlan, inputContext: { ...input, moduleId, ...body } })
    : { status: "skipped", results: [], plannedQueries: [] };

  const mcpSummary = summarizeMcpResults(mcp);
  const web = await runWebSignalResearch({
    moduleId,
    input,
    primaryUrl,
    competitorUrls
  });

  const sourcesUsed = uniqueValues([
    ...mcpSummary.tools.map((item) => item.tool),
    ...snapshots.filter((item) => item.ok).map((item) => item.url),
    ...(Array.isArray(web.result?.sources) ? web.result.sources.map((source) => source.url) : [])
  ]);

  const confidence = (() => {
    let score = 0.35;
    if (mcpSummary.liveToolCount >= 2) score += 0.3;
    else if (mcpSummary.liveToolCount === 1) score += 0.15;
    if (snapshots.some((item) => item.ok)) score += 0.2;
    if (!web.usedFallback) score += 0.15;
    return Math.min(0.95, Number(score.toFixed(2)));
  })();

  return {
    moduleId,
    collectedAt: new Date().toISOString(),
    mcp,
    mcpSummary,
    pageSnapshots: snapshots,
    web: web.result,
    webUsedFallback: web.usedFallback,
    webLlm: web.llm,
    workflow: buildEvidenceWorkflow({
      moduleId,
      mcpSummary,
      snapshots,
      webUsedFallback: web.usedFallback
    }),
    sourcesUsed,
    confidence
  };
}

function getEvidencePayload(evidence) {
  return {
    collectedAt: evidence.collectedAt,
    confidence: evidence.confidence,
    integrationSummary: evidence.mcpSummary,
    pageSnapshots: evidence.pageSnapshots,
    webSignals: evidence.web
  };
}

function withModuleMeta({ moduleId, response, evidence }) {
  return {
    module: moduleId,
    ...response,
    mcp: evidence.mcp,
    workflow: evidence.workflow,
    sourcesUsed: evidence.sourcesUsed,
    confidence: evidence.confidence,
    evidence: getEvidencePayload(evidence)
  };
}

async function llmJsonOrFallback({
  system,
  prompt,
  fallback,
  maxOutputTokens = 1800,
  withWeb = false,
  providerPreference = "auto"
}) {
  const llm = await generateWithLlm({
    system,
    prompt,
    maxOutputTokens,
    providerPreference,
    tools: withWeb ? [{ type: "web_search_preview" }] : null
  });

  if (!llm.ok) {
    return { result: fallback, usedFallback: true, llm };
  }

  const parsed = parseJsonFromText(llm.text);
  if (!parsed || typeof parsed !== "object") {
    return { result: fallback, usedFallback: true, llm };
  }

  return {
    result: mergeWithFallback(fallback, parsed),
    usedFallback: false,
    llm
  };
}

export function getSeoToolkitModules() {
  return [
    { id: "scan", path: "/api/seo/scan", description: "Single URL SEO scanner diagnostics" },
    { id: "bulk", path: "/api/seo/bulk", description: "Batch URL scan with prioritization" },
    { id: "compare", path: "/api/seo/compare", description: "Primary URL vs competitor URL comparison" },
    { id: "schema", path: "/api/seo/schema", description: "Schema payload generation and guidance" },
    { id: "ai-visibility", path: "/api/seo/ai-visibility", description: "AEO/GEO/AI visibility analysis" },
    { id: "market-research", path: "/api/seo/market-research", description: "Competitor + market intelligence across SEO facets" },
    { id: "gsc-profile-audit", path: "/api/seo/gsc-profile-audit", description: "Google Search Console profile and opportunity audit" },
    { id: "snippet-lab", path: "/api/seo/snippet-lab", description: "Title + meta description variant lab with scoring" },
    { id: "content-analysis", path: "/api/seo/content-analysis", description: "URL content benchmark vs top-5 SERP using Hobo-Web signal framework" },
    { id: "full-audit", path: "/api/seo/full-audit", description: "Unified SEO command audit with 90-day roadmap" },
    { id: "report", path: "/api/seo/report", description: "Master SEO report and roadmap synthesis" }
  ];
}

export async function runSeoScan(input, body = {}, options = {}) {
  const url = cleanUrl(body.url || input.website || DEFAULT_URLS[0]);
  const targetKeyword = String(body.targetKeyword || "").trim();
  const fallback = defaultScanResult(url, targetKeyword);
  const evidence = await collectSeoEvidence({
    moduleId: "scan",
    input,
    body,
    primaryUrl: url,
    urls: [url],
    competitorUrls: cleanUrls(body.competitorUrls),
    sharedEvidence: options.sharedEvidence || null
  });

  const prompt = [
    "Run an end-to-end SEO scanner analysis with implementation depth.",
    ...coreContextLines(input),
    `- URL: ${url}`,
    `- Target keyword: ${targetKeyword || "Not specified"}`,
    "",
    "Collected evidence:",
    JSON.stringify(getEvidencePayload(evidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, url, score, targetKeyword, findings:[{category,severity,issue,recommendation}], quickWins:[...], nextActions:[...], severitySummary:{critical,warning,good}, implementationPlan:[{owner,action,dueInDays,kpi}], skillRouting:[...] }"
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are an SEO auditing specialist. Return only valid JSON with specific actions and owners.",
    prompt,
    fallback,
    maxOutputTokens: 2200
  });

  return withModuleMeta({
    moduleId: "scan",
    response,
    evidence
  });
}

export async function runSeoBulk(input, body = {}, options = {}) {
  const urls = cleanUrls(body.urls);
  const normalizedUrls = urls.length ? urls : DEFAULT_URLS;
  const fallback = defaultBulkResult(urls);
  const evidence = await collectSeoEvidence({
    moduleId: "bulk",
    input,
    body,
    primaryUrl: normalizedUrls[0],
    urls: normalizedUrls,
    competitorUrls: cleanUrls(body.competitorUrls),
    sharedEvidence: options.sharedEvidence || null
  });

  const prompt = [
    "Run bulk SEO analysis across multiple URLs and produce an implementation queue.",
    ...coreContextLines(input),
    `- URLs: ${normalizedUrls.join(", ")}`,
    "",
    "Collected evidence:",
    JSON.stringify(getEvidencePayload(evidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, summary:{totalUrls,averageScore,criticalIssueUrls}, rows:[{url,score,criticalIssues,topFix}], recurringIssues:[...], prioritizedFixQueue:[...], templateClusters:[{template,issuePattern,count,priority}], sprintPlan:[{week,owner,deliverables:[...]}] }"
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are an SEO operations analyst. Return only valid JSON.",
    prompt,
    fallback,
    maxOutputTokens: 2400
  });

  return withModuleMeta({
    moduleId: "bulk",
    response,
    evidence
  });
}

export async function runSeoCompare(input, body = {}, options = {}) {
  const primaryUrl = cleanUrl(body.primaryUrl || input.website || DEFAULT_URLS[0]);
  const competitorUrls = cleanUrls(body.competitorUrls);
  const fallback = defaultCompareResult(primaryUrl, competitorUrls);
  const evidence = await collectSeoEvidence({
    moduleId: "compare",
    input,
    body,
    primaryUrl,
    urls: [primaryUrl],
    competitorUrls,
    sharedEvidence: options.sharedEvidence || null
  });

  const prompt = [
    "Compare the primary URL against competitors across SEO dimensions with action depth.",
    ...coreContextLines(input),
    `- Primary URL: ${primaryUrl}`,
    `- Competitor URLs: ${(competitorUrls.length ? competitorUrls : ["https://competitor-a.example.com/page", "https://competitor-b.example.com/page"]).join(", ")}`,
    "",
    "Collected evidence:",
    JSON.stringify(getEvidencePayload(evidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, primaryUrl, competitorUrls, comparison:[{dimension,yourScore,competitorAverage,gap,action}], strategicRecommendations:[...], keywordGapThemes:[{theme,whyItMatters,executionMove}] }"
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are an SEO competitive analyst. Return only valid JSON.",
    prompt,
    fallback,
    maxOutputTokens: 2200
  });

  return withModuleMeta({
    moduleId: "compare",
    response,
    evidence
  });
}

export async function runSeoSchema(input, body = {}, options = {}) {
  const merged = { ...input, ...body };
  const pageUrl = cleanUrl(body.pageUrl || input.website || "");
  const fallback = defaultSchemaResult(merged);
  const evidence = await collectSeoEvidence({
    moduleId: "schema",
    input,
    body,
    primaryUrl: pageUrl,
    urls: pageUrl ? [pageUrl] : [],
    competitorUrls: [],
    sharedEvidence: options.sharedEvidence || null
  });

  const prompt = [
    "Generate schema payload and implementation guidance for rich-result execution.",
    ...coreContextLines(input),
    `- Page type: ${body.pageType || "Service"}`,
    `- Page title: ${body.pageTitle || "Not specified"}`,
    `- Page description: ${body.pageDescription || "Not specified"}`,
    `- Page URL: ${pageUrl || "Not specified"}`,
    "",
    "Collected evidence:",
    JSON.stringify(getEvidencePayload(evidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, pageType, schema, recommendations:[...], validationChecklist:[...], deploymentNotes:[...] }",
    "Schema must be valid JSON-LD object."
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are a structured data specialist. Return only valid JSON.",
    prompt,
    fallback,
    maxOutputTokens: 1800
  });

  return withModuleMeta({
    moduleId: "schema",
    response,
    evidence
  });
}

export async function runSeoAiVisibility(input, body = {}, options = {}) {
  const urls = cleanUrls(body.urls);
  const trackedUrls = urls.length ? urls : DEFAULT_URLS.slice(0, 2);
  const fallback = defaultAiVisibilityResult(urls);
  const evidence = await collectSeoEvidence({
    moduleId: "ai-visibility",
    input,
    body,
    primaryUrl: trackedUrls[0],
    urls: trackedUrls,
    competitorUrls: cleanUrls(body.competitorUrls),
    sharedEvidence: options.sharedEvidence || null
  });

  const prompt = [
    "Assess AEO/GEO/AI visibility readiness and produce an AI-search action stack.",
    ...coreContextLines(input),
    `- URLs: ${trackedUrls.join(", ")}`,
    `- Entities to emphasize: ${Array.isArray(body.entities) ? body.entities.join(", ") : "Not specified"}`,
    "",
    "Collected evidence:",
    JSON.stringify(getEvidencePayload(evidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, baselineScore, targetScore90d, trackedUrls, findings:[...], priorityActions:[...], answerBlockOpportunities:[{url,queryType,recommendedBlock}], entityReinforcementPlan:[...] }"
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are an AI-search optimization specialist. Return only valid JSON.",
    prompt,
    fallback,
    maxOutputTokens: 2100
  });

  return withModuleMeta({
    moduleId: "ai-visibility",
    response,
    evidence
  });
}

export async function runSeoMarketResearch(input, body = {}, options = {}) {
  const competitorUrls = cleanUrls(body.competitorUrls || []);
  const competitors = competitorNamesFromInput(input, body);
  const fallback = defaultMarketResearchResult(input, { ...body, competitorUrls, competitors });
  const evidence = await collectSeoEvidence({
    moduleId: "market-research",
    input,
    body,
    primaryUrl: cleanUrl(input.website),
    urls: cleanUrls(body.urls),
    competitorUrls,
    sharedEvidence: options.sharedEvidence || null
  });

  const prompt = [
    "Build an extensive SEO competitor and market research brief with implementation implications.",
    ...coreContextLines(input),
    `- Competitors: ${(competitors.length ? competitors : ["Not specified"]).join(", ")}`,
    `- Competitor URLs: ${(competitorUrls.length ? competitorUrls : ["Not specified"]).join(", ")}`,
    "",
    "Collected evidence:",
    JSON.stringify(getEvidencePayload(evidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, business, market, geography, competitorLandscape:[{competitor,positioning,estimatedShareOfVoice,strengths:{technical,onPage,content,authority,local,aiVisibility},weaknesses:[...]}], marketOpportunities:[{theme,rationale,estimatedImpact,firstActions:[...]}], facetPriorities:[{facet,whatItMeans,priority,targetDelta90d}], strategyImplications:[...], executionRoadmap:{days1to30:[...],days31to60:[...],days61to90:[...]} }"
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are a senior SEO strategist. Return only valid JSON and include decision-ready detail.",
    prompt,
    fallback,
    maxOutputTokens: 3000,
    withWeb: true
  });

  return withModuleMeta({
    moduleId: "market-research",
    response,
    evidence
  });
}

export async function runSeoGscProfileAudit(input, body = {}, options = {}) {
  const propertyUrl = cleanUrl(body.propertyUrl || input.website || "");
  const fallback = defaultGscProfileAuditResult(input, { ...body, propertyUrl });
  const evidence = await collectSeoEvidence({
    moduleId: "gsc-profile-audit",
    input,
    body,
    primaryUrl: propertyUrl,
    urls: propertyUrl ? [propertyUrl] : [],
    competitorUrls: [],
    sharedEvidence: options.sharedEvidence || null
  });

  const prompt = [
    "Run a Google Search Console profile audit with implementation-grade guidance.",
    ...coreContextLines(input),
    `- Property URL: ${propertyUrl || "Not specified"}`,
    "",
    "Collected evidence:",
    JSON.stringify(getEvidencePayload(evidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, propertyUrl, market, profileChecks:[{area,status,issue,businessImpact,fixes:[...]}], queryOpportunityQueue:[{queryType,action,expectedOutcome}], governanceCadence:{weekly:[...],monthly:[...]}, dashboardBuild:[...] }"
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are a technical SEO auditor specializing in Google Search Console workflows. Return only valid JSON.",
    prompt,
    fallback,
    maxOutputTokens: 2400
  });

  return withModuleMeta({
    moduleId: "gsc-profile-audit",
    response,
    evidence
  });
}

export async function runSeoSnippetLab(input, body = {}, options = {}) {
  const fallback = defaultSnippetLabResult(input, body);
  const pageUrl = cleanUrl(body.pageUrl || input.website || "");
  const evidence = await collectSeoEvidence({
    moduleId: "snippet-lab",
    input,
    body,
    primaryUrl: pageUrl,
    urls: pageUrl ? [pageUrl] : [],
    competitorUrls: cleanUrls(body.competitorUrls),
    sharedEvidence: options.sharedEvidence || null
  });

  const prompt = [
    "Generate high-performance SEO snippet variants with clear test hypotheses.",
    ...coreContextLines(input),
    `- Page URL: ${pageUrl || "Not specified"}`,
    `- Primary keyword: ${body.primaryKeyword || body.targetKeyword || "Not specified"}`,
    `- Offer angle: ${body.offerAngle || "Not specified"}`,
    "",
    "Collected evidence:",
    JSON.stringify(getEvidencePayload(evidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, pageUrl, primaryKeyword, titleVariants:[{title,length,score}], metaDescriptionVariants:[{metaDescription,length,score}], recommendedSnippet:{title,metaDescription}, implementationChecklist:[...], testPlan:[{variant,metric,windowDays,successThreshold}] }"
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are an SEO copy and SERP CTR specialist. Return only valid JSON.",
    prompt,
    fallback,
    maxOutputTokens: 1800
  });

  return withModuleMeta({
    moduleId: "snippet-lab",
    response,
    evidence
  });
}

export async function runSeoContentAnalysis(input, body = {}, options = {}) {
  const url = cleanUrl(body.url || body.pageUrl || input.website || DEFAULT_URLS[0]);
  const competitorUrls = cleanUrls(body.competitorUrls || []);
  const evidence = await collectSeoEvidence({
    moduleId: "content-analysis",
    input,
    body,
    primaryUrl: url,
    urls: [url],
    competitorUrls,
    sharedEvidence: options.sharedEvidence || null
  });

  const targetSnapshot = evidence.pageSnapshots.find((item) => item.url === normalizeUrl(url))
    || evidence.pageSnapshots[0]
    || await fetchPageSnapshot(url);
  const inferredQuery = await inferPrimaryQuery({
    input,
    targetSnapshot,
    explicitQuery: body.primaryQuery || body.targetKeyword || ""
  });
  const serp = await runLiveSerpCapture({
    query: inferredQuery.primaryQuery,
    primaryUrl: url,
    fallbackUrls: competitorUrls
  });
  const topPageSnapshots = await Promise.all((serp.topPages || []).slice(0, 5).map((item) => fetchPageSnapshot(item.url)));
  const hoboLinks = await loadHoboBenchmarkLinks();

  const topPagesAnalyzed = (serp.topPages || []).slice(0, 5).map((page, idx) => ({
    ...page,
    snapshot: topPageSnapshots[idx] || null
  }));

  const fallback = defaultContentAnalysisResult({
    input,
    url,
    primaryQuery: inferredQuery.primaryQuery,
    targetSnapshot,
    serpPages: topPagesAnalyzed,
    hoboLinks
  });

  const prompt = [
    "Run deep SEO content analysis for the target URL.",
    ...coreContextLines(input),
    `- Target URL: ${url}`,
    `- Inferred primary query: ${inferredQuery.primaryQuery}`,
    `- Search intent: ${inferredQuery.searchIntent}`,
    "",
    "Benchmark dimensions (from Google leak frameworks):",
    ...benchmarkDimensionCatalog().map((item) => `- ${item.id}: ${item.description}`),
    "",
    "Hobo-Web benchmark links to use as reference framework:",
    ...hoboLinks.slice(0, 16).map((item) => `- ${item.topic} | ${item.url}`),
    "",
    "Target page snapshot:",
    JSON.stringify(targetSnapshot || {}, null, 2),
    "",
    "Top-5 live SERP pages for this query (with snapshots):",
    JSON.stringify(topPagesAnalyzed, null, 2),
    "",
    "Additional collected evidence:",
    JSON.stringify(getEvidencePayload(evidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, url, detectedPrimaryQuery, searchIntent, benchmarkDimensions:[{id,description}], targetSnapshot, topPagesAnalyzed:[{rank,url,title,domain,whyRanking,snapshot}], competitorPatternSummary:[...], comparativeFindings:[{area,targetStatus,gap,evidence,recommendation}], benchmarkScore:{overall,signalCoherence,contentEffort,navboostReadiness,authoritySignals,technicalHygiene}, prioritizedFixes:[{priority,fix,owner,effort,expectedImpact}], implementationRoadmap:{days1to7:[...],days8to30:[...],days31to60:[...]}, benchmarkSources:[{topic,url,mappedSkills}] }"
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are a senior SEO content strategist. Use benchmark frameworks and SERP evidence. Return only valid JSON.",
    prompt,
    fallback,
    maxOutputTokens: 3000
  });

  return withModuleMeta({
    moduleId: "content-analysis",
    response,
    evidence: {
      ...evidence,
      workflow: [
        ...evidence.workflow,
        {
          step: "content-analysis: infer primary query",
          status: inferredQuery.reason === "fallback" ? "fallback" : "completed",
          detail: inferredQuery.primaryQuery
        },
        {
          step: "content-analysis: live top-5 SERP capture",
          status: serp.usedFallback ? "fallback" : "completed",
          detail: `${(serp.topPages || []).length} pages analyzed`
        },
        {
          step: "content-analysis: benchmark framework alignment",
          status: hoboLinks.length ? "completed" : "partial",
          detail: `${hoboLinks.length} Hobo-Web references loaded`
        }
      ],
      sourcesUsed: uniqueValues([
        ...evidence.sourcesUsed,
        ...(serp.topPages || []).map((item) => item.url),
        ...hoboLinks.map((item) => item.url)
      ])
    }
  });
}

export async function runSeoFullAudit(input, body = {}) {
  const primaryUrl = cleanUrl(body.primaryUrl || input.website || DEFAULT_URLS[0]);
  const urls = cleanUrls(body.urls);
  const normalizedUrls = urls.length ? urls : DEFAULT_URLS;
  const competitorUrls = cleanUrls(body.competitorUrls);

  const sharedEvidence = await collectSeoEvidence({
    moduleId: "full-audit",
    input,
    body,
    primaryUrl,
    urls: normalizedUrls,
    competitorUrls
  });

  const scanResponse = await runSeoScan(input, { ...body, url: primaryUrl }, { sharedEvidence });
  const bulkResponse = await runSeoBulk(input, { ...body, urls: normalizedUrls }, { sharedEvidence });
  const compareResponse = await runSeoCompare(input, { ...body, primaryUrl, competitorUrls }, { sharedEvidence });
  const aiVisibilityResponse = await runSeoAiVisibility(input, { ...body, urls: normalizedUrls }, { sharedEvidence });
  const marketResearchResponse = await runSeoMarketResearch(input, { ...body, competitorUrls }, { sharedEvidence });
  const gscResponse = await runSeoGscProfileAudit(input, { ...body, propertyUrl: body.propertyUrl || input.website }, { sharedEvidence });
  const snippetResponse = await runSeoSnippetLab(input, { ...body, pageUrl: body.pageUrl || primaryUrl }, { sharedEvidence });
  const contentAnalysisResponse = await runSeoContentAnalysis(
    input,
    { ...body, url: body.url || body.pageUrl || primaryUrl, competitorUrls },
    { sharedEvidence }
  );

  const modules = {
    scan: scanResponse.result,
    bulk: bulkResponse.result,
    compare: compareResponse.result,
    aiVisibility: aiVisibilityResponse.result,
    marketResearch: marketResearchResponse.result,
    gscProfileAudit: gscResponse.result,
    snippetLab: snippetResponse.result,
    contentAnalysis: contentAnalysisResponse.result
  };

  const fallback = defaultFullAuditResult(input, modules);
  const prompt = [
    "Create a full-spectrum SEO command audit from all module outputs and evidence.",
    ...coreContextLines(input),
    "",
    "Module outputs:",
    JSON.stringify(modules, null, 2),
    "",
    "Collected evidence:",
    JSON.stringify(getEvidencePayload(sharedEvidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, business, market, overallScore, executiveSummary:[...], components:{scan,bulk,compare,aiVisibility,marketResearch,gscProfileAudit,snippetLab,contentAnalysis}, priorityPlan:{days1to14:[...],days15to45:[...],days46to90:[...]}, kpiTargets90d:{organicCtrDelta,top10KeywordGrowth,leadConversionFromOrganic,aiVisibilityScore}, implementationBacklog:[{owner,task,priority,dueInDays,kpi}] }"
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are a principal SEO strategist building board-level operating plans. Return only valid JSON.",
    prompt,
    fallback,
    maxOutputTokens: 3200
  });

  return withModuleMeta({
    moduleId: "full-audit",
    response,
    evidence: sharedEvidence
  });
}

export async function runSeoReport(input, body = {}) {
  const primaryUrl = cleanUrl(body.primaryUrl || input.website || DEFAULT_URLS[0]);
  const urls = cleanUrls(body.urls);
  const normalizedUrls = urls.length ? urls : DEFAULT_URLS;
  const competitorUrls = cleanUrls(body.competitorUrls);

  const sharedEvidence = await collectSeoEvidence({
    moduleId: "report",
    input,
    body,
    primaryUrl,
    urls: normalizedUrls,
    competitorUrls
  });

  const fullAudit = await runSeoFullAudit(input, {
    ...body,
    primaryUrl,
    urls: normalizedUrls,
    competitorUrls
  });

  const fallback = defaultReportResult(input, fullAudit.result?.components || {});
  const prompt = [
    "Build a complete SEO toolkit master report for agency execution.",
    ...coreContextLines(input),
    "",
    "Full audit output:",
    JSON.stringify(fullAudit.result, null, 2),
    "",
    "Collected evidence:",
    JSON.stringify(getEvidencePayload(sharedEvidence), null, 2),
    "",
    "Return strict JSON with fields:",
    "{ module, business, overallSeoHealth, topOpportunities:[...], roadmap:{days1to30:[...],days31to60:[...],days61to90:[...]}, kpiTracking:{organicSessions,priorityKeywordPosition,organicCtr,organicConversionRate,aiVisibilityScore}, headlines:[...], ctas:[...], reportMarkdown }"
  ].join("\n");

  const response = await llmJsonOrFallback({
    system: "You are an SEO program lead. Return only valid JSON.",
    prompt,
    fallback,
    maxOutputTokens: 3000
  });

  return withModuleMeta({
    moduleId: "report",
    response,
    evidence: sharedEvidence
  });
}
