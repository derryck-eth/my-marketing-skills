FROM node:20-alpine

WORKDIR /app
COPY . .

ENV MCP_PROXY_HOST=0.0.0.0
ENV MCP_PROXY_PORT=4000
ENV MCP_PROXY_MODE=mock

EXPOSE 4000
CMD ["node", "apps/agency-marketing-os/mcp-proxy/server.mjs"]

