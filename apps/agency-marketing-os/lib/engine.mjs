import { getGoalProfile, getSkillCatalog, recommendSkills } from "./recommender.mjs";
import { generateWithLlm } from "./llm.mjs";
import { buildIntelligenceResearchPlan, buildMcpPlan, runMcpPlan } from "./mcp.mjs";
import { saveExecutionTasks, saveStrategyRun } from "./db.mjs";
import { readManySkills, readSkill } from "./skills.mjs";

const facetDefinitions = [
  {
    id: "seo",
    name: "SEO and Organic Demand",
    skillIds: ["seo-toolkit-suite", "seo-audit", "on-page-seo", "topical-authority", "link-building", "schema-markup", "eeat-optimization", "programmatic-seo", "image-seo", "competitor-alternatives"],
    focus: "SERP share, ranking defensibility, snippet CTR, authority compounding"
  },
  {
    id: "cro",
    name: "Conversion Rate and Funnel UX",
    skillIds: ["page-cro", "form-cro", "signup-flow-cro", "onboarding-cro", "popup-cro", "paywall-upgrade-cro", "ab-test-setup"],
    focus: "Conversion friction, win-rate per session, experiment velocity"
  },
  {
    id: "paid",
    name: "Paid Media Acquisition",
    skillIds: ["paid-ads"],
    focus: "CPA/ROAS dynamics, creative angles, audience efficiency, budget allocation"
  },
  {
    id: "content",
    name: "Content and Messaging Engine",
    skillIds: ["content-strategy", "copywriting", "copy-editing", "social-content", "marketing-ideas", "marketing-psychology"],
    focus: "Message-market fit, demand capture, authority narrative, distribution leverage"
  },
  {
    id: "email-lifecycle",
    name: "Email and Lifecycle Monetization",
    skillIds: ["email-sequence", "onboarding-cro", "paywall-upgrade-cro"],
    focus: "Lead nurture, activation, retention expansion, lifecycle conversion"
  },
  {
    id: "pricing-offer",
    name: "Offer Packaging and Monetization",
    skillIds: ["pricing-strategy", "launch-strategy", "referral-program", "free-tool-strategy"],
    focus: "Packaging clarity, ARPU expansion, launch economics, viral loops"
  },
  {
    id: "analytics",
    name: "Analytics and Operating Control",
    skillIds: ["analytics-tracking", "agency-command-center"],
    focus: "Measurement reliability, attribution clarity, KPI governance, execution cadence"
  }
];

function summarizeSkillBody(content, maxChars = 2200) {
  return content.length <= maxChars ? content : `${content.slice(0, maxChars)}\n...`;
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

function getMarkdownSection(content, heading) {
  const safeHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^##\\s+${safeHeading}\\s*[\\r\\n]+([\\s\\S]*?)(?=^##\\s+|\\Z)`, "im");
  const match = content.match(pattern);
  return match?.[1]?.trim() || "";
}

function linesFromSection(sectionText, maxItems = 5) {
  if (!sectionText) return [];
  const lines = sectionText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => line.startsWith("-") || line.startsWith("*") || /^\d+\./.test(line))
    .map((line) => line.replace(/^[-*]\s*/, "").replace(/^\d+\.\s*/, "").trim());
  return lines.slice(0, maxItems);
}

function truncateText(text, maxChars = 320) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (!value) return "";
  return value.length <= maxChars ? value : `${value.slice(0, maxChars)}...`;
}

function buildSkillOpsPackets(skillDocs) {
  return skillDocs.map((skill) => {
    const purpose = truncateText(getMarkdownSection(skill.content, "Purpose"), 280);
    const whenToUse = linesFromSection(getMarkdownSection(skill.content, "When to Use"), 4);
    const process = linesFromSection(getMarkdownSection(skill.content, "Process (Step-by-Step)"), 6);
    const outputFormat = truncateText(getMarkdownSection(skill.content, "Output Format"), 320);
    const frameworks = linesFromSection(getMarkdownSection(skill.content, "Core Frameworks & Knowledge"), 5);

    return {
      id: skill.id,
      purpose,
      whenToUse,
      process,
      outputFormat,
      frameworks
    };
  });
}

