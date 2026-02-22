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

function parseTable(text) {
  const raw = String(text || "").trim();
  if (!raw || /^error/i.test(raw)) return [];
  const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2) return [];
  const delimiter = lines[0].includes(";") ? ";" : ",";
  const headers = lines[0].split(delimiter).map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(delimiter).map((v) => v.trim());
    const row = {};
    for (let i = 0; i < headers.length; i += 1) {
      row[headers[i]] = values[i] ?? "";
    }
    return row;
  });
}

async function fetchText(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      text
    };
  } finally {
    clearTimeout(timeout);
  }
}

function toNum(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export async function runSemrushDirect({ query, context, timeoutMs = 15000 }) {
  const apiKey = credentialOrEnv({
    context,
    toolName: "semrush",
    credentialKeys: ["apiKey", "semrushApiKey", "token"],
    envKeys: ["SEMRUSH_API_KEY"]
  });
  const database = credentialOrEnv({
    context,
    toolName: "semrush",
    credentialKeys: ["database", "geoDatabase", "regionDatabase"],
    envKeys: ["SEMRUSH_DATABASE"]
  }) || "us";
  const baseUrl = credentialOrEnv({
    context,
    toolName: "semrush",
    credentialKeys: ["baseUrl", "apiBaseUrl"],
    envKeys: ["SEMRUSH_API_BASE_URL"]
  }) || "https://api.semrush.com";
  const domain = inferDomainFromContext(context, query);

  if (!apiKey) {
    return {
      tool: "semrush",
      status: "not_configured",
      mode: "direct",
      query,
      note: "Set SEMRUSH_API_KEY (or save semrush apiKey in integrations)."
    };
  }
  if (!domain) {
    return {
      tool: "semrush",
      status: "error",
      mode: "direct",
      query,
      note: "No target domain found in context.website/url."
    };
  }

  const ranksUrl = `${baseUrl}?type=domain_ranks&key=${encodeURIComponent(apiKey)}&domain=${encodeURIComponent(domain)}&database=${encodeURIComponent(database)}&export_columns=Dn,Rk,Or,Ot,Oc,Ad,At,Ac`;
  const organicUrl = `${baseUrl}?type=domain_organic&key=${encodeURIComponent(apiKey)}&domain=${encodeURIComponent(domain)}&database=${encodeURIComponent(database)}&display_limit=20&export_columns=Ph,Po,Nq,Cp,Ur,Tr,Tc`;

  const [ranksApi, organicApi] = await Promise.all([
    fetchText(ranksUrl, timeoutMs),
    fetchText(organicUrl, timeoutMs)
  ]);

  if (!ranksApi.ok && !organicApi.ok) {
    return {
      tool: "semrush",
      status: "error",
      mode: "direct",
      query,
      note: `SEMrush API returned ${ranksApi.status}/${organicApi.status}`,
      raw: {
        ranks: ranksApi.text,
        organic: organicApi.text
      }
    };
  }

  const rankRows = parseTable(ranksApi.text);
  const organicRows = parseTable(organicApi.text);
  const domainRank = rankRows[0] || {};
  const topKeywords = organicRows.slice(0, 10).map((row) => ({
    keyword: row.Ph || "",
    position: toNum(row.Po),
    searchVolume: toNum(row.Nq),
    cpc: toNum(row.Cp),
    trafficPercent: toNum(row.Tr),
    trafficCostPercent: toNum(row.Tc),
    url: row.Ur || ""
  }));

  return {
    tool: "semrush",
    status: "ok",
    mode: "direct",
    query,
    summary: `Fetched SEMrush domain/organic data for ${domain} (${database}).`,
    result: {
      domain,
      database,
      domainRank: {
        rank: toNum(domainRank.Rk),
        organicKeywords: toNum(domainRank.Or),
        organicTraffic: toNum(domainRank.Ot),
        organicCost: toNum(domainRank.Oc),
        adsKeywords: toNum(domainRank.Ad),
        adsTraffic: toNum(domainRank.At),
        adsCost: toNum(domainRank.Ac)
      },
      topKeywords
    }
  };
}
