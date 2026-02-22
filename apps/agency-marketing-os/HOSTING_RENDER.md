# Render Hosting Migration (Local -> Standard Host)

This app already stores state in the backend database, not browser `localStorage`.
Use this guide to migrate from your local DB file to a hosted Render deployment.

## 1) Export local data

From repository root:

```bash
cd "/Users/user/Documents/my-marketing-skills 6"
npm run agency-os:db:export -- ./agency-os-backup.json
```

This creates `agency-os-backup.json` with all app tables.

## 2) Deploy to Render

1. Push this repo to GitHub.
2. In Render, create Blueprint from repo root (uses `render.yaml`).
3. Set required secrets in Render:
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - tool keys (SEMrush, Ahrefs, Google, Meta) either as env vars or in UI integrations
4. Set allowed origin:
   - `AGENCY_OS_CORS_ORIGIN=https://your-domain.com`
   - `MCP_PROXY_CORS_ORIGIN=https://your-domain.com`

`render.yaml` already mounts persistent disk at `/var/data` and uses:
- `AGENCY_OS_DB_PATH=/var/data/agency_os.db`

## 3) Import data on host

Open Render shell for the service and run:

```bash
cd /opt/render/project/src
node apps/agency-marketing-os/scripts/db-import.mjs ./agency-os-backup.json
```

If the backup file is not present in the container, upload it to private storage and fetch it first (for example with `curl`), then run import.

## 4) Validate

Run:

```bash
curl -s https://YOUR_RENDER_URL/api/health
```

Confirm:
- `db.seoProjects` > 0 (if you imported projects)
- `db.seoModuleRuns` > 0 (if you imported run history)

## 5) Operational defaults

- Rotate `AGENCY_OS_ENCRYPTION_KEY` and `MCP_PROXY_TOKEN` on schedule.
- Keep backups by running export script periodically.
- Use `/api/seo/integrations/test` after every key rotation.