function buildCompetitorSet(input, count = 8) {
  const provided = Array.isArray(input?.competitors) ? input.competitors.map((v) => String(v).trim()).filter(Boolean) : [];
  const defaults = [
    "Category Leader Inc",
    "Performance Growth Co",
    "Niche Specialist Labs",
    "Enterprise Agency Group",
    "Automation-First Studio",
    "In-House Competitor Team",
    "Regional Challenger Collective",
    "Lower-Cost Outsourcing Vendor"
  ];

  const merged = [...provided];
  for (const name of defaults) {
    if (merged.length >= count) break;
    if (merged.includes(name)) continue;
    merged.push(name);
  }

  return merged.slice(0, count);
}

function contextLines(input) {
  return [
    `- Agency name: ${input.agencyName || "Agency"}`,
    `- Business name: ${input.businessName || "Not specified"}`,
    `- Website: ${input.website || "Not specified"}`,
    `- Geography: ${input.geography || "Not specified"}`,
    `- Industry: ${input.industry || "Not specified"}`,
    `- Product/service: ${input.product || "Not specified"}`,
    `- Target customer: ${input.targetCustomer || "Not specified"}`,
    `- Current marketing efforts: ${input.currentEfforts || "Not specified"}`,
    `- Competitors provided: ${(input.competitors || []).join(", ") || "Not specified"}`,
    `- Client market: ${input.market || "Not specified"}`,
    `- Goal: ${input.goal || "full-funnel"}`,
    `- Goal detail: ${input.goalsDetail || "Not specified"}`,
    `- Horizon: ${input.horizon || 90} days`,
    `- Budget: $${input.budget || 0}/month`,
    `- Team capacity: ${input.capacity || 0} hours/week`,
    `- Constraints: ${input.constraints || "None specified"}`,
    `- Priority channels: ${(input.channels || []).join(", ") || "None specified"}`,
    `- Selected skills: ${(input.selectedSkills || []).join(", ") || "Not specified"}`,
    `- Selected integrations: ${(input.selectedIntegrations || []).join(", ") || "Not specified"}`
  ];
}

function mergeRecommendedWithManualSelection(input, recommended, limit = 12) {
  const manual = Array.isArray(input?.selectedSkills) ? input.selectedSkills.map((v) => String(v).trim().toLowerCase()).filter(Boolean) : [];
  if (!manual.length) return recommended.slice(0, limit);

  const catalogMap = new Map(getSkillCatalog().map((item) => [item.id, item]));
  const fromManual = [];
  for (const skillId of manual) {
    const found = catalogMap.get(skillId);
    if (!found) continue;
    fromManual.push({
      ...found,
      score: 999,
      why: "User-selected skill for this strategy"
    });
  }

  const merged = [...fromManual];
  const seen = new Set(fromManual.map((s) => s.id));
  for (const skill of recommended) {
    if (seen.has(skill.id)) continue;
    merged.push(skill);
    seen.add(skill.id);
    if (merged.length >= limit) break;
  }

  return merged.slice(0, limit);
}

function getPrioritizedFacets(recommendedSkills) {
  const skillSet = new Set(recommendedSkills.map((s) => s.id));
  return facetDefinitions.map((facet) => {
    const matched = facet.skillIds.filter((id) => skillSet.has(id));
    return {
      ...facet,
      matchedSkills: matched,
      priority: matched.length ? "high" : "medium"
    };
  });
}

