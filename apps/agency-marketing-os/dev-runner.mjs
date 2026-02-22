import { spawn } from "node:child_process";

function spawnProcess(name, cmd, args, extraEnv = {}) {
  const child = spawn(cmd, args, {
    stdio: "inherit",
    env: { ...process.env, ...extraEnv }
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`[${name}] exited via signal ${signal}`);
      return;
    }
    console.log(`[${name}] exited with code ${code}`);
  });

  return child;
}

const app = spawnProcess("agency-os", "node", ["apps/agency-marketing-os/server.mjs"]);
const proxy = spawnProcess("mcp-proxy", "node", ["apps/agency-marketing-os/mcp-proxy/server.mjs"]);

let shuttingDown = false;
function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\n[dev-runner] shutting down (${signal})...`);
  if (!app.killed) app.kill("SIGTERM");
  if (!proxy.killed) proxy.kill("SIGTERM");
  setTimeout(() => process.exit(0), 300);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

