#!/bin/bash

# Trip Organizer Deployment Test Script
# This script runs comprehensive tests before deployment

set -e

echo "🚀 Trip Organizer Deployment Test Suite"
echo "========================================"

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
    echo "  🔍 Running lint checks with Turbo..."
    
    if pnpm turbo run lint > /dev/null 2>&1; then
        echo "  ✅ All packages lint passed"
        return 0
    else
        echo "  ❌ Lint check failed, checking individual packages:"
        
        # Check each package individually for better debugging
        local failed=0
        
        # Check packages
        for pkg in packages/types packages/ui packages/api-client packages/auth; do
            if [[ -d "$pkg" ]]; then
                echo -n "    • $(basename "$pkg"): "
                if cd "$pkg" && pnpm run lint > /dev/null 2>&1; then
                    echo "✅"
                    cd - > /dev/null
                else
                    echo "❌"
                    cd - > /dev/null
                    failed=1
                fi
            fi
        done
        
        # Check services
        for service in services/trip-service services/itinerary-service services/user-service; do
            if [[ -d "$service" ]]; then
                echo -n "    • $(basename "$service"): "
                if cd "$service" && pnpm run lint > /dev/null 2>&1; then
                    echo "✅"
                    cd - > /dev/null
                else
                    echo "❌"
                    cd - > /dev/null
                    failed=1
                fi
            fi
        done
        
        # Check frontend
        if [[ -d "apps/travel" ]]; then
            echo -n "    • travel-app: "
            if cd "apps/travel" && pnpm run lint > /dev/null 2>&1; then
                echo "✅"
                cd - > /dev/null
            else
                echo "❌"
                cd - > /dev/null
                failed=1
            fi
        fi
        
        return $failed
    fi
}

# Test 2: Type Safety Build
test_build() {
    echo "  🔨 Running TypeScript builds and type checks..."
    
    # Run type-check first (faster)
    echo "    🔍 Type checking..."
    if pnpm turbo run type-check > /dev/null 2>&1; then
        echo "  ✅ All packages type check passed"
    else
        echo "  ❌ Type check failed"
        return 1
    fi
    
    # Build packages
    echo "    🏗️ Building packages..."
    if pnpm turbo run build --filter='./packages/*' > /dev/null 2>&1; then
        echo "  ✅ All packages built successfully"
        return 0
    else
        echo "  ❌ Build failed"
        return 1
    fi
}

# Test 3: Service Start and Health
test_service_health() {
    echo "  🏥 Testing service startup and health..."
    
    # Stop any existing services
    ./scripts/dev-stop.sh > /dev/null 2>&1 || true
    sleep 2
    
    # Start services in background
    echo "    🚀 Starting services..."
    ./scripts/dev-start.sh > /dev/null 2>&1 &
    local start_pid=$!
    
    # Wait for services to start (max 60 seconds)
    local max_wait=60
    local waited=0
    
    while [ $waited -lt $max_wait ]; do
        sleep 2
        waited=$((waited + 2))
        
        # Check if all health endpoints are responding
        if curl -s -f "http://localhost:8030/health" > /dev/null 2>&1 && \
           curl -s -f "http://localhost:8031/health" > /dev/null 2>&1 && \
           curl -s -f "http://localhost:8011/health" > /dev/null 2>&1; then
            echo "  ✅ All services started and healthy (${waited}s)"
            return 0
        fi
    done
    
    echo "  ❌ Services failed to start within ${max_wait} seconds"
    return 1
}

