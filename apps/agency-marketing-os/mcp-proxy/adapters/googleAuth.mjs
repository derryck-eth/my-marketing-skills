import { createSign } from "node:crypto";
import { promises as fs } from "node:fs";

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export async function fetchJson(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }
    return {
      ok: response.ok,
      status: response.status,
      json
    };
  } finally {
    clearTimeout(timeout);
  }
}

function parseServiceAccountJson(value) {
  if (!value) return null;
  if (typeof value === "object" && value?.client_email && value?.private_key) {
    return value;
  }
  try {
    const parsed = JSON.parse(String(value));
    if (parsed?.client_email && parsed?.private_key) return parsed;
  } catch {
    return null;
  }
  return null;
}

export async function getGoogleServiceAccount(options = {}) {
  const inline = parseServiceAccountJson(options?.serviceAccountJson)
    || parseServiceAccountJson(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    || parseServiceAccountJson(process.env.GA_SERVICE_ACCOUNT_JSON);
  if (inline) return inline;

  const filePath = String(options?.serviceAccountFile || process.env.GOOGLE_SERVICE_ACCOUNT_FILE || process.env.GA_SERVICE_ACCOUNT_FILE || "");
  if (!filePath) return null;

  try {
    const text = await fs.readFile(filePath, "utf8");
    return parseServiceAccountJson(text);
  } catch {
    return null;
  }
}

function buildJwtAssertion({ serviceAccount, scope, expiresInSeconds = 3600 }) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccount.client_email,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + expiresInSeconds,
    iat: now
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();

  const signature = signer
    .sign(serviceAccount.private_key)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return `${unsignedToken}.${signature}`;
}

export async function getGoogleServiceAccessToken(scope, timeoutMs = 15000, options = {}) {
  const serviceAccount = await getGoogleServiceAccount(options);
  if (!serviceAccount) {
    return {
      ok: false,
      reason: "missing_service_account",
      note: "Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_FILE."
    };
  }

  const assertion = buildJwtAssertion({ serviceAccount, scope });

  const tokenResponse = await fetchJson(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion
      })
    },
    timeoutMs
  );

  if (!tokenResponse.ok || !tokenResponse.json?.access_token) {
    return {
      ok: false,
      reason: "token_error",
      status: tokenResponse.status,
      raw: tokenResponse.json
    };
  }

  return {
    ok: true,
    accessToken: tokenResponse.json.access_token
  };
}

export async function getGoogleRefreshTokenAccessToken(timeoutMs = 15000, options = {}) {
  const refreshToken = String(options?.refreshToken || process.env.GOOGLE_ADS_REFRESH_TOKEN || "");
  const clientId = String(options?.clientId || process.env.GOOGLE_ADS_CLIENT_ID || "");
  const clientSecret = String(options?.clientSecret || process.env.GOOGLE_ADS_CLIENT_SECRET || "");

  if (!refreshToken || !clientId || !clientSecret) {
    return {
      ok: false,
      reason: "missing_refresh_credentials",
      note: "Set GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET."
    };
  }

  const tokenResponse = await fetchJson(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      })
    },
    timeoutMs
  );

  if (!tokenResponse.ok || !tokenResponse.json?.access_token) {
    return {
      ok: false,
      reason: "token_error",
      status: tokenResponse.status,
      raw: tokenResponse.json
    };
  }

  return {
    ok: true,
    accessToken: tokenResponse.json.access_token
  };
}