function fallbackResearch({ input, facets, recommended, skillDocs }) {
  const business = input.businessName || input.agencyName || "the business";
  const competitors = buildCompetitorSet(input, 8);
  const packets = buildSkillOpsPackets(skillDocs);
  const packetMap = new Map(packets.map((packet) => [packet.id, packet]));

  const facetSections = facets.map((facet) => {
    const matched = recommended.filter((skill) => facet.matchedSkills.includes(skill.id));
    const skillsTable = matched.length
      ? matched.map((skill) => {
        const packet = packetMap.get(skill.id);
        return `| ${skill.id} | ${truncateText(packet?.purpose || skill.why, 90)} | ${truncateText((packet?.process || []).slice(0, 2).join(" / ") || "Implement core playbook", 90)} |`;
      }).join("\n")
      : "| baseline | Use baseline playbook | Diagnose and prioritize |";

    const competitorRows = competitors.slice(0, 5).map((name, idx) => {
      const strength = idx % 2 === 0 ? "Strong channel specialization" : "Aggressive execution velocity";
      const weakness = idx % 2 === 0 ? "Weak cross-funnel integration" : "Limited proof + attribution rigor";
      const opportunity = idx % 2 === 0 ? "Win with integrated KPI system and lifecycle depth" : "Win with conversion + analytics discipline";
      return `| ${name} | ${strength} | ${weakness} | ${opportunity} |`;
    }).join("\n");

    return [
      `### ${facet.name}`,
      `- Priority: ${facet.priority}`,
      `- Focus: ${facet.focus}`,
      `- Matched skills: ${facet.matchedSkills.length ? facet.matchedSkills.join(", ") : "No direct match; use baseline playbooks."}`,
      "",
      "| Competitor | Observed Strength | Observed Weakness | Positioning Opportunity |",
      "|---|---|---|---|",
      competitorRows,
      "",
      "| Skill | Playbook Signal | Execution Move |",
      "|---|---|---|",
      skillsTable,
      "",
      "- Benchmark heuristic: top performers move from diagnosis to implementation inside 7 days with weekly KPI checkpoints.",
      "- Risk note: quality drops when acquisition and conversion teams optimize in silos."
    ].join("\n");
  });

  return [
    `# Full-Funnel Competitor Intelligence - ${business}`,
    "",
    "## Market Landscape",
    `- Industry: ${input.industry || "Not specified"}`,
    `- Market: ${input.market || "Not specified"}`,
    `- Geography: ${input.geography || "Not specified"}`,
    `- Target customer: ${input.targetCustomer || "Not specified"}`,
    "- Buyers prioritize measurable outcomes, execution speed, and low implementation risk.",
    "",
    "## Competitor Priority Set",
    ...competitors.map((name, idx) => `${idx + 1}. ${name}`),
    "",
    "## Facet-by-Facet Competitor Analysis",
    ...facetSections,
    "",
    "## Cross-Facet Opportunities",
    "1. Use SEO + CRO + paid handoff rules to increase qualified pipeline density.",
    "2. Build lifecycle expansion motions early so lead-gen spend compounds faster.",
    "3. Use analytics governance to eliminate attribution blind spots before scaling budget.",
    "",
    "## Assumptions and Source Note",
    "- This output is deterministic fallback mode using local skill playbooks plus configured context.",
    "- Validate competitor assumptions with live MCP integrations for production planning."
  ].join("\n");
}

