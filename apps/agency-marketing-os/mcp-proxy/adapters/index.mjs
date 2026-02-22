import { runAhrefsDirect } from "./ahrefs.mjs";
import { runGa4Direct } from "./ga4.mjs";
import { runGoogleAdsDirect } from "./googleAds.mjs";
import { runGscDirect } from "./gsc.mjs";
import { runMetaAdsDirect } from "./metaAds.mjs";
import { runSemrushDirect } from "./semrush.mjs";

const directAdapters = {
  ahrefs: runAhrefsDirect,
  ga4: runGa4Direct,
  "google-ads": runGoogleAdsDirect,
  "meta-ads": runMetaAdsDirect,
  "google-search-console": runGscDirect,
  semrush: runSemrushDirect
};

export function listDirectTools() {
  return Object.keys(directAdapters);
}

export async function runDirectQuery({ tool, query, context, timeoutMs }) {
  const adapter = directAdapters[tool];
  if (!adapter) {
    return {
      tool,
      status: "not_supported",
      mode: "direct",
      query,
      note: `Direct adapter not implemented for '${tool}'.`
    };
  }

  try {
    return await adapter({ tool, query, context, timeoutMs });
  } catch (error) {
    return {
      tool,
      status: "error",
      mode: "direct",
      query,
      note: error?.message || "Direct adapter execution failed"
    };
  }
}
