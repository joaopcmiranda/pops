#!/bin/bash

# POps Backend Deployment Test Script
# This script runs comprehensive tests before deployment

set -e

echo "🚀 POps Backend Deployment Test Suite"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
total_tests=0
passed_tests=0
failed_tests=0

# Function to run a test
run_test() {
    local test_name=$1
    local test_command=$2
    
    ((total_tests++))
    echo -e "\n${BLUE}🔍 Test $total_tests: $test_name${NC}"
    echo "================================="
    
    if eval "$test_command"; then
        echo -e "${GREEN}✅ PASS: $test_name${NC}"
        ((passed_tests++))
        return 0
    else
        echo -e "${RED}❌ FAIL: $test_name${NC}"
        ((failed_tests++))
        return 1
    fi
}

# Test 1: Lint Check
test_lint() {
    echo "  🔍 Running lint checks..."
    
    # Check shared-contracts
    cd packages/shared-contracts
    if pnpm run lint > /dev/null 2>&1; then
        echo "  ✅ Shared contracts lint passed"
    else
        echo "  ❌ Shared contracts lint failed"
        cd ../..
        return 1
    fi
    
    # Check api-client
    cd ../api-client
    if pnpm run lint > /dev/null 2>&1; then
        echo "  ✅ API client lint passed"
    else
        echo "  ❌ API client lint failed"
        cd ../..
        return 1
    fi
    
    # Check trip-service
    cd ../../services/trip-service
    if pnpm run lint > /dev/null 2>&1; then
        echo "  ✅ Trip service lint passed"
    else
        echo "  ❌ Trip service lint failed"
        cd ../..
        return 1
    fi
    
    # Check api-gateway
    cd ../api-gateway
    if pnpm run lint > /dev/null 2>&1; then
        echo "  ✅ API gateway lint passed"
    else
        echo "  ❌ API gateway lint failed"
        cd ../..
        return 1
    fi
    
    cd ../..
    return 0
}

# Test 2: Type Safety Build
test_build() {
    echo "  🔨 Running TypeScript builds..."
    
    # Build shared-contracts
    cd packages/shared-contracts
    if pnpm run build > /dev/null 2>&1; then
        echo "  ✅ Shared contracts build passed"
    else
        echo "  ❌ Shared contracts build failed"
        cd ../..
        return 1
    fi
    
    # Build api-client
    cd ../api-client
    if pnpm run build > /dev/null 2>&1; then
        echo "  ✅ API client build passed"
    else
        echo "  ❌ API client build failed"
        cd ../..
        return 1
    fi
    
    # Build trip-service
    cd ../../services/trip-service
    if pnpm run build > /dev/null 2>&1; then
        echo "  ✅ Trip service build passed"
    else
        echo "  ❌ Trip service build failed"
        cd ../..
        return 1
    fi
    
    # Build api-gateway
    cd ../api-gateway
    if pnpm run build > /dev/null 2>&1; then
        echo "  ✅ API gateway build passed"
    else
        echo "  ❌ API gateway build failed"
        cd ../..
        return 1
    fi
    
    cd ../..
    return 0
}

# Test 3: Service Start and Health
test_service_health() {
    echo "  🏥 Testing service startup and health..."
    
    # Stop any existing services
    ./scripts/dev-stop.sh > /dev/null 2>&1 || true
    
    # Start services
    ./scripts/dev-start.sh > /dev/null 2>&1 || {
        echo "  ❌ Failed to start services"
        return 1
    }
    
    # Wait a bit for services to fully start
    sleep 5
    
    # Check health
    if ./scripts/health-check.sh > /dev/null 2>&1; then
        echo "  ✅ All services healthy"
        return 0
    else
        echo "  ❌ Service health check failed"
        return 1
    fi
}

# Test 4: Database Integrity
test_database_integrity() {
    echo "  🗄️ Testing database integrity..."
    
    cd services/trip-service
    
    # Check if database exists and has proper schema
    local schema_check=$(tsx -e "
        import { DatabaseSync } from 'node:sqlite';
        const db = new DatabaseSync('./data/trips.db');
        const tables = db.prepare('SELECT COUNT(*) as count FROM sqlite_master WHERE type=\"table\"').get();
        console.log(tables.count);
        db.close();
    " 2>/dev/null)
    
    cd ../..
    
    if [ "$schema_check" -ge 7 ]; then
        echo "  ✅ Database schema is valid ($schema_check tables)"
        return 0
    else
        echo "  ❌ Database schema is invalid ($schema_check tables, expected 7+)"
        return 1
    fi
}

# Test 5: API Endpoints
test_api_endpoints() {
    echo "  🔌 Testing API endpoints..."
    
    # Test Trip Service endpoints
    local health_response=$(curl -s "http://localhost:3003/health" || echo "ERROR")
    if [[ "$health_response" == *"healthy"* ]]; then
        echo "  ✅ Trip Service health endpoint working"
    else
        echo "  ❌ Trip Service health endpoint failed"
        return 1
    fi
    
    local trips_response=$(curl -s -H "x-user-id: user-demo-1" "http://localhost:3003/trips" || echo "ERROR")
    if [[ "$trips_response" != *"ERROR"* ]] && [[ "$trips_response" != *"error"* ]]; then
        echo "  ✅ Trip Service trips endpoint working"
    else
        echo "  ❌ Trip Service trips endpoint failed"
        return 1
    fi
    
    # Test API Gateway endpoints
    local gateway_health=$(curl -s "http://localhost:3001/health" || echo "ERROR")
    if [[ "$gateway_health" == *"healthy"* ]]; then
        echo "  ✅ API Gateway health endpoint working"
    else
        echo "  ❌ API Gateway health endpoint failed"
        return 1
    fi
    
    return 0
}

# Run all tests
echo -e "\n${YELLOW}🚀 Starting deployment validation tests...${NC}"

run_test "Lint Check" "test_lint"
run_test "TypeScript Build" "test_build"
run_test "Service Health" "test_service_health"
run_test "Database Integrity" "test_database_integrity"
run_test "API Endpoints" "test_api_endpoints"

# Clean up
echo -e "\n${BLUE}🧹 Cleaning up...${NC}"
./scripts/dev-stop.sh > /dev/null 2>&1 || true

# Results summary
echo -e "\n${YELLOW}📊 Deployment Test Results${NC}"
echo "=========================="
echo -e "Total Tests: $total_tests"
echo -e "${GREEN}Passed: $passed_tests${NC}"
echo -e "${RED}Failed: $failed_tests${NC}"

if [ $failed_tests -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All tests passed! Ready for deployment! 🚀${NC}"
    echo ""
    echo -e "${BLUE}✅ Pre-deployment Checklist Complete:${NC}"
    echo "   • Code quality (lint) ✅"
    echo "   • Type safety (build) ✅"
    echo "   • Service health ✅"
    echo "   • Database integrity ✅"
    echo "   • API functionality ✅"
    echo ""
    exit 0
else
    echo -e "\n${RED}❌ Some tests failed. Deployment not recommended.${NC}"
    echo ""
    echo -e "${YELLOW}🛠️  Fix these issues before deploying:${NC}"
    echo "   • Review failed test details above"
    echo "   • Run individual tests: ./scripts/test-migration.sh"
    echo "   • Check service logs: tail -f logs/*.log"
    echo ""
    exit 1
fi