function fallbackStrategy({ input, recommended, facets, skillDocs, research }) {
  const profile = getGoalProfile(input.goal);
  const topSkills = recommended.slice(0, 10);
  const packets = buildSkillOpsPackets(skillDocs);
  const packetMap = new Map(packets.map((packet) => [packet.id, packet]));

  const backlogRows = topSkills.map((skill, idx) => {
    const impact = Math.max(2, 5 - Math.floor(idx / 3));
    const confidence = Math.max(2, 5 - (idx % 4));
    const effort = Math.min(5, 2 + Math.floor(idx / 2));
    const score = ((impact * confidence) / effort).toFixed(2);
    const tier = idx < 4 ? "Quick Win" : idx < 7 ? "Core Bet" : "Strategic Build";
    return `| ${skill.deliverable} | ${input.businessName || "Primary Client"} | ${skill.id} | ${impact} | ${confidence} | ${effort} | ${score} | ${tier} |`;
  }).join("\n");

  const skillBlueprints = topSkills.slice(0, 8).map((skill, idx) => {
    const packet = packetMap.get(skill.id);
    const processMoves = (packet?.process || []).slice(0, 3);
    const frameworks = (packet?.frameworks || []).slice(0, 2);
    const weekRange = idx < 3 ? "Weeks 1-4" : idx < 6 ? "Weeks 5-8" : "Weeks 9-12";
    const baseline = 100 + idx * 8;
    const target = Math.round(baseline * 1.22);

    return [
      `### ${skill.id} Operating Plan`,
      `- Role in strategy: ${packet?.purpose || skill.why}`,
      `- Framework signals: ${frameworks.length ? frameworks.join(" | ") : "Use skill process baseline."}`,
      `- Execution window: ${weekRange}`,
      `- KPI baseline->target: ${baseline} -> ${target}`,
      `- Owner: ${idx < 3 ? "Growth Lead" : "Channel Specialist"}`,
      "- Dependencies: analytics-tracking, weekly review cadence, approval SLA under 48h.",
      "",
      ...processMoves.map((move, moveIdx) => `${moveIdx + 1}. ${move}`),
      processMoves.length ? "" : "1. Run skill-specific diagnosis and implementation sprint.",
      processMoves.length ? "" : "2. Ship highest-impact playbook updates with KPI checkpoints.",
      processMoves.length ? "" : "3. Review and optimize at weekly operations review."
    ].join("\n");
  });

  const researchSnippet = research
    ? research.split("\n").slice(0, 16).join("\n")
    : "No research snippet available.";

  return [
    "# Agency Command Center Blueprint",
    "",
    "## 1) Agency Snapshot",
    `- Agency model: ${input.industry || "Generalist growth operator"}`,
    `- Team capacity: ${input.capacity || 0} hours/week`,
    "- Service lines: SEO, CRO, paid media, lifecycle, content, analytics",
    `- Top 3 business goals (next 90 days): ${profile.kpi}; execution velocity; attribution reliability`,
    `- Constraints: ${input.constraints || "None specified"}`,
    "",
    "## 2) Client Portfolio Segmentation",
    "| Client | Segment (Scale/Stabilize/Rescue) | MRR | Risk Level | Primary Goal |",
    "|---|---|---|---|---|",
    `| ${input.businessName || "Primary Client"} | Stabilize | ${input.budget ? `$${input.budget}/mo` : "N/A"} | Medium | ${profile.kpi} |`,
    "",
    "## 3) Full-Funnel Score Grid (1-5)",
    "| Client | Demand Capture | Demand Creation | Conversion | Lifecycle | Authority |",
    "|---|---|---|---|---|---|",
    `| ${input.businessName || "Primary Client"} | 3 | 3 | 2 | 2 | 3 |`,
    "",
    "## 4) Priority Initiative Backlog",
    "| Initiative | Client | Mapped Skill(s) | Impact | Confidence | Effort | Score | Tier |",
    "|---|---|---|---|---|---|---|---|",
    backlogRows,
    "",
    "## 5) 30-60-90 Execution Plan",
    "### Days 1-30 (Quick Wins)",
    ...topSkills.slice(0, 4).map((skill, idx) => `- ${skill.deliverable} - Owner: ${idx < 2 ? "Growth Lead" : "Specialist"} - KPI: ${profile.kpi} leading indicators - Deadline: Day ${14 + idx * 4}`),
    "### Days 31-60 (Core Bets)",
    ...topSkills.slice(4, 7).map((skill, idx) => `- ${skill.deliverable} - Owner: Channel Specialist - KPI: funnel efficiency uplift - Deadline: Day ${45 + idx * 5}`),
    "### Days 61-90 (Strategic Builds)",
    ...topSkills.slice(7, 10).map((skill, idx) => `- ${skill.deliverable} - Owner: Growth Program Lead - KPI: scalable growth contribution - Deadline: Day ${75 + idx * 5}`),
    "",
    "## 6) Measurement Plan",
    `- North-star KPI: ${profile.kpi}`,
    "- Weekly KPI set: pipeline volume, conversion efficiency, CAC/ROAS, lifecycle progression, authority growth",
    "- Leading indicators: CTR, CVR, MQL->SQL, quality score, page velocity, task cycle time",
    `- Data sources: ${(input.selectedIntegrations || []).join(", ") || "GA4, GSC, Ads, CRM tools"}`,
    "- QA cadence: weekly event QA + monthly attribution audit",
    "",
    "## 7) Reporting Rhythm",
    "- Weekly ops review: Tuesday, 45 minutes, owners + blockers + KPI deltas.",
    "- Monthly business review: commercial impact, wins/losses, and reprioritization decisions.",
    "- Escalation triggers: two consecutive weeks below KPI trajectory, CPA drift >15%, CVR drop >10%.",
    "- Reprioritization rules: re-score initiatives when confidence changes or effort assumptions break.",
    "",
    "## 8) Skill-by-Skill Execution Blueprint",
    ...skillBlueprints,
    "",
    "## 9) Research Snapshot Used",
    "```markdown",
    researchSnippet,
    "```",
    "",
    "## 10) Headline + CTA Options (Agency Offer)",
    "### Headlines (3 options)",
    "1. Run your agency like a compounding growth system, not a disconnected task list.",
    "2. From competitor intelligence to execution in one operating stack.",
    "3. Multi-skill marketing execution with measurable weekly business impact.",
    "",
    "### CTAs (3 options)",
    "1. Generate my full-funnel command center plan",
    "2. Build my 90-day agency operating roadmap",
    "3. Launch my integrated growth execution stack"
  ].join("\n");
}

