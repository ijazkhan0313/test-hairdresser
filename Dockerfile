FROM node:18.19.1 as builder

WORKDIR /app

ENV NODE_OPTIONS=--openssl-legacy-provider
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-slim as run

WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/.output .output
RUN ls -la /app

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs"]
