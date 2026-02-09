# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

POPS (Personal Operations System) is a self-hosted financial tracking and automation platform. Notion is the **source of truth** for all data. Self-hosted services on an N95 mini PC provide sync, analytics, dashboards, and AI-powered automation. Cloudflare Tunnel exposes services with zero port forwarding.

The repo was reset in Feb 2026. Phase 0 (data import) is complete. Phase 1 (Foundation) is next.

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
- **Properties:** Item Name (title), Brand/Manufacturer, Model, ID, Room, Location, Type, Condition, In-use, Deductible, Purchase Date, Warranty Expires, Est. Replacement Value, Est. Resale Value
- **Missing:** Relations to Balance Sheet and Entities, receipt attachment

### Budget (To Be Created — Phase 1)
- Category, Period, Amount, Active

### Wish List (To Be Created — Phase 1)
- Item, Target Amount, Saved, Priority tier (Needing / Soon / One Day / Dreaming)

## Existing Import Scripts

Located in `~/Downloads/transactions/` (not in this repo). These will be migrated into the repo during Phase 1.

| Script | Purpose |
|---|---|
| `import_anz.js` | ANZ CSV import with date+amount deduplication |
| `import_amex.js` | Amex CSV import with multiline field parser |
| `extract_personal_accounts.js` | Up Bank API batch extraction |
| `match_transfers.js` | Link inter-account transfer pairs |
| `match_novated.js` | Link novated lease reimbursements |
| `create_entities.js` | Batch create entities in Notion |
| `regenerate_entity_lookup.js` | Rebuild entity name → URL mapping |
| `audit_notion.js` | Database statistics and audit |

### Entity Matching Strategy (all import scripts)
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
| 1 — Foundation | Mar 2026 | Not Started |
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
