import { promises as fs } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

const cwd = process.cwd();
const defaultDbPath = resolve(cwd, "apps/agency-marketing-os/data/agency_os.db");
const dbPath = resolve(process.env.AGENCY_OS_DB_PATH || defaultDbPath);
const outputPath = resolve(process.argv[2] || "agency-os-backup.json");

const tables = [
  "strategy_runs",
  "execution_tasks",
  "integration_events",
  "seo_projects",
  "seo_integrations",
  "seo_module_runs"
];

function exportTable(database, tableName) {
  const rows = database.prepare(`SELECT * FROM ${tableName} ORDER BY id ASC`).all();
  return rows;
}

async function main() {
  const database = new DatabaseSync(dbPath, { readOnly: true });
  const payload = {
    exportedAt: new Date().toISOString(),
    dbPath,
    version: 1,
    tables: {}
  };

  for (const tableName of tables) {
    payload.tables[tableName] = exportTable(database, tableName);
  }

  await fs.mkdir(dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`[db-export] wrote ${outputPath}`);
}

main().catch((error) => {
  console.error("[db-export] failed:", error?.message || error);
  process.exitCode = 1;
});
