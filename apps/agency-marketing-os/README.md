# Agency Marketing OS (Execution Layer)

This app turns the skills repository into a runnable orchestration service.

## What It Adds
- Reads local `skills/*/SKILL.md` files
- Runs dual-model intelligence (OpenAI + Anthropic failover)
- Recommends an optimal skill mix for a goal
- Generates research + strategy + execution backlog (`/api/intelligence/run`)
- Executes skill-specific tasks (`/api/execute`)
- Runs SEO toolkit modules (`/api/seo/*`) for scan, bulk, compare, schema, AI visibility, market research, GSC profile audit, snippet lab, content analysis, full audit, and report
- Persists runs/tasks in SQLite for replay and operations
- Syncs tasks to external integrations via webhook or MCP tools
- Optionally runs MCP tool queries through a proxy bridge

## Run

Prepare environment:

```bash
cp .env.agency-os.example .env
```

From repository root (API only):

```bash
set -a && source .env && set +a
npm run agency-os
```

Open:

- `http://127.0.0.1:8787/demo`
- `http://127.0.0.1:8787/legacy-demo` (previous demo UI)
- If ports are busy, `./start-agency-os.sh` auto-selects free ports and prints the exact URL.

Run API + MCP proxy together (recommended for testing):

```bash
set -a && source .env && set +a
npm run agency-os:dev
```

## LLM Setup (Optional but Recommended)

Set:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` (default: `gpt-5.3`)
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL` (default: `claude-opus-4.6`)
- `INTELLIGENCE_PRIMARY_PROVIDER` (`auto`, `openai`, `anthropic`)

Without these env vars, the app falls back to deterministic templates.

## Database

Set:

- `AGENCY_OS_DB_PATH` (default: `apps/agency-marketing-os/data/agency_os.db`)

The API persists:
- strategy/intelligence runs
- execution backlog tasks
- integration sync events

## MCP Proxy Setup (Optional)

Set:

- `MCP_PROXY_URL` (example: `http://127.0.0.1:4000`)
- `MCP_PROXY_TOKEN` (optional bearer token)

Expected proxy endpoint:

- `POST /query`
- Request body:
  - `plan`: array of `{ tool, query }`
  - `context`: strategy context object

The server uses proxy results in `/api/execute` outputs.

## MCP Proxy Modes

### 1) Mock mode (fastest way to test end-to-end)
- Start proxy with `MCP_PROXY_MODE=mock`
- Returns realistic synthetic tool responses for every query

### 2) Direct mode (no middleware required)
- Set `MCP_PROXY_MODE=direct`
- Built-in adapters:
  - `ga4`
  - `google-search-console`
  - `google-ads`
  - `meta-ads`
  - `semrush`
  - `ahrefs`
- Required env vars are in `.env.agency-os.example`

### 3) Webhook mode (production path)
- Set `MCP_PROXY_MODE=webhook`
- Configure `TOOL_*_WEBHOOK_URL` env vars for tools you use
- Proxy forwards tool queries to your integrations

## Docker (Ready-to-Ship Starter)

```bash
docker compose -f docker-compose.agency-os.yml --env-file .env.agency-os.example up --build
```

Then open:

- `http://127.0.0.1:8787/demo`

## Standard Host Deployment (Render)

- Use `render.yaml` in repo root for one-click blueprint deploy.
- Guide: `apps/agency-marketing-os/HOSTING_RENDER.md`
- Data migration scripts:
  - `npm run agency-os:db:export -- ./agency-os-backup.json`
  - `npm run agency-os:db:import -- ./agency-os-backup.json`

## API Endpoints

