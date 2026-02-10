FROM node:22-alpine AS builder
WORKDIR /app

# Copy workspace root files
COPY package.json yarn.lock ./

# Copy all workspace packages
COPY packages/db-types/package.json ./packages/db-types/
COPY services/finance-api/package.json ./services/finance-api/

# Install dependencies (workspace resolution)
RUN yarn install --frozen-lockfile

# Copy source files
COPY packages/db-types/src ./packages/db-types/src
COPY packages/db-types/tsconfig.json ./packages/db-types/
COPY services/finance-api/tsconfig.json ./services/finance-api/
COPY services/finance-api/src ./services/finance-api/src

# Build db-types first
WORKDIR /app/packages/db-types
RUN yarn build

# Build finance-api
WORKDIR /app/services/finance-api
RUN yarn build

FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache curl

# Copy built service
COPY --from=builder /app/services/finance-api/dist ./dist
COPY --from=builder /app/services/finance-api/package.json ./

# Copy node_modules and workspace dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/db-types/dist ./node_modules/@pops/db-types/dist
COPY --from=builder /app/packages/db-types/package.json ./node_modules/@pops/db-types/

EXPOSE 3000
CMD ["node", "dist/index.js"]
