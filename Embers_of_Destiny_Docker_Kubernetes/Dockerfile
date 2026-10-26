# Build the TanStack Start application for a Node.js server.
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
ENV NITRO_PRESET=node-server
RUN npm run build

# Small runtime image containing only the production build.
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