function fallbackBacklog({ input, recommended }) {
  const priorities = ["critical", "high", "medium", "low"];
  const integrations = Array.isArray(input?.selectedIntegrations) && input.selectedIntegrations.length
    ? input.selectedIntegrations
    : ["ga4", "google-search-console", "google-ads", "meta-ads", "hubspot"];

  const tasks = [];
  const topSkills = recommended.slice(0, 10);
  for (let idx = 0; idx < topSkills.length; idx++) {
    const skill = topSkills[idx];
    const priority = priorities[Math.min(priorities.length - 1, Math.floor(idx / 3))];

    tasks.push(
      {
        title: `${skill.id}: Diagnostic baseline and hypothesis map`,
        description: `Run a deep-dive diagnostic for ${skill.id}, identify root causes, and define measurable hypotheses linked to ${input.goal || "goal"} outcomes.`,
        skillId: skill.id,
        taskType: "audit",
        ownerRole: idx < 4 ? "growth-lead" : "channel-specialist",
        priority,
        dueInDays: 4 + idx * 2,
        kpi: "Baseline metric and gap quantification",
        status: "planned",
        integrationHint: integrations[idx % integrations.length]
      },
      {
        title: `${skill.id}: Implementation sprint`,
        description: `Implement highest-impact ${skill.id} playbook changes with clear owner, acceptance criteria, and dependency tracking.`,
        skillId: skill.id,
        taskType: "implementation",
        ownerRole: "channel-specialist",
        priority,
        dueInDays: 8 + idx * 2,
        kpi: "Primary channel KPI uplift",
        status: "planned",
        integrationHint: integrations[(idx + 1) % integrations.length]
      },
      {
        title: `${skill.id}: Experiment and optimization loop`,
        description: `Launch controlled tests for ${skill.id}, monitor results weekly, and codify winning variants into reusable SOPs.`,
        skillId: skill.id,
        taskType: "experiment",
        ownerRole: "growth-operator",
        priority: priority === "critical" ? "high" : priority,
        dueInDays: 12 + idx * 2,
        kpi: "Experiment win-rate and sustained KPI delta",
        status: "planned",
        integrationHint: integrations[(idx + 2) % integrations.length]
      }
    );
  }

  return tasks.slice(0, 30);
}

function fallbackExecution({ skillId, taskType, deliverable, input, skillContent = "" }) {
  const purpose = truncateText(getMarkdownSection(skillContent, "Purpose"), 240);
  const processMoves = linesFromSection(getMarkdownSection(skillContent, "Process (Step-by-Step)"), 6);
  const outputStandard = truncateText(getMarkdownSection(skillContent, "Output Format"), 240);

  return [
    `# ${skillId} - ${taskType}`,
    "",
    "## Context",
    `- Market: ${input.market || "Not provided"}`,
    `- Goal: ${input.goal || "Not provided"}`,
    `- Budget: $${Number(input.budget || 0).toLocaleString()}`,
    `- Capacity: ${input.capacity || 0} hours/week`,
    `- Selected integrations: ${(input.selectedIntegrations || []).join(", ") || "Not specified"}`,
    "",
    "## Skill Intent",
    `- Purpose signal: ${purpose || "Use the full skill playbook for this task."}`,
    `- Output standard: ${outputStandard || "Client-ready execution output with clear owners and KPIs."}`,
    "",
    "## Action Plan",
    ...processMoves.length
      ? processMoves.map((move, idx) => `${idx + 1}. ${move}`)
      : [
        `1. Run a focused ${taskType} workflow using the ${skillId} skill framework.`,
        "2. Prioritize opportunities by impact, confidence, and effort.",
        "3. Build implementation sequence with owners, deadlines, and dependencies."
      ],
    `${processMoves.length + 1}. Deliver: ${deliverable || "Client-ready output"}.`,
    "",
    "## Measurement",
    "- Define baseline KPI and weekly checkpoints.",
    "- Define success threshold and rollback criteria.",
    "- Record result deltas and decisions in the command-center backlog."
  ].join("\n");
}

