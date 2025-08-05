#!/bin/bash

# POps Backend Development Stop Script (NX Version)
# This script gracefully stops all backend services

set -e

echo "🛑 Stopping POps Backend Services (NX Version)..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to stop service by pattern
stop_service() {
    local pattern=$1
    local name=$2
    
    local pids=$(pgrep -f "$pattern" || true)
    
    if [ -n "$pids" ]; then
        echo -e "${YELLOW}Stopping $name...${NC}"
        echo "$pids" | xargs kill -TERM 2>/dev/null || true
        
        # Wait for graceful shutdown
        sleep 3
        
        # Force kill if still running
        local remaining_pids=$(pgrep -f "$pattern" || true)
        if [ -n "$remaining_pids" ]; then
            echo -e "${RED}Force killing $name...${NC}"
            echo "$remaining_pids" | xargs kill -KILL 2>/dev/null || true
        fi
        
        echo -e "${GREEN}✅ $name stopped${NC}"
    else
        echo -e "${YELLOW}$name is not running${NC}"
    fi
}

# Stop services (NX processes)
stop_service "nx run trip-service:dev" "Trip Service (NX)"
stop_service "nx run itinerary-service:dev" "Itinerary Service (NX)"
stop_service "nx run user-service:dev" "User Service (NX)"  
stop_service "nx run api-gateway:dev" "API Gateway (NX)"

# Also stop direct tsx processes as fallback
stop_service "tsx.*trip-service" "Trip Service (Direct)"
stop_service "tsx.*itinerary-service" "Itinerary Service (Direct)" 
stop_service "tsx.*user-service" "User Service (Direct)"
stop_service "tsx.*api-gateway" "API Gateway (Direct)"
stop_service "vite.*travel" "Frontend (if running)"

# Clean up log files if they exist
if [ -d "logs" ]; then
    echo -e "${YELLOW}📝 Cleaning up logs...${NC}"
    rm -f logs/*.log
fi

echo ""
echo -e "${GREEN}🎉 All services stopped successfully!${NC}"