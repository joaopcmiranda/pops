#!/bin/bash

# Trip Organizer Development Environment Reset Script
# This script completely resets the development environment

set -e

echo "🔄 Resetting Trip Organizer Development Environment..."
echo "====================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the project root
if [[ ! -f "package.json" ]]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Stop all services first
echo -e "${YELLOW}🛑 Stopping all services...${NC}"
./scripts/dev-stop.sh

# Function to reset service database
reset_service_database() {
    local service_name=$1
    local service_path=$2
    
    echo -e "${BLUE}🗑️  Resetting ${service_name} database...${NC}"
    
    if cd "$service_path"; then
        # Clear database
        tsx src/scripts/clear-db.ts || {
            echo -e "${YELLOW}⚠️  Clear script failed for ${service_name}, continuing...${NC}"
        }
        
        # Recreate schema
        tsx src/scripts/create-schema.ts
        echo -e "${GREEN}✅ ${service_name} schema created${NC}"
        
        cd - > /dev/null
    else
        echo -e "${RED}❌ Failed to access ${service_name} directory${NC}"
        return 1
    fi
}

# Reset all service databases
echo -e "${YELLOW}🏗️  Resetting all service databases...${NC}"

reset_service_database "User Service" "services/user-service"
reset_service_database "Trip Service" "services/trip-service" 
reset_service_database "Itinerary Service" "services/itinerary-service"

# Seed all databases
echo -e "${BLUE}🌱 Seeding all databases with sample data...${NC}"
./scripts/seed-all-databases.sh

# Clean Turbo cache
echo -e "${BLUE}🧹 Cleaning Turbo cache...${NC}"
pnpm turbo daemon clean || {
    echo -e "${YELLOW}⚠️  Turbo daemon clean failed, continuing...${NC}"
}

# Clean and reinstall dependencies (optional)
read -p "$(echo -e ${YELLOW}Do you want to reinstall dependencies? [y/N]: ${NC})" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}📦 Cleaning and reinstalling dependencies...${NC}"
    
    # Clean node_modules
    find . -name "node_modules" -type d -prune -exec rm -rf {} + 2>/dev/null || true
    
    # Clean lockfile
    rm -f pnpm-lock.yaml
    
    # Reinstall
    pnpm install
    echo -e "${GREEN}✅ Dependencies reinstalled${NC}"
fi

# Rebuild all packages (optional)
read -p "$(echo -e ${YELLOW}Do you want to rebuild all packages? [y/N]: ${NC})" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🔨 Building all packages...${NC}"
    pnpm turbo run build --filter='./packages/*' || {
        echo -e "${YELLOW}⚠️  Some packages failed to build, continuing...${NC}"
    }
    echo -e "${GREEN}✅ Packages built${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Development environment reset complete!${NC}"
echo "====================================================="
echo -e "${BLUE}🚀 To start development:${NC}"
echo "  ./scripts/dev-start.sh  # or pnpm services:dev"
echo "  ./scripts/dev.sh        # or pnpm run dev"
echo ""
echo -e "${BLUE}🔍 Check system health:${NC}"
echo "  ./scripts/health-check.sh  # or pnpm services:health"
echo ""
echo -e "${BLUE}📊 Sample Data Available:${NC}"
echo "• 3 test users with authentication"
echo "• 6 travel contacts/attendees"
echo "• 11 locations across Rio, Tokyo, London"
echo "• 4 trips (3 active + 1 template)"
echo "• 9 detailed itinerary items"
echo "• 4 rich content pieces"
echo ""
echo -e "${GREEN}Ready for development! 🚀${NC}"