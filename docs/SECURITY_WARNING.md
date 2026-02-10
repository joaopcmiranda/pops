# Security Warning: Self-Hosted Runners & Public Repos

## ⚠️ CRITICAL: Do Not Use Self-Hosted Runners with Public Repositories

**Current Status:** This deployment configuration is **NOT SAFE** for public repositories.

## The Problem

Self-hosted runners on public repositories create a critical security vulnerability:

1. **Anyone can fork your public repo**
2. **Forked PRs trigger workflows on YOUR runner**
3. **Attacker can execute arbitrary code on your server**
4. **Your N95, financial data, and network are compromised**

### Attack Scenario

```
Attacker forks repo
    ↓
Modifies .github/workflows/deploy.yml to include malicious code
    ↓
Creates pull request from fork
    ↓
Workflow runs on YOUR self-hosted runner
    ↓
Malicious code executes with full access to:
  - Your N95 server
  - Docker containers
  - Ansible vault password
  - Financial database
  - Network resources
```

**This is NOT theoretical** - it's a well-documented attack vector.

## Solutions

### Option 1: Make Repository Private (RECOMMENDED) ✅

**This is the safest and simplest solution.**

1. Go to: https://github.com/joaopcmiranda/pops/settings
2. Scroll to "Danger Zone"
3. Click "Change visibility"
4. Select "Make private"

**Done!** Your self-hosted runner is now safe.

**Advantages:**
- ✅ Self-hosted runner completely safe
- ✅ Current deployment setup works as-is
- ✅ No configuration changes needed
- ✅ Financial data stays private

**Disadvantages:**
- ❌ Can't showcase project publicly
- ❌ No public contributions (but this is personal finance software)

**Recommendation:** Personal finance software containing sensitive financial data should ALWAYS be private.

---

### Option 2: Manual Deployment Only (Current Setup)

Deploy manually via GitHub Actions UI instead of automatic deployment.

**Status:** Already configured in `.github/workflows/deploy.yml`

**How it works:**
1. Push changes to main (no deployment)
2. Go to: https://github.com/joaopcmiranda/pops/actions/workflows/deploy.yml
3. Click "Run workflow"
4. Select branch: main
5. Click "Run workflow"

**Advantages:**
- ✅ You control when deployment happens
- ✅ No automatic deployment on PRs
- ✅ Can keep repo public

**Disadvantages:**
- ❌ Still risky - malicious contributor could modify workflow
- ❌ Manual step required for each deployment
- ❌ Self-hosted runner still exposed to attacks

**Mitigation:**
- Require workflow approval for first-time contributors
- Review all PR changes to `.github/workflows/` carefully
- Never merge PRs that modify workflow files without thorough review

---

### Option 3: Use Tailscale + GitHub-Hosted Runners

Use GitHub's runners (secure) with Tailscale to reach your N95.

**Setup:**

1. Install Tailscale on N95:
   ```bash
   curl -fsSL https://tailscale.com/install.sh | sh
   sudo tailscale up
   ```

2. Create Tailscale OAuth client:
   - Go to: https://login.tailscale.com/admin/settings/oauth
   - Create client with tag `tag:ci`
   - Save Client ID and Secret

3. Add GitHub secrets:
   ```
   TAILSCALE_OAUTH_CLIENT_ID
   TAILSCALE_OAUTH_SECRET
   N95_SSH_KEY (your SSH private key)
   N95_HOST (Tailscale IP of N95)
   N95_USER (pops)
   ANSIBLE_VAULT_PASSWORD
   ```

4. Update workflow:
   ```yaml
   deploy:
     runs-on: ubuntu-latest  # GitHub-hosted, not self-hosted

     steps:
       - name: Connect to Tailscale
         uses: tailscale/github-action@v2
         with:
           oauth-client-id: ${{ secrets.TAILSCALE_OAUTH_CLIENT_ID }}
           oauth-secret: ${{ secrets.TAILSCALE_OAUTH_SECRET }}
           tags: tag:ci

       - name: SSH and deploy
         run: |
           ssh ${{ secrets.N95_USER }}@${{ secrets.N95_HOST }} \
             "cd /opt/pops/repo && git pull && ..."
   ```

**Advantages:**
- ✅ Runs on GitHub's infrastructure (secure)
- ✅ Can keep repo public
- ✅ Automatic deployment on push

**Disadvantages:**
- ❌ All secrets exposed in GitHub (SSH keys, vault password)
- ❌ More complex setup
- ❌ Costs: Tailscale $5/month + GitHub secrets in public repo = risk

---

### Option 4: No Self-Hosted Services (Rethink Architecture)

Deploy to a proper hosting platform instead of N95.

**Examples:**
- Railway.app (PostgreSQL + Node.js)
- Fly.io (Docker containers)
- DigitalOcean App Platform
- Vercel (frontend) + Supabase (backend)

**Advantages:**
- ✅ Professional hosting
- ✅ Built-in CI/CD
- ✅ No security risks
- ✅ Better uptime

**Disadvantages:**
- ❌ Monthly costs ($10-50/month)
- ❌ Data hosted externally
- ❌ Requires architecture changes

---

## GitHub's Official Guidance

From [GitHub Docs](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners#self-hosted-runner-security):

> ### Self-hosted runner security with public repositories
>
> **We recommend that you do not use self-hosted runners with public repositories.**
>
> Forks of your public repository can potentially run dangerous code on your self-hosted runner machine by creating a pull request that executes the code in a workflow.
>
> This is not an issue with GitHub-hosted runners because each GitHub-hosted runner is always a clean isolated virtual machine, and it is destroyed at the end of the job execution.

## Current Configuration

**Status:** ✅ Automatic deployment **DISABLED** for safety

The workflow now only runs via manual trigger (`workflow_dispatch`). This reduces risk but does NOT eliminate it if the repo stays public.

To deploy:
1. Go to Actions tab
2. Select "Deploy to Production"
3. Click "Run workflow"
4. Confirm deployment

## Recommendation

**For personal financial software:** Make the repository private.

This is sensitive financial data. There's no good reason to keep it public, and significant security risks in doing so.

```bash
# Make repo private:
# Settings → Danger Zone → Change visibility → Make private

# Then enable automatic deployment again:
# Edit .github/workflows/deploy.yml and uncomment push trigger
```

## Additional Security Measures

If you must keep the repo public:

1. **Require approval for workflow runs:**
   - Settings → Actions → General
   - "Fork pull request workflows from outside collaborators"
   - Select "Require approval for first-time contributors"

2. **Restrict workflow modifications:**
   - Add CODEOWNERS file requiring your review for `.github/workflows/*`

3. **Monitor runner activity:**
   ```bash
   # On N95
   sudo journalctl -u actions.runner.* -f
   ```

4. **Set up alerts:**
   - Enable email notifications for failed workflows
   - Monitor unusual deployment activity

5. **Regular audits:**
   - Review runner logs weekly
   - Check for unauthorized access attempts
   - Verify no unknown forks exist

## Questions?

If you're unsure which option to choose, **make the repo private**. It's the only truly safe option for self-hosted runners.
