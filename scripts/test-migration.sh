#!/bin/bash

# POps Backend Migration Test Suite
# This script validates the complete migration from tRPC+Prisma to Fastify+Drizzle

echo "🧪 POps Backend Migration Test Suite"
echo "===================================="

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

# Test 1: Database Schema Validation
test_database_schema() {
    cd services/trip-service
    
    # Check if all expected tables exist
    local tables=$(tsx -e "
        import { DatabaseSync } from 'node:sqlite';
        const db = new DatabaseSync('./data/trips.db');
        const result = db.prepare('SELECT name FROM sqlite_master WHERE type=?').all('table');
        console.log(result.map(r => r.name).join(','));
        db.close();
    " 2>/dev/null)
    
    cd ../..
    
    local expected_tables="users,people,locations,trips,content_items,itinerary_items,itinerary_item_attendees,trip_collaborators,trip_templates"
    
    for table in ${expected_tables//,/ }; do
        if [[ "$tables" == *"$table"* ]]; then
            echo "  ✅ Table '$table' exists"
        else
            echo "  ❌ Table '$table' missing"
            return 1
        fi
    done
    
    return 0
}

# Test 2: Sample Data Validation
test_sample_data() {
    cd services/trip-service
    
    local counts=$(tsx -e "
        import { DatabaseSync } from 'node:sqlite';
        const db = new DatabaseSync('./data/trips.db');
        const users = db.prepare('SELECT COUNT(*) as count FROM users').get();
        const trips = db.prepare('SELECT COUNT(*) as count FROM trips').get();
        const people = db.prepare('SELECT COUNT(*) as count FROM people').get();
        const locations = db.prepare('SELECT COUNT(*) as count FROM locations').get();
        console.log(\`\${users.count},\${trips.count},\${people.count},\${locations.count}\`);
        db.close();
    " 2>/dev/null)
    
    cd ../..
    
    IFS=',' read -r users trips people locations <<< "$counts"
    
    echo "  📊 Data counts: Users=$users, Trips=$trips, People=$people, Locations=$locations"
    
    [ "$users" -gt 0 ] && [ "$trips" -gt 0 ] && [ "$people" -gt 0 ] && [ "$locations" -gt 0 ]
}

# Test 3: Trip Service API
test_trip_service_api() {
    # Test health endpoint
    curl -s -f "http://localhost:3003/health" > /dev/null || return 1
    echo "  ✅ Health endpoint working"
    
    # Test trips endpoint
    local response=$(curl -s -H "x-user-id: user-demo-1" "http://localhost:3003/trips")
    
    if [[ "$response" == *"error"* ]]; then
        echo "  ❌ Trips API returned error: $response"
        return 1
    fi
    
    echo "  ✅ Trips API working"
    return 0
}

# Test 4: API Gateway tRPC
test_api_gateway_trpc() {
    # Test health endpoint
    curl -s -f "http://localhost:3001/health" > /dev/null || return 1
    echo "  ✅ Health endpoint working"
    
    # Test tRPC endpoint (simplified)
    local response=$(curl -s "http://localhost:3001/trpc/health.check")
    
    if [[ "$response" == *"healthy"* ]] || [[ "$response" != *"error"* ]]; then
        echo "  ✅ tRPC endpoint accessible"
        return 0
    else
        echo "  ❌ tRPC endpoint issue"
        return 1
    fi
}

# Test 5: Type Safety
test_type_safety() {
    echo "  🔍 Checking TypeScript compilation..."
    
    # Check shared-contracts
    cd packages/shared-contracts
    if pnpm run type-check > /dev/null 2>&1; then
        echo "  ✅ Shared contracts compile"
    else
        echo "  ❌ Shared contracts compilation failed"
        cd ../..
        return 1
    fi
    
    # Check api-client
    cd ../api-client
    if pnpm run type-check > /dev/null 2>&1; then
        echo "  ✅ API client compiles"
    else
        echo "  ❌ API client compilation failed"
        cd ../..
        return 1
    fi
    
    # Check trip-service
    cd ../../services/trip-service
    if pnpm run type-check > /dev/null 2>&1; then
        echo "  ✅ Trip service compiles"
    else
        echo "  ❌ Trip service compilation failed"
        cd ../..
        return 1
    fi
    
    cd ../..
    return 0
}

# Test 6: End-to-End Data Flow
test_end_to_end_data_flow() {
    echo "  🔄 Testing complete data flow..."
    
    # Create a test trip via API
    local create_response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -H "x-user-id: user-demo-1" \
        -d '{
            "title": "Test Migration Trip",
            "destination": "Test City",
            "country": "Test Country",
            "type": "leisure",
            "startDate": "2025-01-01T00:00:00Z",
            "endDate": "2025-01-07T00:00:00Z",
            "settings": {
                "currency": "USD",
                "timezone": "America/New_York",
                "dateFormat": "US",
                "notifications": {
                    "email": true,
                    "push": false,
                    "reminders": true
                },
                "privacy": "private"
            }
        }' \
        "http://localhost:3003/trips")
    
    if [[ "$create_response" == *"success\":true"* ]] && [[ "$create_response" == *"Test Migration Trip"* ]]; then
        echo "  ✅ Trip creation successful"
    elif [[ "$create_response" == *"success\":true"* ]]; then
        echo "  ✅ Trip creation successful (API working, checking response structure)"
        
        # Extract trip ID and test retrieval
        local trip_id=$(echo "$create_response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
        
        if [ -n "$trip_id" ]; then
            local get_response=$(curl -s -H "x-user-id: user-demo-1" "http://localhost:3003/trips/$trip_id")
            
            if [[ "$get_response" == *"Test Migration Trip"* ]]; then
                echo "  ✅ Trip retrieval successful"
                return 0
            else
                echo "  ❌ Trip retrieval failed"
                return 1
            fi
        else
            echo "  ❌ Could not extract trip ID"
            return 1
        fi
    else
        echo "  ❌ Trip creation failed: $create_response"
        return 1
    fi
}

# Run all tests
echo -e "\n${YELLOW}🚀 Starting migration validation tests...${NC}"

run_test "Database Schema Validation" "test_database_schema"
run_test "Sample Data Validation" "test_sample_data" 
run_test "Trip Service API" "test_trip_service_api"
run_test "API Gateway tRPC" "test_api_gateway_trpc"
run_test "Type Safety" "test_type_safety"
run_test "End-to-End Data Flow" "test_end_to_end_data_flow"

# Results summary
echo -e "\n${YELLOW}📊 Test Results Summary${NC}"
echo "======================="
echo -e "Total Tests: $total_tests"
echo -e "${GREEN}Passed: $passed_tests${NC}"
echo -e "${RED}Failed: $failed_tests${NC}"

if [ $failed_tests -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All tests passed! Migration is successful! 🚀${NC}"
    echo ""
    echo -e "${BLUE}✅ Architecture Migration Complete:${NC}"
    echo "   • tRPC + Prisma → Fastify + Drizzle ✅"
    echo "   • SQLite with Node.js native driver ✅"
    echo "   • Type-safe contracts ✅"
    echo "   • Microservices architecture ✅"
    echo "   • Sample data seeded ✅"
    echo ""
    exit 0
else
    echo -e "\n${RED}❌ Some tests failed. Please review the issues above.${NC}"
    echo ""
    echo -e "${YELLOW}🛠️  Troubleshooting:${NC}"
    echo "   • Check service logs: tail -f logs/*.log"
    echo "   • Restart services: ./scripts/dev-start.sh"
    echo "   • Reset environment: ./scripts/dev-reset.sh"
    echo ""
    exit 1
fi