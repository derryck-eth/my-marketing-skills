FROM node:20-alpine

WORKDIR /app
COPY . .

ENV HOST=0.0.0.0
ENV PORT=8787

EXPOSE 8787
CMD ["node", "apps/agency-marketing-os/server.mjs"]

