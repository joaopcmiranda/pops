#!/bin/bash
set -e

# Setup GitHub Actions self-hosted runner on N95 server
# Usage: ./scripts/setup-github-runner.sh <GITHUB_TOKEN>

if [ -z "$1" ]; then
    echo "Usage: $0 <GITHUB_TOKEN>"
    echo ""
    echo "Get token from: https://github.com/joaopcmiranda/pops/settings/actions/runners/new"
    exit 1
fi

RUNNER_TOKEN="$1"
RUNNER_VERSION="2.313.0"
WORK_DIR="/opt/pops/actions-runner"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "GitHub Actions Runner Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create runner directory
echo "Creating runner directory..."
sudo mkdir -p "$WORK_DIR"
sudo chown "$USER:$USER" "$WORK_DIR"
cd "$WORK_DIR"

# Download runner
echo "Downloading runner v${RUNNER_VERSION}..."
curl -o actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz -L \
    "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"

# Extract runner
echo "Extracting runner..."
tar xzf "./actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"

# Configure runner
echo "Configuring runner..."
./config.sh \
    --url https://github.com/joaopcmiranda/pops \
    --token "$RUNNER_TOKEN" \
    --name "n95-pops-runner" \
    --labels "self-hosted,linux,x64,n95" \
    --work _work \
    --replace

# Install dependencies
echo "Installing dependencies..."
sudo ./bin/installdependencies.sh

# Install as systemd service
echo "Installing systemd service..."
sudo ./svc.sh install

# Start service
echo "Starting runner service..."
sudo ./svc.sh start

# Check status
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Runner setup complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
sudo ./svc.sh status

echo ""
echo "Next steps:"
echo "1. Verify runner appears in GitHub: https://github.com/joaopcmiranda/pops/settings/actions/runners"
echo "2. Push a commit to main to trigger deployment"
echo "3. Monitor logs: sudo journalctl -u actions.runner.* -f"
