import { promises as fs } from "node:fs";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

import { getRepoRoot } from "./skills.mjs";

const defaultDbPath = resolve(getRepoRoot(), "apps/agency-marketing-os/data/agency_os.db");
const dbPath = resolve(process.env.AGENCY_OS_DB_PATH || defaultDbPath);

let db = null;
let initialized = false;
const ENCRYPTION_PREFIX = "v1";

function nowIso() {
  return new Date().toISOString();
}

function toJson(value) {
  return JSON.stringify(value ?? null);
}

function parseJson(value, fallback = null) {
  if (!value || typeof value !== "string") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function deriveEncryptionKey() {
  const secret = String(
    process.env.AGENCY_OS_ENCRYPTION_KEY
      || process.env.MCP_PROXY_TOKEN
      || "agency-os-dev-key-change-me"
  );
  return createHash("sha256").update(secret).digest();
}

function encryptSecretObject(value) {
  if (value == null) return "";
  const text = JSON.stringify(value);
  if (!text || text === "{}") return "";

  const key = deriveEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${ENCRYPTION_PREFIX}:${iv.toString("base64")}:${tag.toString("base64")}:${encrypted.toString("base64")}`;
}

function decryptSecretObject(blob, fallback = {}) {
  const raw = String(blob || "").trim();
  if (!raw) return fallback;

  try {
    const [version, ivB64, tagB64, encryptedB64] = raw.split(":");
    if (version !== ENCRYPTION_PREFIX || !ivB64 || !tagB64 || !encryptedB64) return fallback;
    const key = deriveEncryptionKey();
    const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(ivB64, "base64"));
    decipher.setAuthTag(Buffer.from(tagB64, "base64"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedB64, "base64")),
      decipher.final()
    ]).toString("utf8");
    const parsed = JSON.parse(decrypted);
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function getDb() {
  if (!db) {
    db = new DatabaseSync(dbPath);
  }
  return db;
}

function ensureSchema(database) {
  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS strategy_runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      agency_name TEXT NOT NULL,
      business_name TEXT,
      goal TEXT,
      input_json TEXT NOT NULL,
      recommended_skills_json TEXT NOT NULL,
      research_markdown TEXT NOT NULL,
      strategy_markdown TEXT NOT NULL,
      backlog_json TEXT NOT NULL,
      facets_json TEXT NOT NULL,
      used_fallback INTEGER NOT NULL DEFAULT 0,
      research_used_fallback INTEGER NOT NULL DEFAULT 0,
      llm_json TEXT,
      research_llm_json TEXT
    );

    CREATE TABLE IF NOT EXISTS execution_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      strategy_run_id INTEGER,
      skill_id TEXT,
      task_type TEXT,
      title TEXT NOT NULL,
      description TEXT,
      owner_role TEXT,
      priority TEXT,
      status TEXT NOT NULL DEFAULT 'planned',
      due_in_days INTEGER,
      kpi TEXT,
      integration_hint TEXT,
      raw_json TEXT NOT NULL,
      integration_status TEXT NOT NULL DEFAULT 'not_synced',
      integration_result_json TEXT,
      FOREIGN KEY (strategy_run_id) REFERENCES strategy_runs(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS integration_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      provider TEXT NOT NULL,
      action TEXT NOT NULL,
      status TEXT NOT NULL,
      payload_json TEXT,
      result_json TEXT
    );

    CREATE TABLE IF NOT EXISTS seo_projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      name TEXT NOT NULL,
      domain TEXT NOT NULL,
      owner_agency TEXT,
      metadata_json TEXT
    );

    CREATE TABLE IF NOT EXISTS seo_integrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      integration_name TEXT NOT NULL,
      integration_key_hint TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      metadata_json TEXT,
      secret_blob TEXT
    );

    CREATE TABLE IF NOT EXISTS seo_module_runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      project_id INTEGER,
      module_id TEXT NOT NULL,
      target_url TEXT,
      detected_query TEXT,
      input_json TEXT NOT NULL,
      result_json TEXT,
      workflow_json TEXT,
      sources_json TEXT,
      confidence REAL,
      used_fallback INTEGER NOT NULL DEFAULT 0,
      mcp_status TEXT,
      error_text TEXT,
      FOREIGN KEY (project_id) REFERENCES seo_projects(id) ON DELETE SET NULL
    );
  `);
}

