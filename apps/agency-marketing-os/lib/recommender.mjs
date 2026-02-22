const skillCatalog = [
  { id: "agency-command-center", category: "growth", channel: "strategy", deliverable: "90-day operating blueprint", why: "Orchestrates full-service execution across client accounts." },
  { id: "ab-test-setup", category: "cro", channel: "cro", deliverable: "Prioritized test backlog", why: "Converts hypotheses into measurable experiments." },
  { id: "analytics-tracking", category: "growth", channel: "strategy", deliverable: "Tracking plan and QA checklist", why: "Creates reliable data for decisions and reporting." },
  { id: "competitor-alternatives", category: "seo", channel: "seo", deliverable: "Comparison page strategy", why: "Captures high-intent competitor traffic." },
  { id: "content-strategy", category: "content", channel: "content", deliverable: "Content calendar and distribution map", why: "Builds demand and authority over time." },
  { id: "copy-editing", category: "content", channel: "content", deliverable: "Conversion-focused copy revisions", why: "Improves clarity and persuasion on existing assets." },
  { id: "copywriting", category: "content", channel: "content", deliverable: "Messaging framework and draft assets", why: "Creates new conversion assets quickly." },
  { id: "eeat-optimization", category: "seo", channel: "seo", deliverable: "Trust and authority upgrade plan", why: "Improves quality and trust signals for search." },
  { id: "email-sequence", category: "content", channel: "email", deliverable: "Lifecycle email sequence", why: "Converts and nurtures leads across stages." },
  { id: "form-cro", category: "cro", channel: "cro", deliverable: "High-completion form redesign", why: "Reduces friction at conversion points." },
  { id: "free-tool-strategy", category: "growth", channel: "content", deliverable: "Tool-led acquisition plan", why: "Creates compounding inbound lead flow." },
  { id: "image-seo", category: "seo", channel: "seo", deliverable: "Image optimization spec", why: "Strengthens visual search and page relevance." },
  { id: "launch-strategy", category: "growth", channel: "strategy", deliverable: "Launch campaign plan", why: "Aligns channels for a synchronized release." },
  { id: "link-building", category: "seo", channel: "seo", deliverable: "Authority acquisition roadmap", why: "Improves ranking potential through external authority." },
  { id: "marketing-ideas", category: "growth", channel: "strategy", deliverable: "Campaign concept bank", why: "Finds high-leverage campaign angles quickly." },
  { id: "marketing-psychology", category: "growth", channel: "content", deliverable: "Persuasion framework by funnel stage", why: "Raises conversion through behavioral design." },
  { id: "on-page-seo", category: "seo", channel: "seo", deliverable: "Page-level optimization map", why: "Improves ranking and intent alignment." },
  { id: "onboarding-cro", category: "cro", channel: "email", deliverable: "Activation flow improvements", why: "Improves activation and reduces early churn." },
  { id: "page-cro", category: "cro", channel: "cro", deliverable: "Conversion page audit and rewrite plan", why: "Fixes page-level leakage in acquisition funnels." },
  { id: "paid-ads", category: "growth", channel: "paid", deliverable: "Channel and budget architecture", why: "Generates fast demand and measurable pipeline." },
  { id: "paywall-upgrade-cro", category: "cro", channel: "cro", deliverable: "Upgrade path optimization", why: "Increases free-to-paid conversion rates." },
  { id: "popup-cro", category: "cro", channel: "cro", deliverable: "Lead capture overlay strategy", why: "Improves capture without major rebuild." },
  { id: "pricing-strategy", category: "growth", channel: "strategy", deliverable: "Tier and offer redesign", why: "Increases ARPU and win rate." },
  { id: "programmatic-seo", category: "seo", channel: "seo", deliverable: "Scalable page generation model", why: "Expands search footprint efficiently." },
  { id: "referral-program", category: "growth", channel: "strategy", deliverable: "Referral engine design", why: "Turns clients and users into acquisition channels." },
  { id: "schema-markup", category: "seo", channel: "seo", deliverable: "Structured data deployment plan", why: "Improves crawl clarity and SERP enhancements." },
  { id: "seo-toolkit-suite", category: "seo", channel: "seo", deliverable: "SEO platform-style diagnostics and execution roadmap", why: "Combines scanner, bulk analysis, competitor comparison, schema, and AI visibility planning." },
  { id: "seo-audit", category: "seo", channel: "seo", deliverable: "Technical and content diagnostics", why: "Finds highest-impact ranking issues." },
  { id: "signup-flow-cro", category: "cro", channel: "cro", deliverable: "Signup flow redesign", why: "Raises completion through friction reduction." },
  { id: "social-content", category: "content", channel: "content", deliverable: "Platform-native content plan", why: "Builds demand and credibility across social channels." },
  { id: "topical-authority", category: "seo", channel: "seo", deliverable: "Cluster and hub roadmap", why: "Improves long-term topical depth and rankings." }
];

