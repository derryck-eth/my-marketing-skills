import { fetchJson, getGoogleRefreshTokenAccessToken } from "./googleAuth.mjs";
import { credentialOrEnv, getToolCredentials } from "./credentials.mjs";

function parseSearchStreamRows(payload) {
  const chunks = Array.isArray(payload) ? payload : [payload];
  const rows = [];
  for (const chunk of chunks) {
    const results = Array.isArray(chunk?.results) ? chunk.results : [];
    rows.push(...results);
  }
  return rows;
}

export async function runGoogleAdsDirect({ query, context, timeoutMs = 15000 }) {
  const credentials = getToolCredentials(context, "google-ads");
  const customerId = credentialOrEnv({
    context,
    toolName: "google-ads",
    credentialKeys: ["customerId", "googleAdsCustomerId"],
    envKeys: ["GOOGLE_ADS_CUSTOMER_ID"]
  }).replace(/-/g, "");
  const developerToken = credentialOrEnv({
    context,
    toolName: "google-ads",
    credentialKeys: ["developerToken", "googleAdsDeveloperToken"],
    envKeys: ["GOOGLE_ADS_DEVELOPER_TOKEN"]
  });
  const loginCustomerId = credentialOrEnv({
    context,
    toolName: "google-ads",
    credentialKeys: ["loginCustomerId", "googleAdsLoginCustomerId"],
    envKeys: ["GOOGLE_ADS_LOGIN_CUSTOMER_ID"]
  }).replace(/-/g, "");
  const apiVersion = credentialOrEnv({
    context,
    toolName: "google-ads",
    credentialKeys: ["apiVersion", "googleAdsApiVersion"],
    envKeys: ["GOOGLE_ADS_API_VERSION"]
  }) || "v18";

  if (!customerId || !developerToken) {
    return {
      tool: "google-ads",
      status: "not_configured",
      mode: "direct",
      query,
      note: "Set GOOGLE_ADS_CUSTOMER_ID and GOOGLE_ADS_DEVELOPER_TOKEN (plus OAuth refresh credentials)."
    };
  }

  const token = await getGoogleRefreshTokenAccessToken(timeoutMs, {
    refreshToken: credentials?.refreshToken || credentials?.googleAdsRefreshToken || "",
    clientId: credentials?.clientId || credentials?.googleAdsClientId || "",
    clientSecret: credentials?.clientSecret || credentials?.googleAdsClientSecret || ""
  });
  if (!token.ok) {
    return {
      tool: "google-ads",
      status: "error",
      mode: "direct",
      query,
      note: "Unable to get Google Ads OAuth access token.",
      auth: token
    };
  }

  const gaql = `
    SELECT
      campaign.id,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value
    FROM campaign
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.impressions DESC
    LIMIT 25
  `;

  const api = await fetchJson(
    `https://googleads.googleapis.com/${apiVersion}/customers/${customerId}/googleAds:searchStream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
        "developer-token": developerToken,
        ...(loginCustomerId ? { "login-customer-id": loginCustomerId } : {})
      },
      body: JSON.stringify({ query: gaql })
    },
    timeoutMs
  );

  if (!api.ok) {
    return {
      tool: "google-ads",
      status: "error",
      mode: "direct",
      query,
      note: `Google Ads API returned ${api.status}`,
      raw: api.json
    };
  }

  const rows = parseSearchStreamRows(api.json);
  const campaigns = rows.slice(0, 10).map((row) => ({
    campaignId: row?.campaign?.id || "",
    campaignName: row?.campaign?.name || "",
    impressions: Number(row?.metrics?.impressions || 0),
    clicks: Number(row?.metrics?.clicks || 0),
    cost: Number(row?.metrics?.costMicros || 0) / 1_000_000,
    conversions: Number(row?.metrics?.conversions || 0),
    conversionValue: Number(row?.metrics?.conversionsValue || 0)
  }));

  const totals = campaigns.reduce(
    (acc, c) => ({
      impressions: acc.impressions + c.impressions,
      clicks: acc.clicks + c.clicks,
      cost: acc.cost + c.cost,
      conversions: acc.conversions + c.conversions,
      conversionValue: acc.conversionValue + c.conversionValue
    }),
    { impressions: 0, clicks: 0, cost: 0, conversions: 0, conversionValue: 0 }
  );

  return {
    tool: "google-ads",
    status: "ok",
    mode: "direct",
    query,
    summary: `Fetched ${rows.length} Google Ads rows for customer ${customerId}.`,
    result: {
      customerId,
      totals,
      campaigns
    }
  };
}
