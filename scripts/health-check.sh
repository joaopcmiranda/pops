#!/bin/bash

# POps Backend Health Check Script
# This script checks the health of all services and provides detailed status

echo "🏥 POps Backend Health Check"
echo "============================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check service health
check_service() {
    local url=$1
    local name=$2
    
    echo -n -e "${BLUE}Checking $name... ${NC}"
    
    if curl -s -f "$url" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Healthy${NC}"
        return 0
    else
        echo -e "${RED}❌ Not responding${NC}"
        return 1
    fi
}

# Function to test API endpoint
test_api() {
    local url=$1
    local name=$2
    
    echo -n -e "${BLUE}Testing $name API... ${NC}"
    
    local response=$(curl -s -H "x-user-id: user-demo-1" "$url" 2>/dev/null || echo "ERROR")
    
    if [[ "$response" == *"ERROR"* ]] || [[ "$response" == *"error"* ]]; then
        echo -e "${RED}❌ API error${NC}"
        return 1
    else
        echo -e "${GREEN}✅ API working${NC}"
        return 0
    fi
}

echo -e "\n${YELLOW}🔍 Service Health:${NC}"
echo "=================="

health_count=0
api_count=0

# Check service health
check_service "http://localhost:3003/health" "Trip Service" && ((health_count++))
check_service "http://localhost:3001/health" "API Gateway" && ((health_count++))

echo -e "\n${YELLOW}🔌 API Tests:${NC}"
echo "============="

# Test API endpoints
test_api "http://localhost:3003/trips" "Trip Service" && ((api_count++))
test_api "http://localhost:3001/trpc/trip.list" "tRPC Gateway" && ((api_count++))

echo -e "\n${YELLOW}📊 Overall Status:${NC}"
echo "=================="

if [ $health_count -eq 2 ] && [ $api_count -eq 2 ]; then
    echo -e "${GREEN}🎉 All systems operational (2/2 services, 2/2 APIs)${NC}"
    exit_code=0
elif [ $health_count -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Partial outage ($health_count/2 services, $api_count/2 APIs)${NC}"
    exit_code=1
else
    echo -e "${RED}❌ All systems down${NC}"
    exit_code=2
fi

echo ""
exit $exit_code