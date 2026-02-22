# Production Checklist

## 1) Environment
- Set `OPENAI_API_KEY`
- Set `OPENAI_MODEL` (optional)
- Set `ANTHROPIC_API_KEY`
- Set `ANTHROPIC_MODEL` (optional)
- Set `INTELLIGENCE_PRIMARY_PROVIDER` (`auto`, `openai`, `anthropic`)
- Set `AGENCY_OS_DB_PATH` to persistent disk location
- Set `AGENCY_OS_ENCRYPTION_KEY` to a strong secret for encrypted integration credential storage
- Set `AGENCY_OS_CORS_ORIGIN` to your app domain (avoid `*` in production)
- Set `MCP_PROXY_MODE` (`direct` or `webhook`)
- Set `MCP_PROXY_TOKEN` to a strong random value
- Set `MCP_PROXY_CORS_ORIGIN` to your app domain
- Set task sync config if you want auto task completion (`TASK_SYNC_PROVIDER`, webhook or MCP settings)
- For `direct` mode, set provider credentials (Google/Meta vars in `.env.agency-os.example`)
- For `webhook` mode, set webhook URLs for tools you will use (`TOOL_*_WEBHOOK_URL`)

## 2) Security
- Restrict inbound access to trusted origins/IPs
- Use HTTPS and terminate TLS at load balancer/reverse proxy
- Rotate API keys and tokens
- Keep secrets out of repo; use secret manager
- Store DB on encrypted disk volume and enforce regular backups
- Use export/import scripts for migration and backups:
  - `npm run agency-os:db:export`
  - `npm run agency-os:db:import`
- Enforce tenant-scoped auth before serving multi-client data

## 3) Availability
- Run with process supervision (Docker restart policy, systemd, or orchestrator)
- Configure health checks:
  - `GET /api/health`
  - `GET /health` on MCP proxy
- Monitor error rate and latency for:
  - `/api/intelligence/run`
  - `/api/strategy`
  - `/api/execute`
  - `/api/tasks/sync`
  - MCP `/query`

## 4) Observability
- Persist logs centrally
- Add request IDs in edge proxy
- Track LLM fallback rate (should be low once API key is set)
- Track MCP `status` distribution (`ok`, `not_configured`, `error`)
- Track task sync status (`ok`, `error`, `skipped`)
- Track DB growth and retention policy for strategy/task history

## 5) Launch Validation
- Verify `/demo` renders
- Verify strategy generation with live LLM
- Verify intelligence run stores data and can be replayed via `/api/runs/:id`
- Verify at least one skill execution with live MCP data
- Verify end-to-end run: intake -> intelligence strategy -> task backlog -> sync -> deliver output