async function generateComprehensiveResearch({ input, recommended, facets, skillDocs }) {
  const researchPlan = buildIntelligenceResearchPlan(input);
  const mcpResearch = await runMcpPlan({
    plan: researchPlan,
    inputContext: {
      ...input,
      intent: "cross_channel_competitor_research"
    }
  });

  const mcpSummary = mcpResearch.status === "ok"
    ? JSON.stringify(mcpResearch.results, null, 2)
    : `MCP status: ${mcpResearch.status}\n${mcpResearch.note || "No MCP data available"}`;

  const prompt = [
    "Run extensive competitor and market intelligence for this marketing engagement.",
    "",
    "Business context:",
    ...contextLines(input),
    "",
    "Ranked skill priorities:",
    ...recommended.map((s, i) => `${i + 1}. ${s.id} - ${s.why}`),
    "",
    "Marketing facets to cover end-to-end:",
    ...facets.map((facet, idx) => `${idx + 1}. ${facet.name} (priority: ${facet.priority}; focus: ${facet.focus}; skills: ${facet.skillIds.join(", ")})`),
    "",
    "MCP source data:",
    mcpSummary,
    "",
    "User-provided competitor set (must analyze these first):",
    ...(input.competitors?.length ? input.competitors.map((name, idx) => `${idx + 1}. ${name}`) : ["- None provided"]),
    "",
    "User-selected integration focus:",
    `${(input.selectedIntegrations || []).join(", ") || "No explicit preference"}`,
    "",
    "Output requirements:",
    "- Return markdown.",
    "- Minimum depth: at least 1,500 words.",
    "- For every facet, include competitor table with at least 5 competitors including offer style, pricing cues, positioning, and weaknesses.",
    "- Include benchmark heuristics and winning pattern diagnostics per facet.",
    "- Include cross-facet strategic gaps and opportunities.",
    "- Include risk map, assumptions, and source list with URLs and dates if available.",
    "- Make this immediately usable by an agency operator."
  ].join("\n");

  const llm = await generateWithLlm({
    system: "You are a principal marketing intelligence analyst. Build rigorous, practical competitor intelligence across all key growth facets.",
    prompt,
    maxOutputTokens: 3200,
    providerPreference: process.env.INTELLIGENCE_RESEARCH_PROVIDER || "auto",
    tools: process.env.MARKET_RESEARCH_WITH_WEB !== "false" ? [{ type: "web_search_preview" }] : null
  });

  if (!llm.ok) {
    return {
      research: fallbackResearch({ input, facets, recommended, skillDocs }),
      usedFallback: true,
      llm,
      mcp: mcpResearch
    };
  }

  return {
    research: llm.text,
    usedFallback: false,
    llm,
    mcp: mcpResearch
  };
}

