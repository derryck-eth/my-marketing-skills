import { fetchJson, getGoogleServiceAccessToken } from "./googleAuth.mjs";
import { credentialOrEnv, getToolCredentials } from "./credentials.mjs";

export async function runGa4Direct({ query, context, timeoutMs = 15000 }) {
  const credentials = getToolCredentials(context, "ga4");
  const propertyId = credentialOrEnv({
    context,
    toolName: "ga4",
    credentialKeys: ["propertyId", "ga4PropertyId"],
    envKeys: ["GA4_PROPERTY_ID"]
  });
  if (!propertyId) {
    return {
      tool: "ga4",
      status: "not_configured",
      mode: "direct",
      query,
      note: "Set GA4_PROPERTY_ID and Google service account credentials."
    };
  }

  const token = await getGoogleServiceAccessToken("https://www.googleapis.com/auth/analytics.readonly", timeoutMs, {
    serviceAccountJson: credentials?.serviceAccountJson || credentials?.googleServiceAccountJson || null,
    serviceAccountFile: credentials?.serviceAccountFile || credentials?.googleServiceAccountFile || ""
  });
  if (!token.ok) {
    return {
      tool: "ga4",
      status: "error",
      mode: "direct",
      query,
      note: "Unable to get Google access token.",
      auth: token
    };
  }

  const dateRange = context?.horizon && Number(context.horizon) > 0
    ? `${Number(context.horizon)}daysAgo`
    : "30daysAgo";

  const body = {
    dateRanges: [{ startDate: dateRange, endDate: "today" }],
    dimensions: [{ name: "sessionDefaultChannelGroup" }, { name: "date" }],
    metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "conversions" }],
    limit: 120
  };

  const api = await fetchJson(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
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
      tool: "ga4",
      status: "error",
      mode: "direct",
      query,
      note: `GA4 API returned ${api.status}`,
      raw: api.json
    };
  }

  const rows = Array.isArray(api.json?.rows) ? api.json.rows : [];
  const channelTotals = new Map();
  for (const row of rows) {
    const channel = row?.dimensionValues?.[0]?.value || "Unknown";
    const sessions = Number(row?.metricValues?.[0]?.value || 0);
    const conversions = Number(row?.metricValues?.[2]?.value || 0);
    const prev = channelTotals.get(channel) || { sessions: 0, conversions: 0 };
    channelTotals.set(channel, {
      sessions: prev.sessions + sessions,
      conversions: prev.conversions + conversions
    });
  }

  const topChannels = [...channelTotals.entries()]
    .map(([channel, totals]) => ({ channel, ...totals }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 8);

  return {
    tool: "ga4",
    status: "ok",
    mode: "direct",
    query,
    summary: `Fetched ${rows.length} GA4 rows for property ${propertyId}.`,
    result: {
      propertyId,
      topChannels
    }
  };
}
