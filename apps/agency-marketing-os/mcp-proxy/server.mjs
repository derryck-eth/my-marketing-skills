import { createServer } from "node:http";
import { listDirectTools, runDirectQuery } from "./adapters/index.mjs";

const port = Number(process.env.MCP_PROXY_PORT || 4000);
const host = process.env.MCP_PROXY_HOST || "127.0.0.1";
const mode = (process.env.MCP_PROXY_MODE || "mock").toLowerCase();
const token = process.env.MCP_PROXY_TOKEN || "";
const requestTimeoutMs = Number(process.env.MCP_PROXY_TIMEOUT_MS || 15000);
const directTools = listDirectTools();
const corsOrigin = process.env.MCP_PROXY_CORS_ORIGIN || "*";

const supportedTools = [
  "ga4",
  "adobe-analytics",
  "amplitude",
  "mixpanel",
  "posthog",
  "segment",
  "google-ads",
  "linkedin-ads",
  "meta-ads",
  "tiktok-ads",
  "customer-io",
  "mailchimp",
  "resend",
  "sendgrid",
  "hubspot",
  "salesforce",
  "ahrefs",
  "google-search-console",
  "semrush",
  "stripe",
  "shopify",
  "webflow",
  "wordpress",
  "dub",
  "kit",
  "mention-me",
  "rewardful",
  "tolt",
  "zapier"
];

function json(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  });
  res.end(JSON.stringify(body, null, 2));
}

async function parseJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const bodyText = Buffer.concat(chunks).toString("utf8").trim();
  if (!bodyText) return {};
  return JSON.parse(bodyText);
}

function requireAuth(req) {
  if (!token) return true;
  const auth = req.headers.authorization || "";
  return auth === `Bearer ${token}`;
}

function normalizeToolName(toolName) {
  return String(toolName || "")
    .trim()
    .toLowerCase();
}

function envWebhookForTool(toolName) {
  const key = normalizeToolName(toolName).replace(/[^a-z0-9]/g, "_").toUpperCase();
  const exact = process.env[`TOOL_${key}_WEBHOOK_URL`];
  if (exact) return exact;
  return "";
}

function mockResult({ tool, query, context }) {
  const now = new Date().toISOString();
  const goal = context?.goal || "full-funnel";
  const market = context?.market || "unknown market";

  return {
    tool,
    status: "ok",
    mode: "mock",
    query,
    generatedAt: now,
    summary: `Mock ${tool} data for ${goal} in ${market}.`,
    data: {
      trend: [
        { period: "W-3", value: 62 },
        { period: "W-2", value: 68 },
        { period: "W-1", value: 75 },
        { period: "W0", value: 83 }
      ],
      notes: [
        "High-intent channels outperform prospecting.",
        "Landing-page CVR is below benchmark on mobile.",
        "Attribution gaps detected in top-of-funnel events."
      ]
    }
  };
}

async function runWebhookQuery({ tool, query, context }) {
  const webhookUrl = envWebhookForTool(tool);
  if (!webhookUrl) {
    return {
      tool,
      status: "not_configured",
      mode: "webhook",
      query,
      note: `No webhook configured for tool '${tool}'. Set TOOL_${normalizeToolName(tool).replace(/[^a-z0-9]/g, "_").toUpperCase()}_WEBHOOK_URL`
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool, query, context }),
      signal: controller.signal
    });

    clearTimeout(timeout);
    const text = await response.text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text };
    }

    if (!response.ok) {
      return {
        tool,
        status: "error",
        mode: "webhook",
        query,
        note: `Webhook returned ${response.status}`,
        raw: parsed
      };
    }

    return {
      tool,
      status: "ok",
      mode: "webhook",
      query,
      result: parsed
    };
  } catch (error) {
    clearTimeout(timeout);
    return {
      tool,
      status: "error",
      mode: "webhook",
      query,
      note: error?.message || "Webhook request failed"
    };
  }
}

async function executeQuery({ tool, query, context }) {
  const normalizedTool = normalizeToolName(tool);
  if (mode === "webhook") {
    return runWebhookQuery({ tool: normalizedTool, query, context });
  }
  if (mode === "direct") {
    return runDirectQuery({ tool: normalizedTool, query, context, timeoutMs: requestTimeoutMs });
  }
  return mockResult({ tool: normalizedTool, query, context });
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const path = url.pathname;

    if (req.method === "OPTIONS") {
      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && path === "/health") {
      return json(res, 200, {
        ok: true,
        mode,
        supportedModes: ["mock", "webhook", "direct"],
        now: new Date().toISOString(),
        hasToken: Boolean(token),
        supportedTools,
        directTools
      });
    }

    if (req.method === "GET" && path === "/tools") {
      return json(res, 200, { ok: true, mode, tools: supportedTools, directTools });
    }

    if (req.method === "POST" && path === "/query") {
      if (!requireAuth(req)) {
        return json(res, 401, { ok: false, error: "Unauthorized" });
      }

      const body = await parseJsonBody(req);
      const plan = Array.isArray(body?.plan) ? body.plan : [];
      const context = typeof body?.context === "object" && body.context ? body.context : {};

      if (!plan.length) {
        return json(res, 400, { ok: false, error: "plan must be a non-empty array" });
      }

      const results = await Promise.all(plan.map((item) => {
        const tool = normalizeToolName(item?.tool);
        const query = String(item?.query || "");
        if (!tool || !query) {
          return Promise.resolve({
            tool,
            status: "error",
            mode,
            query,
            note: "Each plan item requires { tool, query }"
          });
        }
        return executeQuery({ tool, query, context });
      }));

      return json(res, 200, {
        ok: true,
        mode,
        count: results.length,
        results
      });
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
  console.log(`[mcp-proxy] listening on http://${host}:${port}`);
  console.log(`[mcp-proxy] mode: ${mode}`);
});
