#!/bin/bash

# Set the correct Node.js path
export PATH="/Users/joao/.nvm/versions/node/v24.5.0/bin:$PATH"

echo "🚀 Starting Trip Organizer Development Servers..."
echo "📦 Node.js version: $(node --version)"
echo "📦 npm version: $(npm --version)"
echo ""

# Kill any existing processes on these ports
lsof -ti:5173 | xargs kill -9 2>/dev/null || true
lsof -ti:5174 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

echo "🚀 Starting all services with Nx..."
yarn dev

echo ""
echo "✅ Development servers started:"
echo "   🌐 Frontend: http://localhost:5174"
echo "   🔌 Backend API: http://localhost:3001"
echo "   🔍 API Health: http://localhost:3001/health"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Function to handle cleanup
cleanup() {
    echo ""
    echo "🛑 Stopping development servers..."
    kill $API_PID 2>/dev/null || true
    kill $WEB_PID 2>/dev/null || true
    lsof -ti:5173 | xargs kill -9 2>/dev/null || true
    lsof -ti:5174 | xargs kill -9 2>/dev/null || true
    lsof -ti:3001 | xargs kill -9 2>/dev/null || true
    echo "✅ All servers stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for processes
wait