async function generateStrategyNarrative({ input, recommended, research, skillDocs }) {
  const skillPackets = buildSkillOpsPackets(skillDocs);
  const skillContext = skillDocs
    .map((skill) => `\n### ${skill.id}\n${summarizeSkillBody(skill.content, 3200)}`)
    .join("\n");

  const packetContext = skillPackets
    .map((packet) => [
      `### ${packet.id}`,
      `- Purpose: ${packet.purpose || "N/A"}`,
      `- Framework signals: ${packet.frameworks.join(" | ") || "N/A"}`,
      `- Process moves: ${packet.process.join(" | ") || "N/A"}`,
      `- Output standard: ${packet.outputFormat || "N/A"}`
    ].join("\n"))
    .join("\n");

  const prompt = [
    "Build an execution-grade growth strategy using the skill playbooks and market intelligence below.",
    "",
    "Agency context:",
    ...contextLines(input),
    "",
    "Recommended skills (ranked):",
    ...recommended.map((s, i) => `${i + 1}. ${s.id} - ${s.why}`),
    "",
    "Research (must drive strategy):",
    research,
    "",
    "Structured skill operation packets:",
    packetContext,
    "",
    "Skill references:",
    skillContext,
    "",
    "Output requirements:",
    "- Return markdown.",
    "- Use the Agency Command Center Blueprint format with numbered sections 1 through 10.",
    "- Include: executive summary, positioning thesis, prioritized skill stack, 30-60-90 roadmap, KPI tree, weekly operating cadence, risk controls.",
    "- Include concrete deliverables, owners, decision checkpoints, and explicit dependency chains.",
    "- For each top 8 skills, include a subsection with: role, 2 initiatives, 1 experiment, baseline->target KPI, and owner.",
    "- Include initiative scoring table (Impact, Confidence, Effort, Score).",
    "- Minimum depth: 1,800 words.",
    "- Include 3 headline options and 3 CTA options for the agency offer."
  ].join("\n");

  const llm = await generateWithLlm({
    system: "You are a senior growth systems architect. Your output must be specific, operational, and execution-ready.",
    prompt,
    maxOutputTokens: 3600,
    providerPreference: process.env.INTELLIGENCE_STRATEGY_PROVIDER || "auto"
  });

  if (!llm.ok) {
    return {
      strategy: "",
      usedFallback: true,
      llm
    };
  }

  return {
    strategy: llm.text,
    usedFallback: false,
    llm
  };
}

async function generateExecutionBacklog({ input, recommended, research, strategy }) {
  const fallback = fallbackBacklog({ input, recommended });
  const prompt = [
    "Create a structured execution backlog for agency delivery.",
    "",
    "Context:",
    ...contextLines(input),
    "",
    "Research summary:",
    research,
    "",
    "Strategy summary:",
    strategy,
    "",
    "Return strict JSON with shape:",
    "{",
    '  "tasks": [',
    '    { "title": "", "description": "", "skillId": "", "taskType": "strategy|implementation|audit|experiment|copy", "ownerRole": "", "priority": "critical|high|medium|low", "dueInDays": 0, "kpi": "", "status": "planned", "integrationHint": "", "dependsOn": [""] }',
    "  ]",
    "}",
    "Rules:",
    "- Create 18 to 30 tasks.",
    "- Cover every major facet from SEO, CRO, paid, lifecycle, content, analytics, and monetization.",
    "- Use the recommended skill IDs where relevant."
  ].join("\n");

  const llm = await generateWithLlm({
    system: "You are an execution program manager for growth agencies. Return only valid JSON.",
    prompt,
    maxOutputTokens: 3000,
    providerPreference: process.env.INTELLIGENCE_EXECUTION_PROVIDER || "auto"
  });

  if (!llm.ok) {
    return {
      executionBacklog: fallback,
      usedFallback: true,
      llm
    };
  }

  const parsed = parseJsonFromText(llm.text);
  const tasks = Array.isArray(parsed?.tasks) ? parsed.tasks : [];
  if (!tasks.length) {
    return {
      executionBacklog: fallback,
      usedFallback: true,
      llm
    };
  }

  const normalized = tasks.slice(0, 24).map((task, idx) => ({
    title: String(task?.title || `Execution task ${idx + 1}`),
    description: String(task?.description || ""),
    skillId: String(task?.skillId || recommended[Math.min(idx, recommended.length - 1)]?.id || ""),
    taskType: String(task?.taskType || "implementation"),
    ownerRole: String(task?.ownerRole || "channel-specialist"),
    priority: String(task?.priority || "medium"),
    dueInDays: Number.isFinite(Number(task?.dueInDays)) ? Number(task.dueInDays) : 7 + idx * 3,
    kpi: String(task?.kpi || ""),
    status: String(task?.status || "planned"),
    integrationHint: String(task?.integrationHint || "create-in-pm")
  }));

  return {
    executionBacklog: normalized,
    usedFallback: false,
    llm
  };
}

