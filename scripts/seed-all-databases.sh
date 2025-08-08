#!/bin/bash

# Seed all databases script
# This script runs all database seeding operations in the correct order

set -e

echo "🌱 Starting database seeding process..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to run seed script and check result
run_seed() {
    local service_name=$1
    local script_path=$2
    
    echo -e "${YELLOW}📦 Seeding ${service_name}...${NC}"
    
    if cd "$script_path" && tsx src/scripts/seed-data.ts; then
        echo -e "${GREEN}✅ ${service_name} seeded successfully${NC}"
    else
        echo -e "${RED}❌ Failed to seed ${service_name}${NC}"
        exit 1
    fi
    
    cd - > /dev/null
}

# Make sure we're in the project root
cd "$(dirname "$0")/.."

echo "🏗️  Creating database schemas first..."

# Create schemas in dependency order
echo "📋 Creating user service schema..."
cd services/user-service && tsx src/scripts/create-schema.ts && cd ../..

echo "📋 Creating trip service schema..."  
cd services/trip-service && tsx src/scripts/create-schema.ts && cd ../..

echo "📋 Creating itinerary service schema..."
cd services/itinerary-service && tsx src/scripts/create-schema.ts && cd ../..

echo -e "${GREEN}✅ All schemas created${NC}"

# Seed databases in dependency order (users first, then trips, then itinerary items)
echo "🌱 Starting seeding process..."

run_seed "User Service" "services/user-service"
run_seed "Trip Service" "services/trip-service" 
run_seed "Itinerary Service" "services/itinerary-service"

echo -e "${GREEN}🎉 All databases seeded successfully!${NC}"
echo ""
echo -e "${YELLOW}📊 Seed Data Summary:${NC}"
echo "   • Users: 3 test users created"
echo "   • People: 6 contacts/attendees created"
echo "   • Locations: 11 locations across Rio, Tokyo, London"
echo "   • Trips: 4 trips (3 active + 1 template)"
echo "   • Itinerary Items: 9 detailed itinerary items"
echo "   • Content Items: 4 rich content pieces"
echo ""
echo -e "${GREEN}✅ Ready for development and testing!${NC}"