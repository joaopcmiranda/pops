FROM node:22-alpine AS builder
WORKDIR /app

# Copy workspace root files
COPY package.json yarn.lock ./

# Copy this service's package.json
COPY apps/notion-sync/package.json ./apps/notion-sync/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files
COPY apps/notion-sync/tsconfig.json ./apps/notion-sync/
COPY apps/notion-sync/src ./apps/notion-sync/src

# Build
WORKDIR /app/apps/notion-sync
RUN yarn build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/apps/notion-sync/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/notion-sync/package.json ./
CMD ["node", "dist/index.js"]
