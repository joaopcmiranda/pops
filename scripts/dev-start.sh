#!/bin/bash

# POps Backend Development Start Script (Turbo Version)
# This script starts all backend services using Turbo with proper orchestration

set -e

echo "🚀 Starting POps Backend Services (Turbo Version)..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if port is available
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${RED}Port $port is already in use${NC}"
        return 1
    fi
    return 0
}

# Function to wait for service to be ready
wait_for_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1
    
    echo -e "${YELLOW}Waiting for $name to be ready...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "$url" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $name is ready!${NC}"
            return 0
        fi
        
        if [ $attempt -eq 1 ]; then
            echo -n "Attempting to connect"
        fi
        echo -n "."
        sleep 1
        ((attempt++))
    done
    
    echo -e "\n${RED}❌ $name failed to start within $max_attempts seconds${NC}"
    return 1
}

# Kill existing processes
echo -e "${YELLOW}🛑 Stopping existing services...${NC}"
pkill -f "tsx.*trip-service" || true
pkill -f "tsx.*itinerary-service" || true
pkill -f "tsx.*user-service" || true
sleep 2

# Check if ports are available
echo -e "${BLUE}🔍 Checking ports...${NC}"
check_port 8030 || exit 1
check_port 8031 || exit 1
check_port 8011 || exit 1

# Create logs directory if it doesn't exist
mkdir -p logs

# Start all services using Turbo in parallel
echo -e "${BLUE}🚀 Starting all backend services with Turbo...${NC}"

# Start all services in parallel using Turbo
PORT=8030 pnpm turbo run dev --filter=@pops/trip-service > logs/trip-service.log 2>&1 &
TRIP_SERVICE_PID=$!

PORT=8031 pnpm turbo run dev --filter=@pops/itinerary-service > logs/itinerary-service.log 2>&1 &
ITINERARY_SERVICE_PID=$!

PORT=8011 pnpm turbo run dev --filter=@pops/user-service > logs/user-service.log 2>&1 &
USER_SERVICE_PID=$!


# Wait for services to be ready
wait_for_service "http://localhost:8030/health" "Trip Service" || exit 1
wait_for_service "http://localhost:8031/health" "Itinerary Service" || exit 1
wait_for_service "http://localhost:8011/health" "User Service" || exit 1

echo ""
echo -e "${GREEN}🎉 All services started successfully!${NC}"
echo "=================================================="
echo -e "${BLUE}📊 Service Status:${NC}"
echo "• Trip Service:      http://localhost:8030"
echo "• Itinerary Service: http://localhost:8031"  
echo "• User Service:      http://localhost:8011"
echo "• Frontend:          http://localhost:4003 (run 'pnpm dev:travel')"
echo ""
echo -e "${YELLOW}📝 Logs:${NC}"
echo "• Trip Service:      tail -f logs/trip-service.log"
echo "• Itinerary Service: tail -f logs/itinerary-service.log"
echo "• User Service:      tail -f logs/user-service.log"
echo ""
echo -e "${YELLOW}🛑 To stop services:${NC}"
echo "  pnpm services:stop  # or ./scripts/dev-stop.sh"
echo ""
echo -e "${YELLOW}🔍 Health check:${NC}"
echo "  pnpm services:health  # or turbo run health --filter='./services/*'"
echo ""
echo -e "${GREEN}Development environment is ready! 🚀${NC}"