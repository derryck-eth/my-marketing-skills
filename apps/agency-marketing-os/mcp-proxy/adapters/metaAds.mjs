import { fetchJson } from "./googleAuth.mjs";
import { credentialOrEnv } from "./credentials.mjs";

function parseNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export async function runMetaAdsDirect({ query, context, timeoutMs = 15000 }) {
  const accessToken = credentialOrEnv({
    context,
    toolName: "meta-ads",
    credentialKeys: ["accessToken", "metaAccessToken", "apiKey"],
    envKeys: ["META_ACCESS_TOKEN"]
  });
  const adAccountId = credentialOrEnv({
    context,
    toolName: "meta-ads",
    credentialKeys: ["adAccountId", "metaAdAccountId"],
    envKeys: ["META_AD_ACCOUNT_ID"]
  }).replace(/^act_/, "");
  const graphVersion = credentialOrEnv({
    context,
    toolName: "meta-ads",
    credentialKeys: ["graphVersion", "metaGraphVersion"],
    envKeys: ["META_GRAPH_VERSION"]
  }) || "v21.0";

  if (!accessToken || !adAccountId) {
    return {
      tool: "meta-ads",
      status: "not_configured",
      mode: "direct",
      query,
      note: "Set META_ACCESS_TOKEN and META_AD_ACCOUNT_ID."
    };
  }

  const params = new URLSearchParams({
    access_token: accessToken,
    level: "campaign",
    date_preset: "last_30d",
    fields: "campaign_name,spend,impressions,clicks,cpc,cpm,actions",
    limit: "25"
  });

  const api = await fetchJson(
    `https://graph.facebook.com/${graphVersion}/act_${adAccountId}/insights?${params.toString()}`,
    { method: "GET" },
    timeoutMs
  );

  if (!api.ok) {
    return {
      tool: "meta-ads",
      status: "error",
      mode: "direct",
      query,
      note: `Meta Ads API returned ${api.status}`,
      raw: api.json
    };
  }

  const data = Array.isArray(api.json?.data) ? api.json.data : [];
  const campaigns = data.slice(0, 10).map((row) => ({
    campaignName: row?.campaign_name || "",
    spend: parseNumber(row?.spend),
    impressions: parseNumber(row?.impressions),
    clicks: parseNumber(row?.clicks),
    cpc: parseNumber(row?.cpc),
    cpm: parseNumber(row?.cpm)
  }));

  const totals = campaigns.reduce(
    (acc, c) => ({
      spend: acc.spend + c.spend,
      impressions: acc.impressions + c.impressions,
      clicks: acc.clicks + c.clicks
    }),
    { spend: 0, impressions: 0, clicks: 0 }
  );

  return {
    tool: "meta-ads",
    status: "ok",
    mode: "direct",
    query,
    summary: `Fetched ${data.length} Meta Ads rows for ad account ${adAccountId}.`,
    result: {
      adAccountId,
      totals,
      campaigns
    }
  };
}
