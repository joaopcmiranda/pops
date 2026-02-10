FROM node:22-alpine AS builder
WORKDIR /app

# Copy workspace root files
COPY package.json yarn.lock ./

# Copy all workspace packages
COPY packages/db-types/package.json ./packages/db-types/
COPY services/finance-api/package.json ./services/finance-api/
COPY services/pops-pwa/package.json ./services/pops-pwa/

# Install dependencies (workspace resolution)
RUN yarn install --frozen-lockfile

# Copy source files for all dependencies
COPY packages/db-types/src ./packages/db-types/src
COPY packages/db-types/tsconfig.json ./packages/db-types/
COPY services/finance-api/src ./services/finance-api/src
COPY services/finance-api/tsconfig.json ./services/finance-api/
COPY services/pops-pwa/src ./services/pops-pwa/src
COPY services/pops-pwa/tsconfig.json ./services/pops-pwa/
COPY services/pops-pwa/vite.config.ts ./services/pops-pwa/
COPY services/pops-pwa/index.html ./services/pops-pwa/
COPY services/pops-pwa/nginx.conf ./services/pops-pwa/

# Build db-types first (required by finance-api types, which pops-pwa references)
WORKDIR /app/packages/db-types
RUN yarn build

# Build pops-pwa
WORKDIR /app/services/pops-pwa
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/services/pops-pwa/dist /usr/share/nginx/html
COPY --from=builder /app/services/pops-pwa/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
