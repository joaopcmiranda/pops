FROM node:22-alpine AS builder
WORKDIR /app

# Copy workspace root files
COPY package.json yarn.lock ./

# Copy all workspace packages
COPY packages/db-types/package.json ./packages/db-types/
COPY apps/finance-api/package.json ./apps/finance-api/
COPY apps/pops-pwa/package.json ./apps/pops-pwa/

# Install dependencies (workspace resolution)
RUN yarn install --frozen-lockfile

# Copy source files for all dependencies
COPY packages/db-types/src ./packages/db-types/src
COPY packages/db-types/tsconfig.json ./packages/db-types/
COPY apps/finance-api/src ./apps/finance-api/src
COPY apps/finance-api/tsconfig.json ./apps/finance-api/
COPY apps/pops-pwa/src ./apps/pops-pwa/src
COPY apps/pops-pwa/tsconfig.json ./apps/pops-pwa/
COPY apps/pops-pwa/vite.config.ts ./apps/pops-pwa/
COPY apps/pops-pwa/index.html ./apps/pops-pwa/
COPY apps/pops-pwa/nginx.conf ./apps/pops-pwa/

# Build db-types first (required by finance-api types, which pops-pwa references)
WORKDIR /app/packages/db-types
RUN yarn build

# Build pops-pwa
WORKDIR /app/apps/pops-pwa
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/apps/pops-pwa/dist /usr/share/nginx/html
COPY --from=builder /app/apps/pops-pwa/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
