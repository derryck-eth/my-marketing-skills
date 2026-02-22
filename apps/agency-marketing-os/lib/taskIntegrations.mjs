import { runMcpPlan } from "./mcp.mjs";

function cleanProvider(value) {
  return String(value || "none").trim().toLowerCase();
}

function nowIso() {
  return new Date().toISOString();
}

function normalizeTask(task) {
  return {
    id: task.id,
    title: String(task.title || "Execution task"),
    description: String(task.description || ""),
    skillId: String(task.skillId || ""),
    taskType: String(task.taskType || "implementation"),
    ownerRole: String(task.ownerRole || "growth-operator"),
    priority: String(task.priority || "medium"),
    dueInDays: Number.isFinite(Number(task.dueInDays)) ? Number(task.dueInDays) : null,
    kpi: String(task.kpi || ""),
    integrationHint: String(task.integrationHint || "")
  };
}

export function getTaskIntegrationConfig() {
  return {
    provider: cleanProvider(process.env.TASK_SYNC_PROVIDER || "none"),
    webhookUrl: process.env.TASK_SYNC_WEBHOOK_URL || "",
    hasWebhookToken: Boolean(process.env.TASK_SYNC_WEBHOOK_TOKEN),
    mcpTool: String(process.env.TASK_SYNC_MCP_TOOL || "zapier")
  };
}

async function syncViaWebhook({ tasks, runId, input }) {
  const config = getTaskIntegrationConfig();
  if (!config.webhookUrl) {
    return {
      provider: "webhook",
      status: "not_configured",
      syncedCount: 0,
      results: [],
      note: "Set TASK_SYNC_WEBHOOK_URL to enable webhook task sync."
    };
  }

  const results = [];
  for (const task of tasks.map(normalizeTask)) {
    const payload = {
      runId,
      syncedAt: nowIso(),
      agencyName: input?.agencyName || "",
      businessName: input?.businessName || "",
      task
    };

    try {
      const response = await fetch(config.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.TASK_SYNC_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${process.env.TASK_SYNC_WEBHOOK_TOKEN}` }
            : {})
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { raw: text };
      }

      results.push({
        taskId: task.id,
        provider: "webhook",
        status: response.ok ? "ok" : "error",
        code: response.status,
        result: parsed
      });
    } catch (error) {
      results.push({
        taskId: task.id,
        provider: "webhook",
        status: "error",
        note: error?.message || "Webhook sync failed"
      });
    }
  }

  const syncedCount = results.filter((item) => item.status === "ok").length;
  return {
    provider: "webhook",
    status: syncedCount ? "ok" : "error",
    syncedCount,
    results
  };
}

async function syncViaMcp({ tasks, runId, input }) {
  const config = getTaskIntegrationConfig();
  const normalizedTasks = tasks.map(normalizeTask);
  const plan = normalizedTasks.map((task) => ({
    tool: config.mcpTool,
    query: [
      "Create/Update project management task using this payload:",
      JSON.stringify({
        runId,
        agencyName: input?.agencyName || "",
        businessName: input?.businessName || "",
        task
      })
    ].join("\n")
  }));

  const mcp = await runMcpPlan({
    plan,
    inputContext: {
      ...input,
      runId,
      syncProvider: "mcp",
      syncTool: config.mcpTool
    }
  });

  if (mcp.status !== "ok") {
    return {
      provider: "mcp",
      status: "error",
      syncedCount: 0,
      results: [],
      note: mcp.note || "MCP task sync failed",
      raw: mcp
    };
  }

  const results = normalizedTasks.map((task, idx) => {
    const record = mcp.results[idx] || {};
    return {
      taskId: task.id,
      provider: "mcp",
      status: record.status || "ok",
      result: record
    };
  });

  const syncedCount = results.filter((item) => item.status === "ok").length;
  return {
    provider: "mcp",
    status: syncedCount ? "ok" : "error",
    syncedCount,
    results,
    raw: mcp
  };
}

export async function syncTasksToIntegration({ tasks = [], runId = null, input = {} }) {
  const config = getTaskIntegrationConfig();
  if (!tasks.length) {
    return {
      provider: config.provider,
      status: "no_tasks",
      syncedCount: 0,
      results: []
    };
  }

  if (config.provider === "webhook") {
    return syncViaWebhook({ tasks, runId, input });
  }
  if (config.provider === "mcp") {
    return syncViaMcp({ tasks, runId, input });
  }

  return {
    provider: "none",
    status: "skipped",
    syncedCount: 0,
    results: [],
    note: "Set TASK_SYNC_PROVIDER=webhook or TASK_SYNC_PROVIDER=mcp to enable sync."
  };
}