const goalProfiles = {
  "lead-gen": {
    motion: "Pipeline Acceleration",
    kpi: "Qualified Leads",
    boosts: ["agency-command-center", "paid-ads", "page-cro", "form-cro", "email-sequence", "analytics-tracking", "copywriting", "ab-test-setup", "signup-flow-cro"]
  },
  organic: {
    motion: "Authority Compounding",
    kpi: "Qualified Organic Sessions",
    boosts: ["agency-command-center", "seo-toolkit-suite", "seo-audit", "on-page-seo", "topical-authority", "content-strategy", "link-building", "schema-markup", "eeat-optimization", "programmatic-seo", "image-seo"]
  },
  conversion: {
    motion: "Funnel Efficiency",
    kpi: "Conversion Rate",
    boosts: ["agency-command-center", "page-cro", "form-cro", "signup-flow-cro", "ab-test-setup", "copy-editing", "copywriting", "analytics-tracking", "popup-cro"]
  },
  retention: {
    motion: "Lifecycle Expansion",
    kpi: "Net Revenue Retention",
    boosts: ["agency-command-center", "onboarding-cro", "email-sequence", "pricing-strategy", "paywall-upgrade-cro", "referral-program", "analytics-tracking", "marketing-psychology"]
  },
  launch: {
    motion: "Coordinated Launch",
    kpi: "Launch Pipeline Value",
    boosts: ["agency-command-center", "launch-strategy", "paid-ads", "social-content", "email-sequence", "copywriting", "page-cro", "analytics-tracking", "content-strategy"]
  },
  "full-funnel": {
    motion: "Integrated Growth System",
    kpi: "Revenue Growth Rate",
    boosts: ["agency-command-center", "seo-toolkit-suite", "paid-ads", "page-cro", "analytics-tracking", "content-strategy", "email-sequence", "seo-audit", "pricing-strategy", "onboarding-cro", "social-content"]
  }
};

function normalize(value) {
  return String(value || "").toLowerCase();
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  return [];
}

export function getSkillCatalog() {
  return skillCatalog;
}

export function getGoalProfile(goal) {
  return goalProfiles[goal] || goalProfiles["full-funnel"];
}

function scoreSkill(skill, input) {
  const profile = getGoalProfile(input.goal);
  let score = 0;

  if (profile.boosts.includes(skill.id)) score += 8;
  if (input.channels.includes(skill.channel)) score += 4;
  if (skill.id === "agency-command-center") score += 5;

  if (normalize(input.market).includes("local")) {
    if (["seo-audit", "schema-markup", "on-page-seo", "competitor-alternatives"].includes(skill.id)) score += 3;
  }
  if (normalize(input.market).includes("b2b")) {
    if (["paid-ads", "email-sequence", "content-strategy", "copywriting", "analytics-tracking"].includes(skill.id)) score += 2;
  }
  if ((input.budget || 0) < 8000) {
    if (skill.id === "paid-ads") score -= 3;
    if (["seo-audit", "content-strategy", "copywriting", "email-sequence"].includes(skill.id)) score += 2;
  }
  if ((input.budget || 0) > 20000 && ["paid-ads", "ab-test-setup", "programmatic-seo"].includes(skill.id)) score += 2;
  if ((input.capacity || 0) < 90 && ["programmatic-seo", "launch-strategy", "free-tool-strategy"].includes(skill.id)) score -= 2;
  if (normalize(input.constraints).includes("data") && skill.id === "analytics-tracking") score += 4;
  if (normalize(input.constraints).includes("approval") && ["copy-editing", "page-cro", "email-sequence"].includes(skill.id)) score += 1;

  return score;
}

export function recommendSkills(input, limit = 10) {
  const cleanInput = {
    goal: input.goal || "full-funnel",
    market: input.market || "",
    budget: Number(input.budget) || 0,
    capacity: Number(input.capacity) || 0,
    constraints: input.constraints || "",
    channels: asArray(input.channels)
  };

  return skillCatalog
    .map((skill) => ({ ...skill, score: scoreSkill(skill, cleanInput) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