function ensureColumn(database, tableName, columnName, columnSql) {
  const rows = database.prepare(`PRAGMA table_info(${tableName})`).all();
  const exists = rows.some((row) => String(row?.name || "").toLowerCase() === columnName.toLowerCase());
  if (exists) return;
  database.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnSql}`);
}

export async function initDb() {
  if (initialized) return;
  await fs.mkdir(dirname(dbPath), { recursive: true });
  const database = getDb();
  ensureSchema(database);
  ensureColumn(database, "seo_integrations", "secret_blob", "secret_blob TEXT");
  initialized = true;
}

export function getDbConfig() {
  return {
    path: dbPath,
    initialized
  };
}

export async function saveStrategyRun({
  input,
  recommendedSkills,
  research,
  strategy,
  backlog = [],
  facets = [],
  usedFallback = false,
  researchUsedFallback = false,
  llm = null,
  researchLlm = null
}) {
  await initDb();
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO strategy_runs (
      created_at, agency_name, business_name, goal, input_json, recommended_skills_json,
      research_markdown, strategy_markdown, backlog_json, facets_json,
      used_fallback, research_used_fallback, llm_json, research_llm_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    nowIso(),
    String(input?.agencyName || "Agency"),
    String(input?.businessName || ""),
    String(input?.goal || "full-funnel"),
    toJson(input),
    toJson(recommendedSkills || []),
    String(research || ""),
    String(strategy || ""),
    toJson(backlog || []),
    toJson(facets || []),
    usedFallback ? 1 : 0,
    researchUsedFallback ? 1 : 0,
    toJson(llm),
    toJson(researchLlm)
  );

  return Number(result.lastInsertRowid);
}

export async function saveExecutionTasks({ strategyRunId = null, tasks = [] }) {
  await initDb();
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO execution_tasks (
      created_at, strategy_run_id, skill_id, task_type, title, description, owner_role,
      priority, status, due_in_days, kpi, integration_hint, raw_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const ids = [];
  for (const task of tasks) {
    const result = stmt.run(
      nowIso(),
      strategyRunId ? Number(strategyRunId) : null,
      String(task?.skillId || ""),
      String(task?.taskType || "implementation"),
      String(task?.title || "Execution task"),
      String(task?.description || ""),
      String(task?.ownerRole || "growth-operator"),
      String(task?.priority || "medium"),
      String(task?.status || "planned"),
      Number.isFinite(Number(task?.dueInDays)) ? Number(task.dueInDays) : null,
      String(task?.kpi || ""),
      String(task?.integrationHint || ""),
      toJson(task)
    );
    ids.push(Number(result.lastInsertRowid));
  }

  return ids;
}

function hydrateRunRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    createdAt: row.created_at,
    agencyName: row.agency_name,
    businessName: row.business_name,
    goal: row.goal,
    input: parseJson(row.input_json, {}),
    recommendedSkills: parseJson(row.recommended_skills_json, []),
    research: row.research_markdown,
    strategy: row.strategy_markdown,
    backlog: parseJson(row.backlog_json, []),
    facets: parseJson(row.facets_json, []),
    usedFallback: Boolean(row.used_fallback),
    researchUsedFallback: Boolean(row.research_used_fallback),
    llm: parseJson(row.llm_json, null),
    researchLlm: parseJson(row.research_llm_json, null)
  };
}

function hydrateTaskRow(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    strategyRunId: row.strategy_run_id,
    skillId: row.skill_id,
    taskType: row.task_type,
    title: row.title,
    description: row.description,
    ownerRole: row.owner_role,
    priority: row.priority,
    status: row.status,
    dueInDays: row.due_in_days,
    kpi: row.kpi,
    integrationHint: row.integration_hint,
    integrationStatus: row.integration_status,
    integrationResult: parseJson(row.integration_result_json, null),
    raw: parseJson(row.raw_json, null)
  };
}

function hydrateSeoProjectRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    name: row.name,
    domain: row.domain,
    ownerAgency: row.owner_agency || "",
    metadata: parseJson(row.metadata_json, {})
  };
}

function hydrateSeoIntegrationRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    integrationName: row.integration_name,
    integrationKeyHint: row.integration_key_hint || "",
    isActive: Boolean(row.is_active),
    metadata: parseJson(row.metadata_json, {}),
    hasSecret: Boolean(String(row.secret_blob || "").trim())
  };
}

function hydrateSeoModuleRunRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    createdAt: row.created_at,
    projectId: row.project_id,
    moduleId: row.module_id,
    targetUrl: row.target_url || "",
    detectedQuery: row.detected_query || "",
    input: parseJson(row.input_json, {}),
    result: parseJson(row.result_json, null),
    workflow: parseJson(row.workflow_json, []),
    sourcesUsed: parseJson(row.sources_json, []),
    confidence: row.confidence == null ? null : Number(row.confidence),
    usedFallback: Boolean(row.used_fallback),
    mcpStatus: row.mcp_status || "",
    error: row.error_text || ""
  };
}

export async function listStrategyRuns(limit = 20) {
  await initDb();
  const database = getDb();
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
  const stmt = database.prepare(`
    SELECT id, created_at, agency_name, business_name, goal, used_fallback, research_used_fallback
    FROM strategy_runs
    ORDER BY id DESC
    LIMIT ?
  `);
  const rows = stmt.all(safeLimit);
  return rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    agencyName: row.agency_name,
    businessName: row.business_name,
    goal: row.goal,
    usedFallback: Boolean(row.used_fallback),
    researchUsedFallback: Boolean(row.research_used_fallback)
  }));
}

export async function getStrategyRun(runId) {
  await initDb();
  const database = getDb();
  const runStmt = database.prepare("SELECT * FROM strategy_runs WHERE id = ?");
  const taskStmt = database.prepare("SELECT * FROM execution_tasks WHERE strategy_run_id = ? ORDER BY id ASC");

  const row = runStmt.get(Number(runId));
  if (!row) return null;

  const tasks = taskStmt.all(Number(runId)).map(hydrateTaskRow);
  return {
    ...hydrateRunRow(row),
    tasks
  };
}

export async function listTasks({ limit = 100, status = "", strategyRunId = null } = {}) {
  await initDb();
  const database = getDb();
  const safeLimit = Math.min(200, Math.max(1, Number(limit) || 100));

  const filters = [];
  const values = [];
  if (status) {
    filters.push("status = ?");
    values.push(String(status));
  }
  if (strategyRunId != null && strategyRunId !== "") {
    filters.push("strategy_run_id = ?");
    values.push(Number(strategyRunId));
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const query = `SELECT * FROM execution_tasks ${whereClause} ORDER BY id DESC LIMIT ?`;
  values.push(safeLimit);
  const stmt = database.prepare(query);
  return stmt.all(...values).map(hydrateTaskRow);
}

export async function updateTaskStatus(taskId, status) {
  await initDb();
  const database = getDb();
  const stmt = database.prepare("UPDATE execution_tasks SET status = ? WHERE id = ?");
  stmt.run(String(status || "planned"), Number(taskId));
}

export async function updateTaskIntegrationResult(taskId, integrationStatus, result) {
  await initDb();
  const database = getDb();
  const stmt = database.prepare(`
    UPDATE execution_tasks
    SET integration_status = ?, integration_result_json = ?
    WHERE id = ?
  `);
  stmt.run(String(integrationStatus || "not_synced"), toJson(result), Number(taskId));
}

export async function logIntegrationEvent({ provider, action, status, payload, result }) {
  await initDb();
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO integration_events (created_at, provider, action, status, payload_json, result_json)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    nowIso(),
    String(provider || "unknown"),
    String(action || "sync"),
    String(status || "unknown"),
    toJson(payload),
    toJson(result)
  );
}

export async function getDbHealth() {
  await initDb();
  const database = getDb();
  const runCount = database.prepare("SELECT COUNT(*) AS count FROM strategy_runs").get()?.count || 0;
  const taskCount = database.prepare("SELECT COUNT(*) AS count FROM execution_tasks").get()?.count || 0;
  const eventCount = database.prepare("SELECT COUNT(*) AS count FROM integration_events").get()?.count || 0;
  const seoProjectCount = database.prepare("SELECT COUNT(*) AS count FROM seo_projects").get()?.count || 0;
  const seoIntegrationCount = database.prepare("SELECT COUNT(*) AS count FROM seo_integrations").get()?.count || 0;
  const seoRunCount = database.prepare("SELECT COUNT(*) AS count FROM seo_module_runs").get()?.count || 0;

  return {
    path: dbPath,
    strategyRuns: Number(runCount),
    tasks: Number(taskCount),
    integrationEvents: Number(eventCount),
    seoProjects: Number(seoProjectCount),
    seoIntegrations: Number(seoIntegrationCount),
    seoModuleRuns: Number(seoRunCount)
  };
}

export async function listSeoProjects(limit = 100) {
  await initDb();
  const database = getDb();
  const safeLimit = Math.min(200, Math.max(1, Number(limit) || 100));
  const rows = database.prepare(`
    SELECT *
    FROM seo_projects
    ORDER BY id DESC
    LIMIT ?
  `).all(safeLimit);
  return rows.map(hydrateSeoProjectRow);
}

export async function createSeoProject({ name, domain, ownerAgency = "", metadata = {} }) {
  await initDb();
  const database = getDb();
  const now = nowIso();
  const stmt = database.prepare(`
    INSERT INTO seo_projects (created_at, updated_at, name, domain, owner_agency, metadata_json)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    now,
    now,
    String(name || "SEO Project"),
    String(domain || ""),
    String(ownerAgency || ""),
    toJson(metadata || {})
  );

  const row = database.prepare("SELECT * FROM seo_projects WHERE id = ?").get(Number(result.lastInsertRowid));
  return hydrateSeoProjectRow(row);
}

