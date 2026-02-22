import { fetchJson, getGoogleServiceAccessToken } from "./googleAuth.mjs";
import { credentialOrEnv, getToolCredentials } from "./credentials.mjs";

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

export async function runGscDirect({ query, context, timeoutMs = 15000 }) {
  const credentials = getToolCredentials(context, "google-search-console");
  const siteUrl = credentialOrEnv({
    context,
    toolName: "google-search-console",
    credentialKeys: ["siteUrl", "gscSiteUrl", "propertyUrl"],
    envKeys: ["GSC_SITE_URL"]
  });
  if (!siteUrl) {
    return {
      tool: "google-search-console",
      status: "not_configured",
      mode: "direct",
      query,
      note: "Set GSC_SITE_URL and Google service account credentials."
    };
  }

  const token = await getGoogleServiceAccessToken("https://www.googleapis.com/auth/webmasters.readonly", timeoutMs, {
    serviceAccountJson: credentials?.serviceAccountJson || credentials?.googleServiceAccountJson || null,
    serviceAccountFile: credentials?.serviceAccountFile || credentials?.googleServiceAccountFile || ""
  });
  if (!token.ok) {
    return {
      tool: "google-search-console",
      status: "error",
      mode: "direct",
      query,
      note: "Unable to get Google access token.",
      auth: token
    };
  }

  const horizon = Number(context?.horizon || 30);
  const end = new Date();
  end.setDate(end.getDate() - 1);
  const start = new Date(end);
  start.setDate(start.getDate() - Math.max(7, horizon));

  const body = {
    startDate: formatDate(start),
    endDate: formatDate(end),
    dimensions: ["query", "page"],
    rowLimit: 50
  };

  const api = await fetchJson(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`
      },
      body: JSON.stringify(body)
    },
    timeoutMs
  );

  if (!api.ok) {
    return {
      tool: "google-search-console",
      status: "error",
      mode: "direct",
      query,
      note: `GSC API returned ${api.status}`,
      raw: api.json
    };
  }

  const rows = Array.isArray(api.json?.rows) ? api.json.rows : [];
  const topQueries = rows.slice(0, 10).map((row) => ({
    query: row?.keys?.[0] || "",
    page: row?.keys?.[1] || "",
    clicks: Number(row?.clicks || 0),
    impressions: Number(row?.impressions || 0),
    ctr: Number(row?.ctr || 0),
    position: Number(row?.position || 0)
  }));

  return {
    tool: "google-search-console",
    status: "ok",
    mode: "direct",
    query,
    summary: `Fetched ${rows.length} Search Console rows for ${siteUrl}.`,
    result: {
      siteUrl,
      startDate: body.startDate,
      endDate: body.endDate,
      topQueries
    }
  };
}
