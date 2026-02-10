# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

POPS (Personal Operations System) is a self-hosted financial tracking and automation platform. Notion is the **source of truth** for all data. Self-hosted services on an N95 mini PC provide sync, analytics, dashboards, and AI-powered automation. Cloudflare Tunnel exposes services with zero port forwarding.

Phase 0 (data import) is complete. Phase 1 (Foundation) targets March 2026.

## Commands

### Services (each has its own package.json)
```bash
cd apps/notion-sync && yarn install && yarn dev        # Run sync locally
cd apps/finance-api && yarn install && yarn dev        # API with watch mode
cd apps/pops-pwa && yarn install && yarn dev           # Vite dev server

# Typecheck a service
cd apps/<service> && yarn typecheck

# Run tests
cd apps/<service> && yarn test                 # single run
cd apps/<service> && yarn test:watch           # watch mode
```

### Tools (import scripts)
```bash
cd packages/import-tools && yarn install

yarn import:anz --csv path/to/file.csv --execute           # ANZ import
yarn import:amex --csv path/to/file.csv --execute          # Amex import
yarn import:ing --csv path/to/file.csv --execute           # ING import
yarn import:up --since 2026-01-01 --execute                # Up Bank batch
yarn match:transfers --execute                              # Link transfer pairs
yarn match:novated --execute                                # Link novated pairs
yarn entities:create --execute                              # Batch create entities
yarn entities:lookup                                        # Rebuild entity lookup
yarn audit                                                  # DB statistics
```
Omit `--execute` for dry-run mode (no writes to Notion).

### Git Worktrees
```bash
# Create a new worktree (branches off main, copies files)
worktree-branch <branch-name>

# With dependency installation (slower, for manual use)
worktree-branch <branch-name> --install-deps

# The worktree is created at ../<branch-name> relative to the repo root
# e.g. from /Volumes/knox/helix/dev/pops → /Volumes/knox/helix/dev/<branch-name>

# Clean up when done
git worktree remove ../<branch-name> && git branch -d <branch-name>
```

### Docker
```bash
docker compose -f infra/docker-compose.yml build           # Build all custom images
docker compose -f infra/docker-compose.yml up -d           # Start all services
docker compose -f infra/docker-compose.yml --profile tools run --rm tools src/import-anz.ts /data/imports/anz.csv
docker compose -f infra/docker-compose.yml config          # Validate compose file
```

### Ansible
```bash
# All ansible commands must run from the infra/ansible/ directory due to relative roles_path
cd infra/ansible

# Provision fresh N95 (full run)
ansible-playbook playbooks/site.yml

# Deploy/update services only (skip OS hardening)
ansible-playbook playbooks/deploy.yml

# Syntax check
ansible-playbook playbooks/site.yml --syntax-check

# Encrypt vault file (path relative to infra/ansible/)
ansible-vault encrypt inventory/group_vars/pops_servers/vault.yml
```

## Repo Structure

```
apps/
├── notion-sync/          # Backend: Notion → SQLite sync
├── finance-api/          # Backend: tRPC API
├── pops-pwa/            # Frontend: React PWA
└── moltbot/             # Bot: Telegram assistant

packages/
├── db-types/            # Shared: Database types (in workspace)
└── import-tools/        # Shared: Import utilities (standalone, not in workspace)

infra/
├── ansible/             # Infrastructure as code
└── docker-compose.yml   # Compose configs
```

- `apps/notion-sync/` — Notion → SQLite mirror (runs via systemd timer, not always-on)
- `apps/finance-api/` — Express REST API over SQLite (bridges frontend/backend networks)
- `apps/pops-pwa/` — React PWA served via nginx (Phase 4 stub)
- `apps/moltbot/` — Config + custom finance skill for Moltbot (no Dockerfile, uses upstream image)
- `packages/import-tools/` — Import scripts (on-demand, run via `--profile tools` or locally)
- `packages/db-types/` — Shared TypeScript types for database schema
- `infra/docker-compose.yml` — Local dev compose; Ansible templates the production version
- `infra/ansible/` — Ansible playbooks + roles for provisioning the N95 mini PC