- `GET /api/health`
- `GET /api/skills`
- `GET /api/runs`
- `GET /api/runs/:id`
- `GET /api/tasks`
- `POST /api/tasks/:id/status`
- `POST /api/tasks/sync`
- `GET /api/seo/modules`
- `POST /api/strategy`
- `POST /api/intelligence/run`
- `POST /api/execute`
- `POST /api/seo/scan`
- `POST /api/seo/bulk`
- `POST /api/seo/compare`
- `POST /api/seo/schema`
- `POST /api/seo/ai-visibility`
- `POST /api/seo/market-research`
- `POST /api/seo/gsc-profile-audit`
- `POST /api/seo/snippet-lab`
- `POST /api/seo/content-analysis`
- `POST /api/seo/full-audit`
- `POST /api/seo/report`
- `GET /api/seo/projects`
- `POST /api/seo/projects`
- `DELETE /api/seo/projects/:id`
- `GET /api/seo/integrations`
- `POST /api/seo/integrations`
- `DELETE /api/seo/integrations/:id`
- `POST /api/seo/integrations/test`
- `GET /api/seo/history`

MCP proxy endpoints:

- `GET /health`
- `GET /tools`
- `POST /query`

## Direct Adapter Credentials

Google service account (GA4 + GSC):
- `GOOGLE_SERVICE_ACCOUNT_JSON` or `GOOGLE_SERVICE_ACCOUNT_FILE`
- `GA4_PROPERTY_ID`
- `GSC_SITE_URL`

Google Ads:
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `GOOGLE_ADS_CUSTOMER_ID`
- `GOOGLE_ADS_CLIENT_ID`
- `GOOGLE_ADS_CLIENT_SECRET`
- `GOOGLE_ADS_REFRESH_TOKEN`
- Optional: `GOOGLE_ADS_LOGIN_CUSTOMER_ID`, `GOOGLE_ADS_API_VERSION`

Meta Ads:
- `META_AD_ACCOUNT_ID`
- `META_ACCESS_TOKEN`
- Optional: `META_GRAPH_VERSION`

SEMrush:
- `SEMRUSH_API_KEY`
- Optional: `SEMRUSH_DATABASE`, `SEMRUSH_API_BASE_URL`

Ahrefs:
- `AHREFS_API_KEY`
- Optional: `AHREFS_API_BASE_URL`

### Quick Direct-Mode Test

```bash
cp .env.agency-os.example .env
set -a && source .env && set +a
export MCP_PROXY_MODE=direct
npm run agency-os:dev
```

In another terminal:

```bash
curl -s http://127.0.0.1:4000/health
curl -s -X POST http://127.0.0.1:4000/query -H 'Content-Type: application/json' -d '{"plan":[{"tool":"ga4","query":"test"}],"context":{"goal":"lead-gen"}}'
curl -s -X POST http://127.0.0.1:4000/query -H 'Content-Type: application/json' -d '{"plan":[{"tool":"semrush","query":"test"}],"context":{"website":"https://example.com"}}'
```

## Task Integration Sync

### Webhook mode

```bash
export TASK_SYNC_PROVIDER=webhook
export TASK_SYNC_WEBHOOK_URL="https://your-task-endpoint.example.com/intake"
export TASK_SYNC_WEBHOOK_TOKEN="replace-me"
```

### MCP mode (e.g., Zapier MCP)

```bash
export TASK_SYNC_PROVIDER=mcp
export TASK_SYNC_MCP_TOOL=zapier
```

Then sync tasks created by an intelligence run:

```bash
curl -s -X POST http://127.0.0.1:8787/api/tasks/sync \
  -H 'Content-Type: application/json' \
  -d '{"runId":1}'
```

## SEO Toolkit API Quick Test

```bash
curl -s http://127.0.0.1:8787/api/seo/modules

curl -s -X POST http://127.0.0.1:8787/api/seo/scan \
  -H 'Content-Type: application/json' \
  -d '{
    "agencyName":"Northline Growth Partners",
    "businessName":"Northline Commercial Roofing",
    "website":"https://example.com",
    "goal":"organic",
    "url":"https://example.com/services",
    "targetKeyword":"commercial roofing services"
  }'

curl -s -X POST http://127.0.0.1:8787/api/seo/content-analysis \
  -H 'Content-Type: application/json' \
  -d '{
    "agencyName":"Northline Growth Partners",
    "businessName":"Northline Commercial Roofing",
    "website":"https://example.com",
    "url":"https://example.com/services",
    "primaryQuery":"commercial roofing services",
    "competitorUrls":["https://example.org/services","https://example.net/services"]
  }'
```

## Production

See:

- `apps/agency-marketing-os/PRODUCTION.md`
