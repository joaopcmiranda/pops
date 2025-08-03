#!/bin/bash

# Test deployment script
# This script simulates the deployment process for local testing

set -e

echo "🧪 Testing deployment pipeline locally..."
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
if ! pnpm install --frozen-lockfile --silent; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"

# Step 2: Run linting
echo ""
echo "🔍 Step 2: Running linter..."
if ! pnpm run lint; then
    echo "❌ Linting failed"
    exit 1
fi
echo "✅ Linting passed"

# Step 3: Run type checking
echo ""
echo "🔧 Step 3: Running type check..."
if ! pnpm run type-check; then
    echo "❌ Type checking failed"
    exit 1
fi
echo "✅ Type checking passed"

# Step 4: Build application
echo ""
echo "🏗️  Step 4: Building application..."
if ! pnpm run build; then
    echo "❌ Build failed"
    exit 1
fi
echo "✅ Build completed"

# Step 5: Check build output
echo ""
echo "📋 Step 5: Verifying build output..."
if [ ! -d "dist" ]; then
    echo "❌ Build directory 'dist' not found"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ index.html not found in build directory"
    exit 1
fi

# Count assets
asset_count=$(find dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \) | wc -l)
echo "✅ Build verification passed - Found $asset_count assets"

# Step 6: Create deployment package
echo ""
echo "📦 Step 6: Creating deployment package..."
if tar -czf deployment-test.tar.gz -C dist .; then
    package_size=$(du -h deployment-test.tar.gz | cut -f1)
    echo "✅ Deployment package created (size: $package_size)"
else
    echo "❌ Failed to create deployment package"
    exit 1
fi

# Step 7: Test package extraction
echo ""
echo "🗃️  Step 7: Testing package extraction..."
mkdir -p test-extract
if tar -xzf deployment-test.tar.gz -C test-extract; then
    extracted_files=$(find test-extract -type f | wc -l)
    echo "✅ Package extraction successful - $extracted_files files extracted"
    rm -rf test-extract
else
    echo "❌ Package extraction failed"
    exit 1
fi

# Cleanup
rm -f deployment-test.tar.gz

echo ""
echo "🎉 All deployment tests passed!"
echo "💡 Your application is ready for deployment to capivara.local"
echo ""
echo "Next steps:"
echo "1. Set up GitHub secrets (DEPLOY_SSH_KEY, DEPLOY_USER)"
echo "2. Configure server with nginx.conf"
echo "3. Push to main branch to trigger deployment"
echo ""
echo "For manual deployment instructions, see DEPLOYMENT.md"