#!/bin/bash

# POps Backend Development Reset Script
# This script resets the development environment completely

set -e

echo "🔄 Resetting POps Development Environment..."
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Stop all services first
echo -e "${YELLOW}🛑 Stopping all services...${NC}"
./scripts/dev-stop.sh

# Reset database
echo -e "${BLUE}🗑️  Clearing database...${NC}"
cd services/trip-service
pnpm nx run trip-service:db:clear || pnpm run db:clear || tsx src/scripts/clear-db.ts
echo -e "${GREEN}✅ Database cleared${NC}"

# Recreate schema
echo -e "${BLUE}🏗️  Recreating database schema...${NC}"
tsx src/scripts/create-schema.ts
echo -e "${GREEN}✅ Schema created${NC}"

# Seed with example data
echo -e "${BLUE}🌱 Seeding database with example data...${NC}"
pnpm nx run trip-service:db:seed || pnpm run db:seed || tsx src/scripts/seed.ts
echo -e "${GREEN}✅ Database seeded${NC}"

cd ../..

# Clean and reinstall dependencies (optional)
read -p "$(echo -e ${YELLOW}Do you want to reinstall dependencies? [y/N]: ${NC})" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}📦 Reinstalling dependencies...${NC}"
    pnpm install
    echo -e "${GREEN}✅ Dependencies reinstalled${NC}"
fi

# Rebuild TypeScript (optional)
read -p "$(echo -e ${YELLOW}Do you want to rebuild TypeScript? [y/N]: ${NC})" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🔨 Building TypeScript...${NC}"
    pnpm run build:all 2>/dev/null || {
        echo -e "${YELLOW}Note: build:all script not found, running individual builds...${NC}"
        cd services/trip-service && pnpm run build
        cd ../api-gateway && pnpm run build
        cd ../..
    }
    echo -e "${GREEN}✅ TypeScript built${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Development environment reset complete!${NC}"
echo "=========================================="
echo -e "${BLUE}🚀 To start development:${NC}"
echo "  ./scripts/dev-start.sh"
echo ""
echo -e "${BLUE}📊 Sample Data Available:${NC}"
echo "• 1 demo user (user-demo-1)"
echo "• 6 sample trips (Rio, Tokyo, London, Paris, Iceland, NYC)"
echo "• 3 sample people"
echo "• 9 sample locations"
echo "• 10 sample itinerary items"