export async function runIntelligenceStack({ input, persist = true } = {}) {
  const recommendedBase = recommendSkills(input, 12);
  const recommended = mergeRecommendedWithManualSelection(input, recommendedBase, 12);
  const facets = getPrioritizedFacets(recommended);
  const skillDocs = await readManySkills(recommended.map((s) => s.id));

  const researchResult = await generateComprehensiveResearch({ input, recommended, facets, skillDocs });
  const strategyResult = await generateStrategyNarrative({
    input,
    recommended,
    research: researchResult.research,
    skillDocs
  });

  const strategy = strategyResult.usedFallback
    ? fallbackStrategy({ input, recommended, facets, skillDocs, research: researchResult.research })
    : strategyResult.strategy;

  const backlogResult = await generateExecutionBacklog({
    input,
    recommended,
    research: researchResult.research,
    strategy
  });

  let runId = null;
  let taskIds = [];
  if (persist) {
    runId = await saveStrategyRun({
      input,
      recommendedSkills: recommended,
      research: researchResult.research,
      strategy,
      backlog: backlogResult.executionBacklog,
      facets,
      usedFallback: strategyResult.usedFallback,
      researchUsedFallback: researchResult.usedFallback,
      llm: strategyResult.llm,
      researchLlm: researchResult.llm
    });

    taskIds = await saveExecutionTasks({
      strategyRunId: runId,
      tasks: backlogResult.executionBacklog
    });
  }

  return {
    runId,
    taskIds,
    facets,
    recommendedSkills: recommended,
    research: researchResult.research,
    researchUsedFallback: researchResult.usedFallback,
    strategy,
    usedFallback: strategyResult.usedFallback,
    researchMcp: researchResult.mcp,
    executionBacklog: backlogResult.executionBacklog,
    executionBacklogUsedFallback: backlogResult.usedFallback,
    llm: strategyResult.llm,
    researchLlm: researchResult.llm,
    executionLlm: backlogResult.llm
  };
}

export async function generateStrategy(input) {
  const result = await runIntelligenceStack({ input, persist: true });
  return {
    runId: result.runId,
    taskIds: result.taskIds,
    facets: result.facets,
    recommendedSkills: result.recommendedSkills,
    strategy: result.strategy,
    research: result.research,
    researchMcp: result.researchMcp,
    executionBacklog: result.executionBacklog,
    executionBacklogUsedFallback: result.executionBacklogUsedFallback,
    researchUsedFallback: result.researchUsedFallback,
    usedFallback: result.usedFallback,
    llm: result.llm,
    researchLlm: result.researchLlm,
    executionLlm: result.executionLlm
  };
}

export async function executeSkillTask({ input, skillId, taskType, deliverable }) {
  const skill = await readSkill(skillId);
  const mcpPlan = buildMcpPlan(skillId);
  const mcp = await runMcpPlan({ plan: mcpPlan, inputContext: input });

  const mcpSummary = mcp.status === "ok"
    ? JSON.stringify(mcp.results, null, 2)
    : `MCP status: ${mcp.status}\n${mcp.note || "No additional details."}`;

  const prompt = [
    `Use the skill '${skill.id}' to produce a ${taskType} deliverable.`,
    "",
    "Context:",
    ...contextLines(input),
    "",
    "Skill reference:",
    summarizeSkillBody(skill.content, 6000),
    "",
    "MCP data:",
    mcpSummary,
    "",
    "Output requirements:",
    `- Deliverable: ${deliverable || "Client-ready plan"}`,
    "- Return markdown with diagnosis, prioritized actions, implementation steps, owners, and KPI checkpoints.",
    "- Include assumptions explicitly."
  ].join("\n");

  const llm = await generateWithLlm({
    system: "You are an execution-focused marketing operator. Use skill knowledge, context, and MCP data to produce actionable outputs.",
    prompt,
    maxOutputTokens: 2100,
    providerPreference: process.env.INTELLIGENCE_EXECUTION_PROVIDER || "auto"
  });

  const output = llm.ok
    ? llm.text
    : fallbackExecution({ skillId, taskType, deliverable, input, skillContent: skill.content });

  const taskIds = await saveExecutionTasks({
    strategyRunId: Number(input?.runId) || null,
    tasks: [{
      title: `${skillId}: ${deliverable || "Client-ready output"}`,
      description: output.slice(0, 2000),
      skillId,
      taskType,
      ownerRole: "channel-specialist",
      priority: "high",
      dueInDays: 7,
      kpi: getGoalProfile(input.goal).kpi,
      status: "planned",
      integrationHint: "create-in-pm"
    }]
  });

  return {
    output,
    usedFallback: !llm.ok,
    llm,
    mcp,
    taskIds
  };
}
