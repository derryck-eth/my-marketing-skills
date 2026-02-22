import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { initDb } from "../lib/db.mjs";

const cwd = process.cwd();
const defaultDbPath = resolve(cwd, "apps/agency-marketing-os/data/agency_os.db");
const dbPath = resolve(process.env.AGENCY_OS_DB_PATH || defaultDbPath);
const inputPath = resolve(process.argv[2] || "agency-os-backup.json");

const tableOrder = [
  "strategy_runs",
  "execution_tasks",
  "integration_events",
  "seo_projects",
  "seo_integrations",
  "seo_module_runs"
];

function quoteIdentifier(name) {
  return `"${String(name).replace(/"/g, "\"\"")}"`;
}

function insertRows(database, tableName, rows) {
  if (!rows.length) return;
  const columns = Object.keys(rows[0]);
  if (!columns.length) return;

  const sql = `
    INSERT INTO ${tableName} (${columns.map(quoteIdentifier).join(", ")})
    VALUES (${columns.map(() => "?").join(", ")})
  `;
  const stmt = database.prepare(sql);

  for (const row of rows) {
    const values = columns.map((column) => row[column] ?? null);
    stmt.run(...values);
  }
}

function resetSequence(database, tableName) {
  const row = database.prepare(`SELECT MAX(id) AS max_id FROM ${tableName}`).get();
  const maxId = Number(row?.max_id || 0);
  database.prepare("DELETE FROM sqlite_sequence WHERE name = ?").run(tableName);
  if (maxId > 0) {
    database.prepare("INSERT INTO sqlite_sequence(name, seq) VALUES(?, ?)").run(tableName, maxId);
  }
}

async function main() {
  await initDb();
  const raw = await fs.readFile(inputPath, "utf8");
  const payload = JSON.parse(raw);
  const tablesPayload = payload?.tables && typeof payload.tables === "object" ? payload.tables : {};

  const database = new DatabaseSync(dbPath);
  database.exec("PRAGMA foreign_keys = OFF");
  database.exec("BEGIN IMMEDIATE TRANSACTION");

  try {
    for (const tableName of tableOrder) {
      database.prepare(`DELETE FROM ${tableName}`).run();
    }

    for (const tableName of tableOrder) {
      const rows = Array.isArray(tablesPayload[tableName]) ? tablesPayload[tableName] : [];
      insertRows(database, tableName, rows);
      resetSequence(database, tableName);
    }

    database.exec("COMMIT");
    database.exec("PRAGMA foreign_keys = ON");
    console.log(`[db-import] imported ${inputPath} -> ${dbPath}`);
  } catch (error) {
    database.exec("ROLLBACK");
    database.exec("PRAGMA foreign_keys = ON");
    throw error;
  }
}

main().catch((error) => {
  console.error("[db-import] failed:", error?.message || error);
  process.exitCode = 1;
});
