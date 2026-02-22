const explicitBaseUrl = process.env.AGENCY_OS_BASE_URL || "";
let baseUrl = explicitBaseUrl || "http://127.0.0.1:8787";

async function canReachHealth(candidate) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);
  try {
    const response = await fetch(`${candidate}/api/health`, { signal: controller.signal });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function resolveBaseUrl() {
  if (explicitBaseUrl) return explicitBaseUrl;

  const candidates = [];
  for (let port = 8787; port <= 8797; port++) {
    candidates.push(`http://127.0.0.1:${port}`);
  }

  for (const candidate of candidates) {
    if (await canReachHealth(candidate)) return candidate;
  }

  return "http://127.0.0.1:8787";
}

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  return { ok: response.ok, status: response.status, json };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  baseUrl = await resolveBaseUrl();
  console.log(`[smoke] base URL: ${baseUrl}`);

  const health = await request("/api/health");
  assert(health.ok && health.json.ok, `health check failed (${health.status})`);
  console.log(`[smoke] /api/health ok (mcp mode: ${health.json?.mcpRuntime?.mode || "unknown"})`);

  const sampleInput = {
    agencyName: "Smoke Test Agency",
    businessName: "Smoke HVAC Co",
    website: "https://example.com",
    geography: "United States",
    product: "Commercial HVAC installation and maintenance",
    targetCustomer: "Operations directors at multi-site facilities",
    market: "B2B commercial services",
    goal: "lead-gen",
    horizon: 90,
    budget: 12000,
    capacity: 100,
    constraints: "Need faster SQL growth",
    channels: ["seo", "cro", "paid", "strategy"]
  };

  const strategy = await request("/api/intelligence/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sampleInput)
  });
  assert(strategy.ok && strategy.json.ok, `strategy failed (${strategy.status})`);
  assert(Array.isArray(strategy.json.recommendedSkills), "strategy missing recommendedSkills");
  assert(typeof strategy.json.research === "string", "strategy missing research");
  assert(typeof strategy.json.strategy === "string", "strategy missing narrative text");
  assert(Number.isFinite(Number(strategy.json.runId)), "strategy missing runId");
  assert(Array.isArray(strategy.json.executionBacklog), "strategy missing executionBacklog");
  console.log(`[smoke] /api/intelligence/run ok (${strategy.json.recommendedSkills.length} skills)`);

  const runId = Number(strategy.json.runId);

  const runs = await request("/api/runs");
  assert(runs.ok && runs.json.ok, `runs failed (${runs.status})`);
  assert(Array.isArray(runs.json.runs) && runs.json.runs.length >= 1, "runs list empty");
  console.log("[smoke] /api/runs ok");

  const runDetail = await request(`/api/runs/${runId}`);
  assert(runDetail.ok && runDetail.json.ok, `run detail failed (${runDetail.status})`);
  assert(Array.isArray(runDetail.json.run?.tasks), "run detail missing tasks");
  console.log("[smoke] /api/runs/:id ok");

  const taskList = await request(`/api/tasks?runId=${runId}`);
  assert(taskList.ok && taskList.json.ok, `tasks list failed (${taskList.status})`);
  assert(Array.isArray(taskList.json.tasks), "tasks endpoint missing tasks");
  console.log("[smoke] /api/tasks ok");

  const sync = await request("/api/tasks/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ runId })
  });
  assert(sync.ok && sync.json.ok, `task sync failed (${sync.status})`);
  console.log(`[smoke] /api/tasks/sync ok (${sync.json.status})`);

  const modules = await request("/api/seo/modules");
  assert(modules.ok && modules.json.ok, `seo modules failed (${modules.status})`);
  assert(Array.isArray(modules.json.modules) && modules.json.modules.length >= 6, "seo modules list incomplete");
  console.log(`[smoke] /api/seo/modules ok (${modules.json.modules.length} modules)`);

  const seoScan = await request("/api/seo/scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sampleInput,
      url: sampleInput.website,
      targetKeyword: "commercial roofing services"
    })
  });
  assert(seoScan.ok && seoScan.json.ok, `seo scan failed (${seoScan.status})`);
  assert(typeof seoScan.json.result?.score === "number", "seo scan missing score");
  console.log("[smoke] /api/seo/scan ok");

  const seoBulk = await request("/api/seo/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sampleInput,
      urls: [sampleInput.website, `${sampleInput.website}/services`, `${sampleInput.website}/contact`]
    })
  });
  assert(seoBulk.ok && seoBulk.json.ok, `seo bulk failed (${seoBulk.status})`);
  assert(Array.isArray(seoBulk.json.result?.rows), "seo bulk missing rows");
  console.log("[smoke] /api/seo/bulk ok");

  const seoCompare = await request("/api/seo/compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sampleInput,
      primaryUrl: sampleInput.website,
      competitorUrls: ["https://example.org", "https://example.net"]
    })
  });
  assert(seoCompare.ok && seoCompare.json.ok, `seo compare failed (${seoCompare.status})`);
  assert(Array.isArray(seoCompare.json.result?.comparison), "seo compare missing comparison table");
  console.log("[smoke] /api/seo/compare ok");

  const seoSchema = await request("/api/seo/schema", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sampleInput,
      pageType: "Service",
      pageTitle: "Commercial Roofing Services",
      pageDescription: "Full-service commercial roofing specialists.",
      pageUrl: `${sampleInput.website}/services`
    })
  });
  assert(seoSchema.ok && seoSchema.json.ok, `seo schema failed (${seoSchema.status})`);
  assert(seoSchema.json.result?.schema && typeof seoSchema.json.result.schema === "object", "seo schema missing payload");
  console.log("[smoke] /api/seo/schema ok");

  const seoAiVisibility = await request("/api/seo/ai-visibility", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sampleInput,
      urls: [sampleInput.website, `${sampleInput.website}/services`],
      entities: ["Commercial Roofing", "Facility Maintenance", "Energy Efficiency"]
    })
  });
  assert(seoAiVisibility.ok && seoAiVisibility.json.ok, `seo ai visibility failed (${seoAiVisibility.status})`);
  assert(Array.isArray(seoAiVisibility.json.result?.priorityActions), "seo ai visibility missing actions");
  console.log("[smoke] /api/seo/ai-visibility ok");

  const seoMarketResearch = await request("/api/seo/market-research", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sampleInput,
      competitorUrls: ["https://example.org", "https://example.net"]
    })
  });
  assert(seoMarketResearch.ok && seoMarketResearch.json.ok, `seo market research failed (${seoMarketResearch.status})`);
  assert(Array.isArray(seoMarketResearch.json.result?.competitorLandscape), "seo market research missing competitorLandscape");
  console.log("[smoke] /api/seo/market-research ok");

  const seoFullAudit = await request("/api/seo/full-audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sampleInput,
      primaryUrl: sampleInput.website,
      competitorUrls: ["https://example.org", "https://example.net"],
      targetKeyword: "commercial roofing services"
    })
  });
  assert(seoFullAudit.ok && seoFullAudit.json.ok, `seo full audit failed (${seoFullAudit.status})`);
  assert(typeof seoFullAudit.json.result?.overallScore === "number", "seo full audit missing overallScore");
  console.log("[smoke] /api/seo/full-audit ok");

  const seoContentAnalysis = await request("/api/seo/content-analysis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sampleInput,
      url: `${sampleInput.website}/services`,
      primaryQuery: "commercial roofing services",
      competitorUrls: ["https://example.org/services", "https://example.net/services"]
    })
  });
  assert(seoContentAnalysis.ok && seoContentAnalysis.json.ok, `seo content analysis failed (${seoContentAnalysis.status})`);
  assert(typeof seoContentAnalysis.json.result?.detectedPrimaryQuery === "string", "seo content analysis missing detectedPrimaryQuery");
  console.log("[smoke] /api/seo/content-analysis ok");

  const seoReport = await request("/api/seo/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sampleInput,
      primaryUrl: sampleInput.website,
      targetKeyword: "commercial roofing services"
    })
  });
  assert(seoReport.ok && seoReport.json.ok, `seo report failed (${seoReport.status})`);
  assert(typeof seoReport.json.result?.overallSeoHealth === "number", "seo report missing overall score");
  console.log("[smoke] /api/seo/report ok");

  const execute = await request("/api/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...sampleInput,
      runId,
      skillId: "page-cro",
      taskType: "audit",
      deliverable: "Landing page action plan"
    })
  });
  assert(execute.ok && execute.json.ok, `execute failed (${execute.status})`);
  assert(typeof execute.json.output === "string", "execute missing output");
  console.log(`[smoke] /api/execute ok (mcp status: ${execute.json?.mcp?.status || "unknown"})`);

  console.log("[smoke] PASS");
}

run().catch((error) => {
  console.error("[smoke] FAIL:", error.message);
  process.exit(1);
});
