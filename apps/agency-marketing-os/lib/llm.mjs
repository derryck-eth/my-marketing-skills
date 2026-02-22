function extractOpenAiOutputText(responseJson) {
  if (typeof responseJson?.output_text === "string" && responseJson.output_text.trim()) {
    return responseJson.output_text.trim();
  }

  const chunks = [];
  const output = Array.isArray(responseJson?.output) ? responseJson.output : [];
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const part of content) {
      const text = part?.text || part?.output_text || "";
      if (typeof text === "string" && text.trim()) chunks.push(text.trim());
    }
  }

  return chunks.join("\n\n").trim();
}

function extractAnthropicOutputText(responseJson) {
  const chunks = [];
  const content = Array.isArray(responseJson?.content) ? responseJson.content : [];
  for (const part of content) {
    if (part?.type === "text" && typeof part?.text === "string" && part.text.trim()) {
      chunks.push(part.text.trim());
    }
  }
  return chunks.join("\n\n").trim();
}

function getProviderOrder(providerPreference = "auto") {
  const preferred = String(providerPreference || process.env.INTELLIGENCE_PRIMARY_PROVIDER || "auto")
    .trim()
    .toLowerCase();

  if (preferred === "openai") return ["openai", "anthropic"];
  if (preferred === "anthropic") return ["anthropic", "openai"];

  if (process.env.INTELLIGENCE_PRIMARY_PROVIDER?.toLowerCase() === "anthropic") {
    return ["anthropic", "openai"];
  }
  return ["openai", "anthropic"];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function getOpenAiModels() {
  return unique([
    process.env.OPENAI_MODEL,
    process.env.OPENAI_PRIMARY_MODEL,
    process.env.OPENAI_FALLBACK_MODEL,
    "gpt-4.1-mini"
  ]);
}

function getAnthropicModels() {
  return unique([
    process.env.ANTHROPIC_MODEL,
    process.env.ANTHROPIC_PRIMARY_MODEL,
    process.env.ANTHROPIC_FALLBACK_MODEL,
    "claude-3-5-sonnet-latest"
  ]);
}

async function generateWithOpenAi({
  system,
  prompt,
  maxOutputTokens,
  temperature,
  tools
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  const models = getOpenAiModels();
  const model = models[0] || "gpt-4.1-mini";

  if (!apiKey) {
    return {
      ok: false,
      reason: "missing_openai_api_key",
      provider: "openai",
      model
    };
  }

  const modelAttempts = [];
  for (const candidateModel of models) {
    const payload = {
      model: candidateModel,
      temperature,
      max_output_tokens: maxOutputTokens,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: system }]
        },
        {
          role: "user",
          content: [{ type: "input_text", text: prompt }]
        }
      ]
    };

    if (Array.isArray(tools) && tools.length) {
      payload.tools = tools;
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const body = await response.text();
      modelAttempts.push({ model: candidateModel, reason: "api_error", status: response.status });
      continue;
    }

    const json = await response.json();
    const text = extractOpenAiOutputText(json);
    if (!text) {
      modelAttempts.push({ model: candidateModel, reason: "empty_output" });
      continue;
    }

    return {
      ok: true,
      provider: "openai",
      model: candidateModel,
      text,
      raw: json,
      modelAttempts
    };
  }

  const last = modelAttempts[modelAttempts.length - 1] || { reason: "api_error" };
  return {
    ok: false,
    reason: last.reason,
    provider: "openai",
    model,
    status: last.status,
    modelAttempts
  };
}

async function generateWithAnthropic({
  system,
  prompt,
  maxOutputTokens,
  temperature
}) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const models = getAnthropicModels();
  const model = models[0] || "claude-3-5-sonnet-latest";

  if (!apiKey) {
    return {
      ok: false,
      reason: "missing_anthropic_api_key",
      provider: "anthropic",
      model
    };
  }

  const modelAttempts = [];
  for (const candidateModel of models) {
    const payload = {
      model: candidateModel,
      max_tokens: maxOutputTokens,
      temperature,
      system,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    };

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      modelAttempts.push({ model: candidateModel, reason: "api_error", status: response.status });
      continue;
    }

    const json = await response.json();
    const text = extractAnthropicOutputText(json);
    if (!text) {
      modelAttempts.push({ model: candidateModel, reason: "empty_output" });
      continue;
    }

    return {
      ok: true,
      provider: "anthropic",
      model: candidateModel,
      text,
      raw: json,
      modelAttempts
    };
  }

  const last = modelAttempts[modelAttempts.length - 1] || { reason: "api_error" };
  return {
    ok: false,
    reason: last.reason,
    provider: "anthropic",
    model,
    status: last.status,
    modelAttempts
  };
}

export function getLlmConfig() {
  return {
    providerOrder: getProviderOrder("auto"),
    intelligencePrimaryProvider: process.env.INTELLIGENCE_PRIMARY_PROVIDER || "auto",
    openai: {
      models: getOpenAiModels(),
      hasApiKey: Boolean(process.env.OPENAI_API_KEY)
    },
    anthropic: {
      models: getAnthropicModels(),
      hasApiKey: Boolean(process.env.ANTHROPIC_API_KEY)
    },
    marketResearchWeb: process.env.MARKET_RESEARCH_WITH_WEB !== "false"
  };
}

export async function generateWithLlm({
  system,
  prompt,
  maxOutputTokens = 1800,
  temperature = 0.2,
  tools = null,
  providerPreference = "auto"
}) {
  const order = getProviderOrder(providerPreference);
  const attempts = [];

  for (const provider of order) {
    const result = provider === "openai"
      ? await generateWithOpenAi({ system, prompt, maxOutputTokens, temperature, tools })
      : await generateWithAnthropic({ system, prompt, maxOutputTokens, temperature });

    if (result.ok) {
      return {
        ...result,
        attempts
      };
    }
    attempts.push({
      provider: result.provider,
      model: result.model,
      reason: result.reason,
      status: result.status
    });
  }

  const last = attempts[attempts.length - 1] || {
    provider: "unknown",
    model: "unknown",
    reason: "no_provider_available"
  };

  return {
    ok: false,
    provider: last.provider,
    model: last.model,
    reason: last.reason,
    status: last.status,
    attempts
  };
}
