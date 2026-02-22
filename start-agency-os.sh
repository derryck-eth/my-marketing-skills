#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if [[ ! -f ".env" ]]; then
  cp .env.agency-os.example .env
  echo "[setup] created .env from .env.agency-os.example"
fi

load_env_file() {
  local env_file="$1"
  local line
  local line_no=0
  while IFS= read -r line || [[ -n "$line" ]]; do
    line_no=$((line_no + 1))
    line="${line%$'\r'}"
    if [[ -z "${line// }" ]]; then
      continue
    fi
    if [[ "$line" =~ ^[[:space:]]*# ]]; then
      continue
    fi
    if [[ "$line" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
      export "$line"
    else
      echo "[warn] skipping invalid .env line ${line_no}: ${line}"
    fi
  done < "$env_file"
}

load_env_file ".env"

is_port_in_use() {
  local port="$1"
  lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
}

pick_free_port() {
  local start="$1"
  local end="$2"
  local port
  for ((port=start; port<=end; port++)); do
    if ! is_port_in_use "$port"; then
      echo "$port"
      return 0
    fi
  done
  return 1
}

if [[ -z "${MCP_PROXY_MODE:-}" ]]; then
  export MCP_PROXY_MODE=direct
fi

export HOST="${HOST:-127.0.0.1}"
export MCP_PROXY_HOST="${MCP_PROXY_HOST:-127.0.0.1}"

if [[ -z "${PORT:-}" ]]; then
  PORT="$(pick_free_port 8787 8797)"
  export PORT
elif is_port_in_use "${PORT}"; then
  new_port="$(pick_free_port 8787 8797)"
  if [[ -n "${new_port}" ]]; then
    echo "[warn] PORT ${PORT} is busy; switching to ${new_port}"
    PORT="${new_port}"
    export PORT
  fi
fi

if [[ -z "${MCP_PROXY_PORT:-}" ]]; then
  MCP_PROXY_PORT="$(pick_free_port 4000 4010)"
  export MCP_PROXY_PORT
elif is_port_in_use "${MCP_PROXY_PORT}"; then
  new_proxy_port="$(pick_free_port 4000 4010)"
  if [[ -n "${new_proxy_port}" ]]; then
    echo "[warn] MCP_PROXY_PORT ${MCP_PROXY_PORT} is busy; switching to ${new_proxy_port}"
    MCP_PROXY_PORT="${new_proxy_port}"
    export MCP_PROXY_PORT
  fi
fi

export MCP_PROXY_URL="http://127.0.0.1:${MCP_PROXY_PORT}"

echo "[run] MCP_PROXY_MODE=${MCP_PROXY_MODE}"
echo "[run] API port=${PORT} MCP port=${MCP_PROXY_PORT}"
echo "[run] starting Agency OS + MCP Proxy..."
echo "[run] open: http://127.0.0.1:${PORT}/demo"
echo "[run] health: http://127.0.0.1:${PORT}/api/health"
echo "[run] mcp health: http://127.0.0.1:${MCP_PROXY_PORT}/health"

npm run agency-os:dev
