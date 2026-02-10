# POPS — Personal Operations System

A unified platform for financial tracking, asset management, budgeting, AI-powered automation, and reporting. Built on Notion as the source of truth, with self-hosted services for intelligence, dashboards, and proactive assistance.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      INTERFACES                         │
│  iPhone (PWA)  │  Telegram (Moltbot)  │  Web (Metabase) │
└────────────────────────┬────────────────────────────────┘
                         │
                 Cloudflare Tunnel
                         │
┌────────────────────────┴────────────────────────────────┐
│                 N95 MINI PC (Docker)                     │
│                                                         │
│  notion-sync ─── Notion → SQLite mirror (cron 15min)    │
│  finance-api ─── Node.js REST over SQLite               │
│  metabase ────── Dashboards & analytics                 │
│  moltbot ─────── AI assistant (Telegram + finance)      │
│  paperless-ngx ─ Receipt archive + OCR                  │
│  pops-pwa ────── React PWA (budget, wishlist, txns)     │
└─────────────────────────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────┐
│                      DATA LAYER                         │
│                                                         │
│  Notion (SoT)           │  Claude Haiku API             │
│  ├─ Balance Sheet       │  (categorization, NL queries, │
│  ├─ Entities            │   AI fallback) ~$1-5/month    │
│  ├─ Home Inventory      │                               │
│  ├─ Budget              │  SQLite mirror                │
│  └─ Wish List           │  (fast queries, dashboards)   │
└─────────────────────────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────┐
│                     BANK FEEDS                          │
│  Up API (webhooks) │ ANZ CSV │ Amex CSV │ ING CSV       │
│  Import scripts (Node.js) + Claude Haiku fallback       │
│  Rule-based matching → AI fallback → cache new mappings │
└─────────────────────────────────────────────────────────┘
```

### Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Source of truth | Notion | Already embedded in life OS |
| Analytics DB | SQLite mirror | Notion API too slow for aggregation |
| AI provider | Claude Haiku API | Cents/month for this workload |
| Chat interface | Telegram (Moltbot) | Cross-platform, pragmatic |
| Dashboards | Metabase (self-hosted) | Open-source, Docker, SQLite-compatible |
| Receipt storage | Paperless-ngx | Mature, self-hosted, OCR built-in |
| Mobile app | PWA | No App Store, installs to home screen |

## Phases

| Phase | Target | Description | Status |
|---|---|---|---|
| 0 — Data Import | Feb 2026 | All bank accounts imported to Notion Balance Sheet | **Done** |
| 1 — Foundation | Mar 2026 | Infrastructure, sync layer, AI imports, new Notion DBs | **In Progress** |
| 2 — Intelligence | Apr 2026 | Moltbot, dashboards, proactive alerts | Not Started |
| 3 — Receipts & Inventory | May 2026 | Document management, receipt OCR, inventory linking | Not Started |
| 4 — Mobile | Jun 2026 | PWA, quick-add, push notifications | Not Started |
| 5 — Polish | Jul+ 2026 | Net worth, investments, super, reporting | Not Started |

## Goals

1. **Automated data pipeline** — Bank transactions flow into Notion with minimal manual intervention. AI handles categorization, entity matching, and deduplication.
2. **Proactive financial assistant** — Moltbot monitors spending, sends alerts via Telegram, answers natural language queries.
3. **Budgeting system** — Envelope-style budgets with real-time tracking per category.
4. **Wish list & planned purchases** — Tiered purchase planning with saving progress tracking.
5. **Receipt & asset lifecycle** — Purchases get ID'd, labeled, receipt archived, linked to transaction and Home Inventory.
6. **Accountant-ready reporting** — One-command FY tax reports with deductible items, categorized expenses, income summary.
7. **Net worth visibility** — Dashboard combining account balances, asset values, super, and liabilities.
8. **Mobile access** — PWA for on-the-go budget checks, quick expense entry, receipt capture.

## Infrastructure

### N95 Mini PC (POPS Server)
- **OS:** Ubuntu 24.04 (Docker Compose, provisioned via Ansible)
- **Services:** notion-sync, finance-api, metabase, moltbot, paperless-ngx, pops-pwa
- **Exposure:** Cloudflare Tunnel (free, zero port forwarding)
- **URLs:** `pops.jmiranda.dev` (PWA), `pops-api.jmiranda.dev` (API), `pops-metabase.jmiranda.dev`, `pops-paperless.jmiranda.dev`

### External Services
- **Cloudflare Tunnel** — Secure exposure, free
- **Claude Haiku API** — Transaction categorization, NL queries (~$1-5/month)
- **Notion** — Source of truth (existing plan)
- **Up Bank API** — Real-time transaction webhooks (free)
- **Telegram** — Moltbot messaging interface (free)

## Tech Stack

- **Runtime:** Node.js
- **Database:** SQLite (mirror), Notion (source of truth)
- **Frontend:** React PWA
- **Dashboards:** Metabase
- **AI:** Claude Haiku API
- **Infra:** Docker Compose, Cloudflare Tunnel
- **OCR:** Paperless-ngx
- **Chat:** Moltbot (Telegram)

## Active Bank Accounts

| Account | Type | Data Source | Automation |
|---|---|---|---|
| ANZ Everyday | Checking | CSV export | Manual download |
| ANZ Frequent Flyer Black | Credit Card | CSV export | Manual download |
| Amex | Credit Card | CSV export | Manual download |
| Up Checking / Piggy | Checking + Savings | Up Bank API | Fully automatable (webhooks) |
| ING Everyday / Loan | Checking + Personal Loan | CSV export | Manual download |

## Development Workflow

### CI/CD Pipeline

All code changes are validated automatically via GitHub Actions before merge:

#### Ansible CI
- **YAML Linting** - Validates YAML syntax and formatting (`yamllint`)
- **Ansible Linting** - Enforces best practices (`ansible-lint` production profile)
- **Syntax Checking** - Validates playbook syntax (all playbooks in matrix)
- **Security Scanning** - Checks for hardcoded secrets and vault encryption
- **Best Practices** - Validates FQCN usage, become patterns, minimal shell usage

See [ansible/README.md](ansible/README.md) for detailed Ansible documentation.

### Pre-commit Hooks

Install pre-commit hooks to run quality checks locally before committing:

```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Run manually on all files
pre-commit run --all-files
```

Hooks include:
- `yamllint` - YAML syntax and formatting
- `ansible-lint` - Ansible best practices
- `detect-secrets` - Hardcoded credentials detection
- `check-yaml` - YAML syntax validation
- `trailing-whitespace` - Trailing whitespace removal
- `end-of-file-fixer` - Ensure files end with newline
- `check-added-large-files` - Prevent large file commits

### Local Development Setup

```bash
# Install Ansible tools
pip install -r ansible/requirements.txt

# Install Ansible Galaxy collections
ansible-galaxy collection install community.general
ansible-galaxy collection install community.docker

# Run Ansible linting locally
yamllint ansible/
ansible-lint ansible/

# Syntax check playbooks
ansible-playbook --syntax-check ansible/playbooks/site.yml
```