### Docker Networks
- `pops-frontend` — cloudflared, pops-pwa, metabase, finance-api
- `pops-backend` — finance-api, notion-sync, moltbot, tools (SQLite access)
- `pops-documents` — cloudflared, paperless-ngx, paperless-redis (isolated)

finance-api bridges frontend ↔ backend. cloudflared bridges frontend ↔ documents.

### Secrets
Production: Ansible Vault → `/opt/pops/secrets/` files → Docker Compose file-based secrets → `/run/secrets/` in containers.
Local dev: `.env` file (copy from `.env.example`), read via `process.env`.

## Architecture

```
Interfaces: iPhone (PWA) | Telegram (Moltbot) | Web (Metabase)
    │
    Cloudflare Tunnel + Cloudflare Access (Zero Trust)
    │
N95 Mini PC (Docker Compose):
    notion-sync ── Notion → SQLite mirror (cron 15min)
    finance-api ── Node.js REST over SQLite
    metabase ───── Dashboards & analytics
    moltbot ────── AI assistant (Telegram + finance plugin)
    paperless-ngx  Receipt archive + OCR
    pops-pwa ───── React PWA
    │
Data Layer:
    Notion (SoT) ──sync──▶ SQLite mirror (fast queries)
    Claude Haiku API (categorization, NL queries)
    │
Bank Feeds:
    Up API (webhooks) | ANZ CSV | Amex CSV | ING CSV
    Import scripts → rule-based matching → AI fallback → cache
```

### Data Flow

1. Bank data arrives (Up webhook or CSV download)
2. Import script parses, normalizes, cleans
3. Entity matching: aliases → exact → prefix → contains → AI fallback (cached)
4. Deduplication: date + amount count-based against existing Notion records
5. Write to Notion Balance Sheet (3 concurrent, 400ms delay for rate limits)
6. notion-sync mirrors Notion → SQLite every 15 minutes (incremental by `last_edited_time`)

## Tech Stack

- **Runtime:** Node.js
- **Database:** SQLite (mirror), Notion (source of truth)
- **Frontend:** React PWA
- **Dashboards:** Metabase (self-hosted, Docker)
- **AI:** Claude Haiku API (~$1-5/month)
- **Infra:** Docker Compose, Cloudflare Tunnel, Cloudflare Access
- **OCR:** Paperless-ngx
- **Chat:** Moltbot (Telegram)
- **Backup:** Backblaze B2 via rclone (encrypted)

## Notion Databases

### Balance Sheet
- **ID:** `9ad27001-d723-4a3f-8b3a-cf19cf715eec`
- **Records:** 15,000+ transactions across 11 accounts
- **Properties:** Description (title), Account (select), Amount (number), Date (date), Type (select), Category (multi_select), Entity (relation → Entities), Location (select), Country (select), Online (checkbox), Novated Lease (checkbox), Tax Return (checkbox), Related Transaction (relation)

### Entities
- **ID:** `3062f475-7765-406e-bde5-117f3e0a473f`
- **Records:** 940+ merchants/payees
- **Properties:** Name (title)

### Home Inventory
- **ID:** `542bb48c-740c-4848-93ad-eb91c86a612e`
- **Data source:** `collection://7784d712-0114-4371-90c1-cb15ea003fe2`
- **Properties:** Item Name (title), Brand/Manufacturer, Model, ID, Room, Location, Type, Condition, In-use, Deductible, Purchase Date, Warranty Expires, Est. Replacement Value, Est. Resale Value, Purchase Transaction (relation → Balance Sheet), Purchased From (relation → Entities)
- **Missing:** Receipt attachment

### Budget
- **ID:** `1a640f45-3d91-80e8-9a88-c94dc05fba23`
- **Properties:** Category (title), Period (select), Amount (number), Active (checkbox), Notes (rich_text)

