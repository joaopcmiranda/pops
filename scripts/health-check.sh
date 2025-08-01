#!/bin/bash

# Health check script for Brazil Trip Organizer deployment
# This script verifies that the deployment is working correctly

set -e

SERVER_URL="http://capivara.local"
HEALTH_ENDPOINT="$SERVER_URL/health"
MAX_RETRIES=10
RETRY_DELAY=5

echo "🔍 Starting deployment health check..."
echo "Server: $SERVER_URL"
echo "Health endpoint: $HEALTH_ENDPOINT"
echo ""

# Function to check if server responds
check_server_response() {
    local url=$1
    local expected_status=${2:-200}
    
    echo "Checking $url..."
    
    # Use curl to check the response
    if response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null); then
        if [ "$response" = "$expected_status" ]; then
            echo "✅ $url responded with status $response"
            return 0
        else
            echo "❌ $url responded with status $response (expected $expected_status)"
            return 1
        fi
    else
        echo "❌ $url is not responding"
        return 1
    fi
}

# Function to check if React app loads correctly
check_react_app() {
    local url=$1
    
    echo "Checking React app at $url..."
    
    # Check if we get HTML content with React app indicators
    if content=$(curl -s "$url" 2>/dev/null); then
        if echo "$content" | grep -q "<!DOCTYPE html>" && echo "$content" | grep -q "root"; then
            echo "✅ React app is loading correctly"
            return 0
        else
            echo "❌ React app content is not valid"
            return 1
        fi
    else
        echo "❌ Unable to fetch React app content"
        return 1
    fi
}

# Function to retry with backoff
retry_with_backoff() {
    local command=$1
    local max_retries=$2
    local delay=$3
    local count=0
    
    while [ $count -lt $max_retries ]; do
        if eval "$command"; then
            return 0
        fi
        
        count=$((count + 1))
        if [ $count -lt $max_retries ]; then
            echo "Retry $count/$max_retries in ${delay}s..."
            sleep $delay
        fi
    done
    
    return 1
}

# Main health checks
echo "Starting health checks with $MAX_RETRIES retries..."
echo ""

# Check 1: Health endpoint
echo "🏥 Health Check 1: Health endpoint"
if retry_with_backoff "check_server_response $HEALTH_ENDPOINT 200" $MAX_RETRIES $RETRY_DELAY; then
    echo "✅ Health endpoint check passed"
else
    echo "❌ Health endpoint check failed after $MAX_RETRIES retries"
    exit 1
fi

echo ""

# Check 2: Main application
echo "🌐 Health Check 2: Main application"
if retry_with_backoff "check_server_response $SERVER_URL 200" $MAX_RETRIES $RETRY_DELAY; then
    echo "✅ Main application check passed"
else
    echo "❌ Main application check failed after $MAX_RETRIES retries"
    exit 1
fi

echo ""

# Check 3: React app content
echo "⚛️  Health Check 3: React app content"
if retry_with_backoff "check_react_app $SERVER_URL" $MAX_RETRIES $RETRY_DELAY; then
    echo "✅ React app content check passed"
else
    echo "❌ React app content check failed after $MAX_RETRIES retries"
    exit 1
fi

echo ""
echo "🎉 All health checks passed! Deployment is healthy."
echo "🌍 Application is available at: $SERVER_URL"

# Optional: Check for specific content
echo ""
echo "📊 Additional Information:"
echo "Server response time: $(curl -o /dev/null -s -w '%{time_total}s' $SERVER_URL)"
echo "Server date: $(curl -s -I $SERVER_URL | grep -i date | cut -d' ' -f2-)"

exit 0