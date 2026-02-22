import { fetchJson } from "./googleAuth.mjs";
import { credentialOrEnv } from "./credentials.mjs";

function parseDomain(input) {
  const raw = String(input || "").trim();
  if (!raw) return "";
  try {
    const parsed = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    return parsed.hostname.replace(/^www\./i, "");
  } catch {
    return raw.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split("/")[0];
  }
}

function inferDomainFromContext(context = {}, query = "") {
  const fromContext = parseDomain(context?.website || context?.url || context?.primaryUrl || "");
  if (fromContext) return fromContext;
  const match = String(query || "").match(/([a-z0-9-]+\.[a-z]{2,})/i);
  return parseDomain(match?.[1] || "");
}

function toNum(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function firstArray(payload = {}) {
  const candidates = [
    payload?.refpages,
    payload?.refdomains,
    payload?.backlinks,
    payload?.pages,
    payload?.positions,
    payload?.rows
  ];
  return candidates.find((value) => Array.isArray(value)) || [];
}

export async function runAhrefsDirect({ query, context, timeoutMs = 15000 }) {
  const token = credentialOrEnv({
    context,
    toolName: "ahrefs",
    credentialKeys: ["apiKey", "token", "ahrefsApiKey", "accessToken"],
    envKeys: ["AHREFS_API_KEY", "AHREFS_API_TOKEN"]
  });
  const baseUrl = credentialOrEnv({
    context,
    toolName: "ahrefs",
    credentialKeys: ["baseUrl", "apiBaseUrl"],
    envKeys: ["AHREFS_API_BASE_URL"]
  }) || "https://apiv2.ahrefs.com";
  const domain = inferDomainFromContext(context, query);

  if (!token) {
    return {
      tool: "ahrefs",
      status: "not_configured",
      mode: "direct",
      query,
      note: "Set AHREFS_API_KEY (or save ahrefs token in integrations)."
    };
  }
  if (!domain) {
    return {
      tool: "ahrefs",
      status: "error",
      mode: "direct",
      query,
      note: "No target domain found in context.website/url."
    };
  }

  const metricsUrl = `${baseUrl}?token=${encodeURIComponent(token)}&from=metrics&target=${encodeURIComponent(domain)}&mode=domain&output=json`;
  const backlinksUrl = `${baseUrl}?token=${encodeURIComponent(token)}&from=backlinks&target=${encodeURIComponent(domain)}&mode=domain&limit=20&output=json`;

  const [metricsApi, backlinksApi] = await Promise.all([
    fetchJson(metricsUrl, { method: "GET" }, timeoutMs),
    fetchJson(backlinksUrl, { method: "GET" }, timeoutMs)
  ]);

  if (!metricsApi.ok && !backlinksApi.ok) {
    return {
      tool: "ahrefs",
      status: "error",
      mode: "direct",
      query,
      note: `Ahrefs API returned ${metricsApi.status}/${backlinksApi.status}`,
      raw: {
        metrics: metricsApi.json,
        backlinks: backlinksApi.json
      }
    };
  }

  const metrics = metricsApi.json?.metrics || metricsApi.json || {};
  const backlinksRows = firstArray(backlinksApi.json);
  const backlinks = backlinksRows.slice(0, 10).map((row) => ({
    referrer: row?.referring_page_url || row?.url_from || row?.refdomain || "",
    target: row?.url_to || row?.url || "",
    anchor: row?.anchor || "",
    ahrefsRank: toNum(row?.ahrefs_rank || row?.ar || 0),
    domainRating: toNum(row?.domain_rating || row?.dr || 0),
    traffic: toNum(row?.traffic || 0)
  }));

  return {
    tool: "ahrefs",
    status: "ok",
    mode: "direct",
    query,
    summary: `Fetched Ahrefs metrics/backlink data for ${domain}.`,
    result: {
      domain,
      metrics: {
        domainRating: toNum(metrics?.domain_rating || metrics?.dr),
        urlRating: toNum(metrics?.url_rating || metrics?.ur),
        backlinks: toNum(metrics?.backlinks || metrics?.backlinks_num),
        referringDomains: toNum(metrics?.refdomains || metrics?.refdomains_num),
        organicKeywords: toNum(metrics?.organic_keywords || metrics?.organic_keywords_num),
        organicTraffic: toNum(metrics?.organic_traffic || metrics?.organic_traffic_value)
      },
      backlinks
    }
  };
}