export async function deleteSeoProject(projectId) {
  await initDb();
  const database = getDb();
  database.prepare("DELETE FROM seo_projects WHERE id = ?").run(Number(projectId));
}

export async function listSeoIntegrations(limit = 100) {
  await initDb();
  const database = getDb();
  const safeLimit = Math.min(200, Math.max(1, Number(limit) || 100));
  const rows = database.prepare(`
    SELECT *
    FROM seo_integrations
    ORDER BY id DESC
    LIMIT ?
  `).all(safeLimit);
  return rows.map(hydrateSeoIntegrationRow);
}

export async function upsertSeoIntegration({
  integrationName,
  integrationKeyHint = "",
  isActive = true,
  metadata = {},
  secret = null
}) {
  await initDb();
  const database = getDb();
  const normalized = String(integrationName || "").trim().toLowerCase();
  if (!normalized) {
    throw new Error("integrationName is required");
  }

  const existing = database.prepare(`
    SELECT *
    FROM seo_integrations
    WHERE LOWER(integration_name) = ?
    LIMIT 1
  `).get(normalized);

  const now = nowIso();
  if (existing) {
    const nextSecretBlob = secret && typeof secret === "object" && Object.keys(secret).length
      ? encryptSecretObject(secret)
      : String(existing.secret_blob || "");
    database.prepare(`
      UPDATE seo_integrations
      SET updated_at = ?, integration_key_hint = ?, is_active = ?, metadata_json = ?, secret_blob = ?
      WHERE id = ?
    `).run(
      now,
      String(integrationKeyHint || existing.integration_key_hint || ""),
      isActive ? 1 : 0,
      toJson(metadata || parseJson(existing.metadata_json, {})),
      nextSecretBlob,
      Number(existing.id)
    );
    const updated = database.prepare("SELECT * FROM seo_integrations WHERE id = ?").get(Number(existing.id));
    return hydrateSeoIntegrationRow(updated);
  }

  const insert = database.prepare(`
    INSERT INTO seo_integrations (created_at, updated_at, integration_name, integration_key_hint, is_active, metadata_json, secret_blob)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = insert.run(
    now,
    now,
    normalized,
    String(integrationKeyHint || ""),
    isActive ? 1 : 0,
    toJson(metadata || {}),
    secret && typeof secret === "object" && Object.keys(secret).length ? encryptSecretObject(secret) : ""
  );
  const row = database.prepare("SELECT * FROM seo_integrations WHERE id = ?").get(Number(result.lastInsertRowid));
  return hydrateSeoIntegrationRow(row);
}

export async function deleteSeoIntegration(id) {
  await initDb();
  const database = getDb();
  database.prepare("DELETE FROM seo_integrations WHERE id = ?").run(Number(id));
}

export async function getSeoIntegrationCredentialsMap({ activeOnly = true, names = [] } = {}) {
  await initDb();
  const database = getDb();
  const normalizedNames = Array.isArray(names)
    ? names.map((name) => String(name || "").trim().toLowerCase()).filter(Boolean)
    : [];

  const filters = [];
  const values = [];
  if (activeOnly) {
    filters.push("is_active = 1");
  }
  if (normalizedNames.length) {
    filters.push(`LOWER(integration_name) IN (${normalizedNames.map(() => "?").join(",")})`);
    values.push(...normalizedNames);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const rows = database.prepare(`
    SELECT integration_name, secret_blob
    FROM seo_integrations
    ${whereClause}
  `).all(...values);

  const output = {};
  for (const row of rows) {
    const name = String(row.integration_name || "").trim().toLowerCase();
    if (!name) continue;
    output[name] = decryptSecretObject(row.secret_blob, {});
  }
  return output;
}

export async function saveSeoModuleRun({
  projectId = null,
  moduleId,
  targetUrl = "",
  detectedQuery = "",
  input = {},
  result = null,
  workflow = [],
  sourcesUsed = [],
  confidence = null,
  usedFallback = false,
  mcpStatus = "",
  error = ""
}) {
  await initDb();
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO seo_module_runs (
      created_at, project_id, module_id, target_url, detected_query,
      input_json, result_json, workflow_json, sources_json, confidence,
      used_fallback, mcp_status, error_text
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const row = stmt.run(
    nowIso(),
    projectId == null ? null : Number(projectId),
    String(moduleId || ""),
    String(targetUrl || ""),
    String(detectedQuery || ""),
    toJson(input || {}),
    toJson(result),
    toJson(workflow || []),
    toJson(sourcesUsed || []),
    confidence == null ? null : Number(confidence),
    usedFallback ? 1 : 0,
    String(mcpStatus || ""),
    String(error || "")
  );

  return Number(row.lastInsertRowid);
}

export async function listSeoModuleRuns({ projectId = null, moduleId = "", limit = 50 } = {}) {
  await initDb();
  const database = getDb();
  const safeLimit = Math.min(200, Math.max(1, Number(limit) || 50));
  const filters = [];
  const values = [];

  if (projectId != null && projectId !== "") {
    filters.push("project_id = ?");
    values.push(Number(projectId));
  }
  if (moduleId) {
    filters.push("module_id = ?");
    values.push(String(moduleId));
  }
  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const sql = `
    SELECT *
    FROM seo_module_runs
    ${whereClause}
    ORDER BY id DESC
    LIMIT ?
  `;
  values.push(safeLimit);
  const rows = database.prepare(sql).all(...values);
  return rows.map(hydrateSeoModuleRunRow);
}
