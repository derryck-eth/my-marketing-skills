import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

import { executeSkillTask, generateStrategy } from "./lib/engine.mjs";
import { getLlmConfig } from "./lib/llm.mjs";
import { getMcpConfig, runMcpPlan } from "./lib/mcp.mjs";
import {
  getSeoToolkitModules,
  runSeoFullAudit,
  runSeoGscProfileAudit,
  runSeoAiVisibility,
  runSeoBulk,
  runSeoCompare,
  runSeoContentAnalysis,
  runSeoMarketResearch,
  runSeoReport,
  runSeoScan,
  runSeoSchema,
  runSeoSnippetLab
} from "./lib/seoToolkit.mjs";
import {
  createSeoProject,
  deleteSeoIntegration,
  deleteSeoProject,
  getDbConfig,
  getDbHealth,
  getSeoIntegrationCredentialsMap,
  getStrategyRun,
  initDb,
  listSeoIntegrations,
  listSeoModuleRuns,
  listSeoProjects,
  listStrategyRuns,
  listTasks,
  logIntegrationEvent,
  saveSeoModuleRun,
  upsertSeoIntegration,
  updateTaskIntegrationResult,
  updateTaskStatus
} from "./lib/db.mjs";
import { getRepoRoot, listSkills } from "./lib/skills.mjs";
import { getTaskIntegrationConfig, syncTasksToIntegration } from "./lib/taskIntegrations.mjs";

const repoRoot = getRepoRoot();
const demoPath = resolve(repoRoot, "apps/agency-marketing-os/ui/seo-workspace.html");
const legacyDemoPath = resolve(repoRoot, "skills/agency-command-center/demo.html");
const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "127.0.0.1";
const corsOrigin = process.env.AGENCY_OS_CORS_ORIGIN || "*";
const seoRunners = {
  "/api/seo/scan": runSeoScan,
  "/api/seo/bulk": runSeoBulk,
  "/api/seo/compare": runSeoCompare,
  "/api/seo/schema": runSeoSchema,
  "/api/seo/ai-visibility": runSeoAiVisibility,
  "/api/seo/market-research": runSeoMarketResearch,
  "/api/seo/gsc-profile-audit": runSeoGscProfileAudit,
  "/api/seo/snippet-lab": runSeoSnippetLab,
  "/api/seo/content-analysis": runSeoContentAnalysis,
  "/api/seo/full-audit": runSeoFullAudit,
  "/api/seo/report": runSeoReport
};

await initDb();

async function pingMcpProxy(proxyUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const response = await fetch(`${proxyUrl.replace(/\/$/, "")}/health`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!response.ok) {
      return { reachable: false, status: response.status };
    }
    const json = await response.json();
    return {
      reachable: true,
      mode: json.mode || "unknown",
      hasToken: Boolean(json.hasToken)
    };
  } catch (error) {
    clearTimeout(timeout);
    return {
      reachable: false,
      error: error?.message || "Unable to reach proxy"
    };
  }
}

function json(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS"
  });
  res.end(JSON.stringify(body, null, 2));
}

function text(res, status, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": contentType,
    "Access-Control-Allow-Origin": corsOrigin
  });
  res.end(body);
}

async function parseJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const bodyText = Buffer.concat(chunks).toString("utf8").trim();
  if (!bodyText) return {};
  return JSON.parse(bodyText);
}

function sanitizeInput(input) {
  const competitors = Array.isArray(input?.competitors)
    ? input.competitors.map(String).filter(Boolean)
    : String(input?.competitors || "")
      .split(/[\n,]+/)
      .map((v) => v.trim())
      .filter(Boolean);

  return {
    agencyName: String(input?.agencyName || "Agency"),
    businessName: String(input?.businessName || ""),
    website: String(input?.website || ""),
    geography: String(input?.geography || ""),
    industry: String(input?.industry || ""),
    product: String(input?.product || ""),
    targetCustomer: String(input?.targetCustomer || ""),
    currentEfforts: String(input?.currentEfforts || ""),
    goalsDetail: String(input?.goalsDetail || ""),
    competitors,
    market: String(input?.market || ""),
    goal: String(input?.goal || "full-funnel"),
    horizon: Number(input?.horizon || 90),
    budget: Number(input?.budget || 0),
    capacity: Number(input?.capacity || 0),
    constraints: String(input?.constraints || ""),
    channels: Array.isArray(input?.channels) ? input.channels.map(String) : [],
    selectedSkills: Array.isArray(input?.selectedSkills) ? input.selectedSkills.map(String) : [],
    selectedIntegrations: Array.isArray(input?.selectedIntegrations) ? input.selectedIntegrations.map(String) : [],
    projectId: Number.isFinite(Number(input?.projectId)) ? Number(input.projectId) : null,
    runId: input?.runId != null ? Number(input.runId) : null
  };
}

