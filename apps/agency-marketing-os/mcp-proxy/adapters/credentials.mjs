function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

const aliasMap = {
  "google-search-console": ["google-search-console", "gsc", "search-console"],
  ga4: ["ga4", "google-analytics-4", "google-analytics"],
  "google-ads": ["google-ads", "googleads", "ads-google"],
  "meta-ads": ["meta-ads", "facebook-ads", "metaads"],
  semrush: ["semrush", "sem-rush"],
  ahrefs: ["ahrefs", "ahref"]
};

function aliasesForTool(toolName) {
  const normalized = normalize(toolName);
  const aliases = aliasMap[normalized] || [normalized];
  return [...new Set(aliases.map(normalize).filter(Boolean))];
}

export function getToolCredentials(context = {}, toolName = "") {
  const integrationCredentials = context?.integrationCredentials;
  if (!integrationCredentials || typeof integrationCredentials !== "object") {
    return {};
  }

  const aliases = aliasesForTool(toolName);
  for (const alias of aliases) {
    const maybe = integrationCredentials[alias];
    if (maybe && typeof maybe === "object") {
      return maybe;
    }
  }
  return {};
}

export function credentialOrEnv({
  context = {},
  toolName = "",
  credentialKeys = [],
  envKeys = []
}) {
  const toolCredentials = getToolCredentials(context, toolName);
  for (const key of credentialKeys) {
    const value = toolCredentials?.[key];
    if (value != null && String(value).trim()) return String(value).trim();
  }

  for (const key of envKeys) {
    const value = process.env[key];
    if (value != null && String(value).trim()) return String(value).trim();
  }

  return "";
}
