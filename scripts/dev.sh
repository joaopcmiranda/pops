#!/bin/bash

# Trip Organizer Development Environment Starter
# This script provides a simple way to start the entire development environment

set -e

echo "🚀 Starting Trip Organizer Development Environment..."
echo "===================================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the project root
if [[ ! -f "package.json" ]]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Use NVM if available, otherwise use system Node.js
if [[ -s "$HOME/.nvm/nvm.sh" ]]; then
    source "$HOME/.nvm/nvm.sh"
    if [[ -f ".nvmrc" ]]; then
        echo -e "${BLUE}📦 Using Node.js version from .nvmrc${NC}"
        nvm use
    else
        echo -e "${BLUE}📦 Using Node.js $(node --version)${NC}"
    fi
else
    echo -e "${BLUE}📦 Using Node.js $(node --version)${NC}"
fi

echo -e "${BLUE}📦 Using pnpm $(pnpm --version)${NC}"
echo ""

# Kill any existing processes on common development ports
echo -e "${YELLOW}🛑 Cleaning up existing processes...${NC}"
lsof -ti:4003 | xargs kill -9 2>/dev/null || true  # Frontend
lsof -ti:5173 | xargs kill -9 2>/dev/null || true  # Vite dev server
lsof -ti:5174 | xargs kill -9 2>/dev/null || true  # Vite dev server alt
lsof -ti:8030 | xargs kill -9 2>/dev/null || true  # Trip service
lsof -ti:8031 | xargs kill -9 2>/dev/null || true  # Itinerary service
lsof -ti:8011 | xargs kill -9 2>/dev/null || true  # User service

echo -e "${BLUE}🚀 Starting all services with pnpm...${NC}"
pnpm run dev

echo ""
echo -e "${GREEN}✅ Development servers started:${NC}"
echo "   🌐 Frontend: http://localhost:4003"
echo "   🔌 Backend Services:"
echo "     • Trip Service: http://localhost:8030"
echo "     • Itinerary Service: http://localhost:8031" 
echo "     • User Service: http://localhost:8011"
echo ""
echo -e "${YELLOW}🔍 Health Check: pnpm services:health${NC}"
echo -e "${YELLOW}🛑 Stop Services: pnpm services:stop${NC}"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Function to handle cleanup
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping development servers...${NC}"
    
    # Use the dedicated stop script
    ./scripts/dev-stop.sh
    
    echo -e "${GREEN}✅ All servers stopped${NC}"
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for user input
read -p "Press Enter to stop all services..." -r
cleanup