# Test 4: Database Integrity
test_database_integrity() {
    echo "  🗄️ Testing database integrity..."
    
    local failed=0
    
    # Check Trip Service database
    if cd services/trip-service; then
        local trip_tables=$(tsx -e "
            import { DatabaseSync } from 'node:sqlite';
            try {
                const db = new DatabaseSync('./data/trips.db');
                const tables = db.prepare('SELECT COUNT(*) as count FROM sqlite_master WHERE type=\"table\"').get();
                console.log(tables.count);
                db.close();
            } catch (e) {
                console.log('0');
            }
        " 2>/dev/null)
        
        if [ "$trip_tables" -ge 4 ]; then
            echo "    ✅ Trip service database ($trip_tables tables)"
        else
            echo "    ❌ Trip service database invalid ($trip_tables tables)"
            failed=1
        fi
        cd - > /dev/null
    fi
    
    # Check User Service database
    if cd services/user-service; then
        local user_tables=$(tsx -e "
            import { DatabaseSync } from 'node:sqlite';
            try {
                const db = new DatabaseSync('./data/users.db');
                const tables = db.prepare('SELECT COUNT(*) as count FROM sqlite_master WHERE type=\"table\"').get();
                console.log(tables.count);
                db.close();
            } catch (e) {
                console.log('0');
            }
        " 2>/dev/null)
        
        if [ "$user_tables" -ge 2 ]; then
            echo "    ✅ User service database ($user_tables tables)"
        else
            echo "    ❌ User service database invalid ($user_tables tables)"
            failed=1
        fi
        cd - > /dev/null
    fi
    
    # Check Itinerary Service database
    if cd services/itinerary-service; then
        local itinerary_tables=$(tsx -e "
            import { DatabaseSync } from 'node:sqlite';
            try {
                const db = new DatabaseSync('./data/trips.db');
                const tables = db.prepare('SELECT COUNT(*) as count FROM sqlite_master WHERE type=\"table\"').get();
                console.log(tables.count);
                db.close();
            } catch (e) {
                console.log('0');
            }
        " 2>/dev/null)
        
        if [ "$itinerary_tables" -ge 2 ]; then
            echo "    ✅ Itinerary service database ($itinerary_tables tables)"
        else
            echo "    ❌ Itinerary service database invalid ($itinerary_tables tables)"
            failed=1
        fi
        cd - > /dev/null
    fi
    
    return $failed
}

# Test 5: API Endpoints
test_api_endpoints() {
    echo "  🔌 Testing API endpoints..."
    
    local failed=0
    
    # Test Trip Service
    echo -n "    • Trip Service: "
    local trip_health=$(curl -s "http://localhost:8030/health" 2>/dev/null || echo "ERROR")
    if [[ "$trip_health" == *"healthy"* ]] || [[ "$trip_health" == *"OK"* ]]; then
        echo "✅ Health OK"
        
        # Test trips endpoint
        local trips_response=$(curl -s -H "x-user-id: user-demo-1" "http://localhost:8030/trips" 2>/dev/null || echo "ERROR")
        if [[ "$trips_response" != *"ERROR"* ]]; then
            echo "      • Trips API: ✅"
        else
            echo "      • Trips API: ❌"
            failed=1
        fi
    else
        echo "❌ Health failed"
        failed=1
    fi
    
    # Test User Service
    echo -n "    • User Service: "
    local user_health=$(curl -s "http://localhost:8011/health" 2>/dev/null || echo "ERROR")
    if [[ "$user_health" == *"healthy"* ]] || [[ "$user_health" == *"OK"* ]]; then
        echo "✅ Health OK"
    else
        echo "❌ Health failed"
        failed=1
    fi
    
    # Test Itinerary Service
    echo -n "    • Itinerary Service: "
    local itinerary_health=$(curl -s "http://localhost:8031/health" 2>/dev/null || echo "ERROR")
    if [[ "$itinerary_health" == *"healthy"* ]] || [[ "$itinerary_health" == *"OK"* ]]; then
        echo "✅ Health OK"
    else
        echo "❌ Health failed"
        failed=1
    fi
    
    return $failed
}

# Run all tests
echo -e "\n${YELLOW}🚀 Starting deployment validation tests...${NC}"

run_test "Lint Check" "test_lint"
run_test "TypeScript Build & Type Check" "test_build"
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
    echo "   • Type safety (build & type-check) ✅"
    echo "   • Service health ✅"
    echo "   • Database integrity ✅"
    echo "   • API functionality ✅"
    echo ""
    echo -e "${BLUE}🚀 Next Steps:${NC}"
    echo "   • Build production: pnpm turbo run build"
    echo "   • Deploy services: Use your deployment pipeline"
    echo "   • Monitor health: ./scripts/health-check.sh"
    echo ""
    exit 0
else
    echo -e "\n${RED}❌ Some tests failed. Deployment not recommended.${NC}"
    echo ""
    echo -e "${YELLOW}🛠️  Fix these issues before deploying:${NC}"
    echo "   • Review failed test details above"
    echo "   • Run individual checks:"
    echo "     - pnpm turbo run lint"
    echo "     - pnpm turbo run type-check"
    echo "     - ./scripts/health-check.sh"
    echo "   • Check service logs: tail -f logs/*.log"
    echo "   • Reset environment: ./scripts/dev-reset.sh"
    echo ""
    exit 1
fi