FROM node:22-alpine AS builder
WORKDIR /app

# Copy workspace root files
COPY package.json yarn.lock ./

# Copy this service's package.json
COPY services/notion-sync/package.json ./services/notion-sync/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files
COPY services/notion-sync/tsconfig.json ./services/notion-sync/
COPY services/notion-sync/src ./services/notion-sync/src

# Build
WORKDIR /app/services/notion-sync
RUN yarn build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/services/notion-sync/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/services/notion-sync/package.json ./
USER node
CMD ["node", "dist/index.js"]
