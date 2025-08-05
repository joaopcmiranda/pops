# Deployment Guide

This document describes how to set up automated deployment for the Pops app to your Debian server.

## Prerequisites

### 1. Server Setup (capivara.local)

Ensure your Debian server has the following installed:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install curl for health checks
sudo apt install curl -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. Server Directory Structure

```bash
# Create application directory
sudo mkdir -p /var/www/pops
sudo mkdir -p /var/backups/pops

# Set proper ownership
sudo chown -R www-data:www-data /var/www/pops
sudo chown -R www-data:www-data /var/backups/pops
```

### 3. Nginx Configuration

Copy the provided `nginx.conf` to your server:

```bash
# Copy the nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/pops

# Enable the site
sudo ln -s /etc/nginx/sites-available/pops /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm -f /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## GitHub Repository Setup

### 1. Generate SSH Key for Deployment

On your local machine, generate a dedicated SSH key for deployment:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/deploy_key

# Copy public key to server
ssh-copy-id -i ~/.ssh/deploy_key.pub your-username@capivara.local
```

### 2. GitHub Secrets

In your GitHub repository, go to Settings > Secrets and Variables > Actions, and add these secrets:

- `DEPLOY_SSH_KEY`: Contents of your private key file (`~/.ssh/deploy_key`)
- `DEPLOY_USER`: Your username on the server (e.g., `joao`)

To get the private key content:

```bash
cat ~/.ssh/deploy_key
```

### 3. Test SSH Connection

Verify the SSH connection works:

```bash
ssh -i ~/.ssh/deploy_key your-username@capivara.local "echo 'Connection successful'"
```

## Deployment Pipeline

The deployment pipeline consists of two jobs:

### 1. Build Job

- Runs on every push and PR
- Installs dependencies
- Runs linting and type checking
- Builds the React application
- Uploads build artifacts

### 2. Deploy Job

- Only runs on main branch pushes
- Downloads build artifacts
- Creates deployment package
- Transfers files to server via SSH
- Executes deployment script on server
- Verifies deployment health

## Deployment Process

The deployment script on the server:

1. **Backup**: Creates timestamped backup of current deployment
2. **Deploy**: Extracts new build to web directory
3. **Permissions**: Sets proper file ownership and permissions
4. **Reload**: Reloads Nginx configuration
5. **Cleanup**: Removes temporary files and old backups

## Manual Deployment (Emergency)

If you need to deploy manually:

```bash
# Build locally
npm run build

# Create package
tar -czf deployment.tar.gz -C dist .

# Copy to server
scp deployment.tar.gz your-username@capivara.local:/tmp/

# Deploy on server
ssh your-username@capivara.local << 'EOF'
sudo rm -rf /var/www/pops/*
cd /var/www/pops
sudo tar -xzf /tmp/deployment.tar.gz
sudo chown -R www-data:www-data .
sudo chmod -R 755 .
sudo systemctl reload nginx
rm /tmp/deployment.tar.gz
EOF
```

## Monitoring and Troubleshooting

### Check Deployment Status

```bash
# Check if site is running
curl -I http://capivara.local

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/pops.access.log
sudo tail -f /var/log/nginx/pops.error.log
```

### Rollback

If deployment fails, you can rollback:

```bash
# List available backups
sudo ls -la /var/backups/pops/

# Rollback to previous version
sudo rm -rf /var/www/pops/*
cd /var/www/pops
sudo tar -xzf /var/backups/pops/backup_YYYYMMDD_HHMMSS.tar.gz
sudo chown -R www-data:www-data .
sudo systemctl reload nginx
```

## Security Considerations

1. **SSH Key**: Keep the deployment SSH key secure and rotate regularly
2. **Server Access**: Limit SSH access to deployment user only
3. **File Permissions**: Ensure proper file ownership (www-data:www-data)
4. **Firewall**: Configure firewall to only allow necessary ports
5. **SSL**: Consider setting up SSL/TLS certificates for production

## Next Steps

- Set up SSL certificates with Let's Encrypt
- Configure log rotation
- Set up monitoring and alerting
- Consider using a reverse proxy for multiple applications
- Implement blue-green deployment strategy for zero-downtime deployments

## Testing the Pipeline

1. Make a commit to main branch
2. Push to GitHub
3. Check Actions tab in GitHub for pipeline status
4. Verify deployment at http://capivara.local
5. Check server logs for any issues

The deployment pipeline is now ready! Every commit to main will trigger an automatic deployment to your server.
