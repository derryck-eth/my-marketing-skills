# Agency OS Quickstart

## 0) Make Sure You Are In The Right Folder

```bash
cd "/Users/user/Documents/my-marketing-skills 6"
pwd
ls start-agency-os.sh package.json skills/agency-command-center/demo.html
```

If those files appear, you are in the correct project.

## 1) Run The Product (Fastest Way)

```bash
./start-agency-os.sh
```

Open the exact URL printed by the script (usually `http://127.0.0.1:8787/demo`).

This uses `MCP_PROXY_MODE=mock` by default, so you can test the full product flow without any API keys.
In the UI, fill business details and click **Generate Strategy** to run:
1) market + competitor research
2) strategy generation based on that research
3) execution backlog generation + DB persistence

## 2) Run Automated API Smoke Test

Keep the app running in terminal #1, then in terminal #2:

```bash
cd "/Users/user/Documents/my-marketing-skills 6"
npm run agency-os:smoke
```

Expected result:

- `[smoke] PASS`

## 3) Test SEO Toolkit Modules From API

With app still running:

```bash
curl -s http://127.0.0.1:8787/api/seo/modules
curl -s -X POST http://127.0.0.1:8787/api/seo/scan \
  -H "Content-Type: application/json" \
  -d '{
    "agencyName":"Northline Growth Partners",
    "businessName":"Northline Commercial Roofing",
    "website":"https://example.com",
    "goal":"organic",
    "url":"https://example.com/services",
    "targetKeyword":"commercial roofing services"
  }'

curl -s -X POST http://127.0.0.1:8787/api/seo/full-audit \
  -H "Content-Type: application/json" \
  -d '{
    "agencyName":"Northline Growth Partners",
    "businessName":"Northline Commercial Roofing",
    "website":"https://example.com",
    "market":"B2B commercial services",
    "goal":"organic",
    "primaryUrl":"https://example.com/services",
    "competitorUrls":["https://competitor-a.example.com","https://competitor-b.example.com"],
    "targetKeyword":"commercial roofing services"
  }'
```

## 4) Run Full Intelligence API + Task Board Check

```bash
curl -s -X POST http://127.0.0.1:8787/api/intelligence/run \
  -H "Content-Type: application/json" \
  -d '{
    "agencyName":"Northline Growth Partners",
    "businessName":"Northline Commercial Roofing",
    "website":"https://example.com",
    "market":"B2B commercial services",
    "goal":"full-funnel",
    "budget":25000,
    "capacity":180,
    "channels":["seo","cro","paid","email","content","strategy"]
  }'

curl -s http://127.0.0.1:8787/api/runs?limit=5
curl -s http://127.0.0.1:8787/api/tasks?limit=20
```

## 5) Enable Real LLM Output

Edit `.env`:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.3
ANTHROPIC_API_KEY=your_anthropic_key_here
ANTHROPIC_MODEL=claude-opus-4.6
INTELLIGENCE_PRIMARY_PROVIDER=auto
```

Restart `./start-agency-os.sh`.

## 6) Enable Real Integrations (No Webhooks Required)

Edit `.env`:

```bash
MCP_PROXY_MODE=direct
```

Add credentials for tools you want:

- GA4: `GA4_PROPERTY_ID` + Google service account
- GSC: `GSC_SITE_URL` + Google service account
- Google Ads: `GOOGLE_ADS_*`
- Meta Ads: `META_*`

All variables are listed in `.env.agency-os.example`.

## 7) Where To Get API Credentials

- OpenAI: <https://platform.openai.com/api-keys>
- Anthropic: <https://console.anthropic.com/settings/keys>
- Google Cloud (service account + Ads OAuth): <https://console.cloud.google.com>
- Meta Ads API: <https://developers.facebook.com>

## 8) Task Sync Integrations (For Task Completion)

Choose one:

```bash
# Option A: push tasks to your own endpoint
TASK_SYNC_PROVIDER=webhook
TASK_SYNC_WEBHOOK_URL=https://your-endpoint.example.com/tasks
TASK_SYNC_WEBHOOK_TOKEN=replace-me

# Option B: send tasks through MCP (e.g., Zapier MCP)
TASK_SYNC_PROVIDER=mcp
TASK_SYNC_MCP_TOOL=zapier
```

Then sync any run's tasks:

```bash
curl -s -X POST http://127.0.0.1:8787/api/tasks/sync \
  -H "Content-Type: application/json" \
  -d '{"runId":1}'
```

## 9) Hosting For Agencies / B2B (Simple + Safe)

### Minimum production setup
1. Run with Docker Compose
2. Put behind HTTPS reverse proxy
3. Keep API keys only in server environment variables
4. Require authentication for app users
5. Enable request logging and access logs

### Command

```bash
docker compose -f docker-compose.agency-os.yml --env-file .env up --build -d
```

## 10) Security Checklist

1. Never store API keys in frontend code.
2. Use `.env`/secret manager only.
3. Set `MCP_PROXY_TOKEN` and enforce bearer auth between app and proxy.
4. Restrict network access to app/proxy (private network/VPC preferred).
5. Use HTTPS only.
6. Rotate API keys regularly.
7. Add tenant isolation before multi-agency scale.

## 11) If It Still Fails

Run and send output:

```bash
cd "/Users/user/Documents/my-marketing-skills 6"
npm run agency-os:dev
```

and in another terminal:

```bash
curl -s http://127.0.0.1:8787/api/health
curl -s http://127.0.0.1:4000/health
```
