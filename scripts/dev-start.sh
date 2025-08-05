#!/bin/bash

# POps Backend Development Start Script
# This script starts all backend services in the correct order

set -e

echo "🚀 Starting POps Backend Services..."
echo "======================================="

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
pkill -f "tsx.*api-gateway" || true
sleep 2

# Check if ports are available
echo -e "${BLUE}🔍 Checking ports...${NC}"
check_port 3003 || exit 1
check_port 3004 || exit 1
check_port 3005 || exit 1
check_port 3001 || exit 1

# Create logs directory if it doesn't exist
mkdir -p logs

# Start Trip Service
echo -e "${BLUE}🧳 Starting Trip Service...${NC}"
cd services/trip-service
PORT=3003 tsx src/index.ts > ../../logs/trip-service.log 2>&1 &
TRIP_SERVICE_PID=$!
cd ../..

# Start Itinerary Service
echo -e "${BLUE}📅 Starting Itinerary Service...${NC}"
cd services/itinerary-service
PORT=3004 tsx src/index.ts > ../../logs/itinerary-service.log 2>&1 &
ITINERARY_SERVICE_PID=$!
cd ../..

# Start User Service
echo -e "${BLUE}👤 Starting User Service...${NC}"
cd services/user-service
PORT=3005 tsx src/index.ts > ../../logs/user-service.log 2>&1 &
USER_SERVICE_PID=$!
cd ../..

# Start API Gateway
echo -e "${BLUE}🌐 Starting API Gateway...${NC}"
cd services/api-gateway
tsx src/index.ts > ../../logs/api-gateway.log 2>&1 &
API_GATEWAY_PID=$!
cd ../..

# Wait for services to be ready
wait_for_service "http://localhost:3003/health" "Trip Service" || exit 1
wait_for_service "http://localhost:3004/health" "Itinerary Service" || exit 1
wait_for_service "http://localhost:3005/health" "User Service" || exit 1
wait_for_service "http://localhost:3001/health" "API Gateway" || exit 1

echo ""
echo -e "${GREEN}🎉 All services started successfully!${NC}"
echo "======================================="
echo -e "${BLUE}📊 Service Status:${NC}"
echo "• Trip Service:      http://localhost:3003"
echo "• Itinerary Service: http://localhost:3004"  
echo "• User Service:      http://localhost:3005"
echo "• API Gateway:       http://localhost:3001"
echo "• Frontend:          http://localhost:5174 (run 'pnpm run dev' in apps/travel)"
echo ""
echo -e "${YELLOW}📝 Logs:${NC}"
echo "• Trip Service:      tail -f logs/trip-service.log"
echo "• Itinerary Service: tail -f logs/itinerary-service.log"
echo "• User Service:      tail -f logs/user-service.log"
echo "• API Gateway:       tail -f logs/api-gateway.log"
echo ""
echo -e "${YELLOW}🛑 To stop services:${NC}"
echo "  ./scripts/dev-stop.sh"
echo ""
echo -e "${GREEN}Development environment is ready! 🚀${NC}"