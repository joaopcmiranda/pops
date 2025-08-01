# Multi-stage build for optimized production image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/shared/package*.json ./packages/shared/
COPY packages/types/package*.json ./packages/types/

# Install dependencies
RUN npm ci --only=production --ignore-scripts

# Copy source code
COPY . .

# Generate Prisma client
RUN cd apps/api && npx prisma generate

# Build the application
RUN npm run build --filter="@trip-organizer/api"

# Production stage
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init sqlite

# Create app user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S backend -u 1001

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=backend:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=backend:nodejs /app/apps/api/node_modules ./node_modules
COPY --from=builder --chown=backend:nodejs /app/apps/api/package.json ./package.json
COPY --from=builder --chown=backend:nodejs /app/apps/api/prisma ./prisma

# Create database directory
RUN mkdir -p /app/data && chown backend:nodejs /app/data

# Switch to non-root user
USER backend

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Start the application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "npx prisma db push && node dist/index.js"]