function integrationKeyHint(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.length <= 8) return "*".repeat(raw.length);
  return `${raw.slice(0, 4)}...${raw.slice(-4)}`;
}

function normalizeIntegrationName(value) {
  return String(value || "").trim().toLowerCase();
}

function pickIntegrationKeyHint({ apiKey = "", config = {} } = {}) {
  const direct = integrationKeyHint(apiKey);
  if (direct) return direct;

  const maybeKey = String(
    config?.apiKey
      || config?.accessToken
      || config?.refreshToken
      || config?.developerToken
      || ""
  );
  return integrationKeyHint(maybeKey);
}

function seoTargetUrlFromBody(body = {}, input = {}) {
  return String(
    body?.url
      || body?.pageUrl
      || body?.primaryUrl
      || body?.propertyUrl
      || input?.website
      || ""
  );
}

function seoQueryFromResult(result = {}, body = {}) {
  return String(
    result?.result?.detectedPrimaryQuery
      || result?.result?.primaryKeyword
      || body?.primaryQuery
      || body?.targetKeyword
      || ""
  );
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (req.method === "OPTIONS") {
      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && (pathname === "/" || pathname === "/demo")) {
      const html = await fs.readFile(demoPath, "utf8");
      return text(res, 200, html, "text/html; charset=utf-8");
    }

    if (req.method === "GET" && pathname === "/legacy-demo") {
      const html = await fs.readFile(legacyDemoPath, "utf8");
      return text(res, 200, html, "text/html; charset=utf-8");
    }

    if (req.method === "GET" && pathname === "/api/health") {
      const skills = await listSkills();
      const mcp = getMcpConfig();
      const mcpRuntime = await pingMcpProxy(mcp.proxyUrl);
      const db = await getDbHealth();
      return json(res, 200, {
        ok: true,
        now: new Date().toISOString(),
        llm: getLlmConfig(),
        mcp,
        mcpRuntime,
        db,
        taskIntegrations: getTaskIntegrationConfig(),
        dbConfig: getDbConfig(),
        skillsCount: skills.length
      });
    }

    if (req.method === "GET" && pathname === "/api/skills") {
      const skills = await listSkills();
      return json(res, 200, { ok: true, skills });
    }

    if (req.method === "GET" && pathname === "/api/runs") {
      const limit = Number(url.searchParams.get("limit") || 20);
      const runs = await listStrategyRuns(limit);
      return json(res, 200, { ok: true, runs });
    }

    const runMatch = pathname.match(/^\/api\/runs\/(\d+)$/);
    if (req.method === "GET" && runMatch) {
      const run = await getStrategyRun(Number(runMatch[1]));
      if (!run) return json(res, 404, { ok: false, error: "Run not found" });
      return json(res, 200, { ok: true, run });
    }

    if (req.method === "GET" && pathname === "/api/tasks") {
      const limit = Number(url.searchParams.get("limit") || 100);
      const status = String(url.searchParams.get("status") || "");
      const strategyRunId = url.searchParams.get("runId");
      const tasks = await listTasks({
        limit,
        status,
        strategyRunId: strategyRunId == null ? null : Number(strategyRunId)
      });
      return json(res, 200, { ok: true, tasks });
    }

    const taskStatusMatch = pathname.match(/^\/api\/tasks\/(\d+)\/status$/);
    if (req.method === "POST" && taskStatusMatch) {
      const body = await parseJsonBody(req);
      const status = String(body?.status || "planned");
      await updateTaskStatus(Number(taskStatusMatch[1]), status);
      return json(res, 200, { ok: true, taskId: Number(taskStatusMatch[1]), status });
    }

    if (req.method === "POST" && pathname === "/api/tasks/sync") {
      const body = await parseJsonBody(req);
      const runId = body?.runId != null ? Number(body.runId) : null;

      let tasks = [];
      let runInput = {};
      if (runId != null) {
        const run = await getStrategyRun(runId);
        if (!run) return json(res, 404, { ok: false, error: "Run not found" });
        tasks = run.tasks || [];
        runInput = run.input || {};
      } else {
        const taskIds = Array.isArray(body?.taskIds) ? body.taskIds.map((v) => Number(v)).filter((v) => Number.isFinite(v)) : [];
        if (!taskIds.length) {
          return json(res, 400, { ok: false, error: "Provide runId or taskIds[]" });
        }
        const fetched = await listTasks({ limit: 200 });
        tasks = fetched.filter((task) => taskIds.includes(task.id));
        runInput = sanitizeInput(body);
      }

      const result = await syncTasksToIntegration({
        tasks,
        runId,
        input: runInput
      });

      for (const item of result.results || []) {
        if (!item?.taskId) continue;
        await updateTaskIntegrationResult(item.taskId, item.status || "unknown", item);
      }

      await logIntegrationEvent({
        provider: result.provider,
        action: "sync_tasks",
        status: result.status,
        payload: { runId, tasksCount: tasks.length },
        result
      });

      return json(res, 200, { ok: true, ...result, tasksCount: tasks.length });
    }

    if (req.method === "GET" && pathname === "/api/seo/modules") {
      return json(res, 200, { ok: true, modules: getSeoToolkitModules() });
    }

    if (req.method === "GET" && pathname === "/api/seo/projects") {
      const limit = Number(url.searchParams.get("limit") || 100);
      const projects = await listSeoProjects(limit);
      return json(res, 200, { ok: true, projects });
    }

    if (req.method === "POST" && pathname === "/api/seo/projects") {
      const body = await parseJsonBody(req);
      const project = await createSeoProject({
        name: body?.name,
        domain: body?.domain,
        ownerAgency: body?.ownerAgency || body?.agencyName || "",
        metadata: body?.metadata || {}
      });
      return json(res, 200, { ok: true, project });
    }

    const seoProjectDeleteMatch = pathname.match(/^\/api\/seo\/projects\/(\d+)$/);
    if (req.method === "DELETE" && seoProjectDeleteMatch) {
      await deleteSeoProject(Number(seoProjectDeleteMatch[1]));
      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && pathname === "/api/seo/integrations") {
      const integrations = await listSeoIntegrations(200);
      return json(res, 200, { ok: true, integrations });
    }

    if (req.method === "POST" && pathname === "/api/seo/integrations") {
      const body = await parseJsonBody(req);
      const config = body?.config && typeof body.config === "object" ? body.config : {};
      const secret = {};
      if (body?.apiKey) secret.apiKey = String(body.apiKey);
      for (const [key, value] of Object.entries(config)) {
        secret[key] = value;
      }
      const integration = await upsertSeoIntegration({
        integrationName: body?.integrationName || body?.name,
        integrationKeyHint: pickIntegrationKeyHint({
          apiKey: body?.apiKey || body?.keyHint || "",
          config
        }),
        isActive: body?.isActive !== false,
        metadata: body?.metadata || {},
        secret
      });
      return json(res, 200, { ok: true, integration });
    }

    if (req.method === "POST" && pathname === "/api/seo/integrations/test") {
      const body = await parseJsonBody(req);
      const integrationName = normalizeIntegrationName(body?.integrationName || body?.name || "");
      if (!integrationName) {
        return json(res, 400, { ok: false, error: "integrationName is required" });
      }

      const integrationCredentials = await getSeoIntegrationCredentialsMap({
        activeOnly: false,
        names: [integrationName]
      });
      const mcp = await runMcpPlan({
        plan: [{
          tool: integrationName,
          query: "Run integration connectivity check and return a compact account/property/campaign snapshot with key metrics."
        }],
        inputContext: {
          website: String(body?.website || ""),
          goal: "integration-test",
          moduleId: "integration-test",
          integrationCredentials
        }
      });

      return json(res, 200, {
        ok: true,
        integrationName,
        hasStoredCredentials: Boolean(Object.keys(integrationCredentials[integrationName] || {}).length),
        mcp
      });
    }

    const seoIntegrationDeleteMatch = pathname.match(/^\/api\/seo\/integrations\/(\d+)$/);
    if (req.method === "DELETE" && seoIntegrationDeleteMatch) {
      await deleteSeoIntegration(Number(seoIntegrationDeleteMatch[1]));
      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && pathname === "/api/seo/history") {
      const limit = Number(url.searchParams.get("limit") || 50);
      const projectIdParam = url.searchParams.get("projectId");
      const moduleId = String(url.searchParams.get("module") || "");
      const history = await listSeoModuleRuns({
        limit,
        moduleId,
        projectId: projectIdParam == null ? null : Number(projectIdParam)
      });
      return json(res, 200, { ok: true, history });
    }

    if (req.method === "POST" && seoRunners[pathname]) {
      const body = await parseJsonBody(req);
      const input = sanitizeInput(body);
      const activeIntegrationCredentials = await getSeoIntegrationCredentialsMap({
        activeOnly: true,
        names: input.selectedIntegrations
      });
      const activeIntegrationNames = Object.keys(activeIntegrationCredentials);
      if (!input.selectedIntegrations.length && activeIntegrationNames.length) {
        input.selectedIntegrations = activeIntegrationNames;
      }
      const mergedBody = {
        ...body,
        selectedIntegrations: input.selectedIntegrations,
        integrationCredentials: activeIntegrationCredentials
      };
      const runner = seoRunners[pathname];
      const moduleId = pathname.replace("/api/seo/", "");
      try {
        const result = await runner(input, mergedBody);
        const seoRunId = await saveSeoModuleRun({
          projectId: input.projectId,
          moduleId,
          targetUrl: seoTargetUrlFromBody(mergedBody, input),
          detectedQuery: seoQueryFromResult(result, mergedBody),
          input: {
            ...body,
            selectedIntegrations: input.selectedIntegrations
          },
          result: result?.result ?? result,
          workflow: result?.workflow || [],
          sourcesUsed: result?.sourcesUsed || [],
          confidence: result?.confidence ?? null,
          usedFallback: Boolean(result?.usedFallback),
          mcpStatus: String(result?.mcp?.status || ""),
          error: ""
        });
        return json(res, 200, { ok: true, input, seoRunId, ...result });
      } catch (error) {
        const seoRunId = await saveSeoModuleRun({
          projectId: input.projectId,
          moduleId,
          targetUrl: seoTargetUrlFromBody(mergedBody, input),
          detectedQuery: String(mergedBody?.primaryQuery || mergedBody?.targetKeyword || ""),
          input: {
            ...body,
            selectedIntegrations: input.selectedIntegrations
          },
          result: null,
          workflow: [],
          sourcesUsed: [],
          confidence: null,
          usedFallback: false,
          mcpStatus: "error",
          error: error?.message || "Unknown error"
        });
        return json(res, 500, {
          ok: false,
          error: "SEO module execution failed",
          detail: error?.message || "Unknown error",
          moduleId,
          seoRunId
        });
      }
    }

    if (req.method === "POST" && pathname === "/api/strategy") {
      const body = await parseJsonBody(req);
      const input = sanitizeInput(body);
      const result = await generateStrategy(input);
      return json(res, 200, { ok: true, input, ...result });
    }

    if (req.method === "POST" && pathname === "/api/intelligence/run") {
      const body = await parseJsonBody(req);
      const input = sanitizeInput(body);
      const result = await generateStrategy(input);
      return json(res, 200, { ok: true, input, ...result });
    }

    if (req.method === "POST" && pathname === "/api/execute") {
      const body = await parseJsonBody(req);
      const input = sanitizeInput(body);
      const skillId = String(body?.skillId || "");
      const taskType = String(body?.taskType || "implementation");
      const deliverable = String(body?.deliverable || "Client-ready output");

      if (!skillId) {
        return json(res, 400, { ok: false, error: "skillId is required" });
      }

      const result = await executeSkillTask({ input, skillId, taskType, deliverable });
      return json(res, 200, { ok: true, input, skillId, taskType, deliverable, ...result });
    }

    if (req.method === "GET") {
      const staticPath = resolve(repoRoot, pathname.slice(1));
      if (staticPath.startsWith(repoRoot)) {
        try {
          const file = await fs.readFile(staticPath);
          const ext = extname(staticPath).toLowerCase();
          const typeMap = {
            ".html": "text/html; charset=utf-8",
            ".css": "text/css; charset=utf-8",
            ".js": "application/javascript; charset=utf-8",
            ".json": "application/json; charset=utf-8",
            ".md": "text/markdown; charset=utf-8"
          };
          return text(res, 200, file, typeMap[ext] || "application/octet-stream");
        } catch {
          // continue to 404
        }
      }
    }

    return json(res, 404, { ok: false, error: "Not found" });
  } catch (error) {
    return json(res, 500, {
      ok: false,
      error: "Internal server error",
      detail: error?.message || "Unknown error"
    });
  }
});

server.listen(port, host, () => {
  const root = fileURLToPath(new URL(".", import.meta.url));
  console.log(`[agency-marketing-os] listening on http://${host}:${port}`);
  console.log(`[agency-marketing-os] app root: ${root}`);
  console.log(`[agency-marketing-os] demo: http://${host}:${port}/demo`);
});
