const skillToolMap = {
  "seo-audit": [
    { tool: "google-search-console", query: "Top queries and pages (last 90 days), impressions/clicks/CTR trends." },
    { tool: "ahrefs", query: "Backlink growth, referring domains, and top competing pages." },
    { tool: "semrush", query: "Keyword overlap and position changes against top 3 competitors." }
  ],
  "on-page-seo": [
    { tool: "google-search-console", query: "Pages with high impressions and low CTR for on-page rewrites." }
  ],
  "page-cro": [
    { tool: "ga4", query: "Landing page conversion funnels with drop-off rates by source." },
    { tool: "posthog", query: "Session replay hotspots and click dead-zones on key landing pages." }
  ],
  "paid-ads": [
    { tool: "google-ads", query: "Campaign CPA, ROAS, and budget pacing over last 30 days." },
    { tool: "meta-ads", query: "Ad set-level CPM, CTR, and CPA with creative-level breakouts." },
    { tool: "linkedin-ads", query: "Audience + ad-level CPL and conversion quality by segment." }
  ],
  "email-sequence": [
    { tool: "mailchimp", query: "Open rate, click rate, and unsubscribe deltas by sequence step." },
    { tool: "customer-io", query: "Lifecycle entry-to-conversion progression and bottleneck steps." }
  ],
  "analytics-tracking": [
    { tool: "ga4", query: "Conversion events, event quality gaps, and unexplained direct traffic changes." },
    { tool: "segment", query: "Event schema coverage and dropped/invalid event diagnostics." }
  ]
};

function normalizeSkillId(skillId) {
  return String(skillId || "").trim().toLowerCase();
}

export function getMcpConfig() {
  return {
    proxyUrl: process.env.MCP_PROXY_URL || "http://127.0.0.1:4000",
    hasProxyToken: Boolean(process.env.MCP_PROXY_TOKEN)
  };
}

export function buildMcpPlan(skillId) {
  const normalized = normalizeSkillId(skillId);
  const base = skillToolMap[normalized] || [];

  return [
    ...base,
    {
      tool: "ga4",
      query: "Top conversion paths and source/medium breakdown for current objective."
    }
  ];
}

export function buildIntelligenceResearchPlan(inputContext = {}) {
  const channels = Array.isArray(inputContext?.channels) ? inputContext.channels.map((v) => String(v).toLowerCase()) : [];
  const selectedIntegrations = Array.isArray(inputContext?.selectedIntegrations)
    ? inputContext.selectedIntegrations.map((v) => String(v).toLowerCase())
    : [];
  const includeAll = !channels.length;
  const include = (channel) => includeAll || channels.includes(channel);

  const plan = [
    { tool: "google-search-console", query: "Market visibility audit: top queries/pages, CTR gaps, and competitive SERP pressure for last 90 days." },
    { tool: "ahrefs", query: "Competitor backlink authority comparison, referring domain momentum, and link gap opportunities." },
    { tool: "semrush", query: "Keyword overlap and ranking trend gaps against top competitors across commercial terms." },
    { tool: "ga4", query: "Cross-channel funnel efficiency: sessions, engagement, conversion rates, and path drop-offs by source." },
    { tool: "posthog", query: "Behavioral friction map: user drop-off points, dead-click zones, and key journey obstacles." },
    { tool: "segment", query: "Attribution and event quality gaps that could distort channel performance decisions." }
  ];

  if (include("paid")) {
    plan.push(
      { tool: "google-ads", query: "Campaign-level cost efficiency, impression share loss, and competitor pressure signals." },
      { tool: "meta-ads", query: "Creative and audience efficiency snapshot: CPM, CTR, CPA by top segments." },
      { tool: "linkedin-ads", query: "B2B audience segment performance and CPL distribution by campaign." }
    );
  }

  if (include("email")) {
    plan.push(
      { tool: "mailchimp", query: "Lifecycle performance by sequence step: open, click, conversion, and churn signals." },
      { tool: "customer-io", query: "Activation and retention path diagnostics across lifecycle stages." }
    );
  }

  if (include("strategy") || include("content") || include("seo")) {
    plan.push(
      { tool: "hubspot", query: "Pipeline velocity and lead source quality by lifecycle stage and deal outcomes." },
      { tool: "salesforce", query: "Sales cycle friction: lead-to-opportunity conversion and close-rate segmentation." }
    );
  }

  const deduped = [];
  const seen = new Set();
  for (const item of plan) {
    const tool = String(item?.tool || "").toLowerCase();
    if (!tool || seen.has(tool)) continue;
    seen.add(tool);
    deduped.push(item);
  }

  if (selectedIntegrations.length) {
    const prioritized = deduped.filter((item) => selectedIntegrations.includes(String(item.tool).toLowerCase()));
    const remaining = deduped.filter((item) => !selectedIntegrations.includes(String(item.tool).toLowerCase()));
    return [...prioritized, ...remaining];
  }

  return deduped;
}

export async function runMcpPlan({ plan, inputContext }) {
  const proxyUrl = process.env.MCP_PROXY_URL || "http://127.0.0.1:4000";
  const token = process.env.MCP_PROXY_TOKEN || "";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${proxyUrl.replace(/\/$/, "")}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        plan,
        context: inputContext
      }),
      signal: controller.signal
    });

    const text = await response.text();
    clearTimeout(timeout);

    if (!response.ok) {
      return {
        status: "error",
        results: [],
        plannedQueries: plan,
        note: `MCP proxy returned ${response.status}.`,
        raw: text
      };
    }

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }

    return {
      status: "ok",
      plannedQueries: plan,
      results: json.results || [],
      raw: json
    };
  } catch (error) {
    clearTimeout(timeout);
    return {
      status: "error",
      results: [],
      plannedQueries: plan,
      note: error?.message || "Unknown MCP proxy error"
    };
  }
}