### Wish List
- **ID:** `1a640f45-3d91-808a-a84b-d79acbe56acb`
- **Properties:** Item (title), Target Amount (number), Saved (number), Priority (select: Needing/Soon/One Day/Dreaming), URL (url), Notes (rich_text)

## Import Tools

Stubs in `tools/src/`. Original implementations in `~/Downloads/transactions/` need migration.
Shared logic lives in `tools/src/lib/` — entity matcher, deduplicator, CSV parser, AI categorizer, Notion client.

### Entity Matching Strategy (tools/src/lib/entity-matcher.ts)
1. Manual aliases — hardcoded map of bank descriptions to entity names (per-bank)
2. Exact match — case-insensitive against `entity_lookup.json`
3. Prefix match — description starts with entity name (longest wins)
4. Contains match — entity name found anywhere in description (min 4 chars, longest wins)
5. Punctuation stripping — removes apostrophes for matching

Hit rate: ~95-100% with aliases. AI fallback handles the rest and caches results to `ai_entity_cache.json`.

## Security Rules

- **Never read `.env` contents** — reference file paths only, never inline token values
- **Never commit secrets** — `.env`, `*.csv`, `entity_lookup.json`, `.claude/`, `*.jsonl` must be in `.gitignore`
- **Docker secrets** for all API tokens in production (not env vars in compose files)
- **Parameterized queries only** — no string interpolation into SQL
- **Cloudflare Access** in front of all exposed services (except Up webhook endpoint)
- **Up webhook signature verification** — validate `X-Up-Authenticity-Signature`, then re-fetch transaction from Up API
- **Moltbot user whitelist** — restrict to owner's Telegram user ID only
- **Finance plugin is read-only** — no write/delete against SQLite or Notion
- **Strip PII from AI prompts** — only send merchant descriptions to Claude API, no account/card numbers
- **No sensitive data in PWA service worker cache** — cache static assets only

## Phases

| Phase | Target | Status |
|---|---|---|
| 0 — Data Import | Feb 2026 | **Done** |
| 1 — Foundation | Mar 2026 | **In Progress** |
| 2 — Intelligence | Apr 2026 | Not Started |
| 3 — Receipts & Inventory | May 2026 | Not Started |
| 4 — Mobile | Jun 2026 | Not Started |
| 5 — Polish | Jul+ 2026 | Not Started |

## Notion Project

Full project documentation lives in Notion under **POPS - Personal Ops** (`30240f45-3d91-8017-b119-fe2ecd847f5f`). Key pages:
- Architecture: `30240f45-3d91-81ba-aee5-e2cf0aa798c7`
- Current State: `30240f45-3d91-81fa-9d75-e98050cc5e39`
- Research & Decisions: `30240f45-3d91-8144-a9f8-cd9cb2f1ac0c`
- Security Audit: `30240f45-3d91-81ea-a3ce-f38df117e7eb`
- Phase 1 — Foundation: `30240f45-3d91-81e5-bfde-f14589113d62`
- POPS Tracker (database): `a36c7a6b-be2f-4f94-8da5-c4c5ad9882b5`

## Development Workflow

### Process

1. **Create branch:** `git checkout -b <branch-name>` from main
2. **Implement:** Make changes, run tests, typecheck
3. **Commit & push:** Commit changes and push to remote
4. **Create PR:** Open pull request for review
5. **Cleanup after merge:** `git branch -d <branch-name>`

### Branch Naming

- `feature/<name>` — new functionality
- `fix/<name>` — bug fixes
- `refactor/<name>` — code restructuring
- `docs/<name>` — documentation changes

### Rules

- **Never commit directly to `main`** — all changes go through PRs
- Run tests and typecheck before committing
- Each branch = one focused task = one PR
- Keep commits atomic and well-described

## Rules and Standards

- Keep files small, modular and reusable.
- Aim for small, well named and well structured code.
- REuse reuse reuse. DRY principles!