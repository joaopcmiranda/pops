#!/bin/bash

# POps Backend Health Check Script (NX Version)
# This script checks the health of all services using NX

echo "🏥 POps Backend Health Check (NX Version)"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "\n${YELLOW}🔍 Service Health (via NX):${NC}"
echo "============================="

# Run NX health checks and capture results
health_output=$(nx run-many -t health --projects=trip-service,api-gateway 2>&1)
health_exit_code=$?

if [ $health_exit_code -eq 0 ]; then
    echo -e "${GREEN}✅ All NX health checks passed${NC}"
    health_count=2
else
    echo -e "${RED}❌ Some NX health checks failed${NC}"
    echo "$health_output"
    health_count=0
fi

# Manual health checks as fallback
echo -e "\n${YELLOW}🔍 Manual Health Checks:${NC}"
echo "========================="

manual_health_count=0

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

api_count=0

# Check service health manually
check_service "http://localhost:3003/health" "Trip Service" && ((manual_health_count++))
check_service "http://localhost:3001/health" "API Gateway" && ((manual_health_count++))

echo -e "\n${YELLOW}🔌 API Tests:${NC}"
echo "============="

# Test API endpoints
test_api "http://localhost:3003/trips" "Trip Service" && ((api_count++))
test_api "http://localhost:3001/trpc/trip.list" "tRPC Gateway" && ((api_count++))

echo -e "\n${YELLOW}📊 Overall Status:${NC}"
echo "=================="

# Determine overall status
total_expected=2
if [ $manual_health_count -eq $total_expected ] && [ $api_count -eq $total_expected ]; then
    echo -e "${GREEN}🎉 All systems operational ($manual_health_count/$total_expected services, $api_count/$total_expected APIs)${NC}"
    exit_code=0
elif [ $manual_health_count -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Partial outage ($manual_health_count/$total_expected services, $api_count/$total_expected APIs)${NC}"
    exit_code=1
else
    echo -e "${RED}❌ All systems down${NC}"
    exit_code=2
fi

echo -e "\n${BLUE}💡 NX Commands:${NC}"
echo "==============="
echo "• Start services:  pnpm services:dev"
echo "• Stop services:   ./scripts/dev-stop-nx.sh"
echo "• Health check:    pnpm services:health"
echo "• Build services:  pnpm services:build"

echo ""
exit $exit_code