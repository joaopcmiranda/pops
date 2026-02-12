# Notion Documentation Updates Required

This document outlines updates needed for POPS Notion project pages to reflect the new database management capabilities.

## Pages to Update

### 1. Current State Page (`30240f45-3d91-81fa-9d75-e98050cc5e39`)

**Add Section: Database Management**

Database management tools have been added for streamlined development and E2E testing workflows.

**Commands:**
- `mise db:init` - Initialize empty database with schema
- `mise db:clear` - Clear all data (preserves schema)
- `mise db:seed` - Seed with comprehensive test data (44 records)
- `mise db:pull` - Pull fresh from Notion (full sync, source of truth)

**Workflows:**

*Local Development:*
```
mise db:init → mise db:seed → mise dev:api + mise dev:pwa
```

*Reset to Production:*
```
mise db:pull (full sync from Notion)
```

*E2E Testing:*
```
mise db:seed → run tests → mise db:seed (reset)
```

### 2. Phase 1 — Foundation Page (`30240f45-3d91-81e5-bfde-f14589113d62`)

**Update Status:**

Add to completed items:
- ✅ Database management scripts with test data seeding
- ✅ `db:clear`, `db:seed`, `db:pull` commands via mise
- ✅ Comprehensive test data (10 entities, 16 transactions, 8 budgets, 5 inventory, 5 wish list)

### 3. Architecture Page (`30240f45-3d91-81ba-aee5-e2cf0aa798c7`)

**Update: Data Flow Section**

Add to data flow:
```
Development Mode:
  Test Data (db:seed) → SQLite → finance-api → PWA

Production Mode:
  Notion (SoT) → db:pull → SQLite → finance-api → PWA
```

### 4. Research & Decisions Page (`30240f45-3d91-8144-a9f8-cd9cb2f1ac0c`)

**Add Decision Record:**

**Decision:** Database Management Strategy
- **Date:** 2026-02-12
- **Status:** Implemented
- **Context:** Need to manage database state for development and testing
- **Decision:**
  - Use `db:seed` for local development with realistic test data
  - Use `db:pull` for syncing production data from Notion
  - Use `db:clear` for manual data reset
  - Notion remains source of truth, local SQLite is always replaceable
- **Consequences:**
  - Faster development iteration with known test data
  - E2E tests can run against consistent data
  - Easy reset to production state when needed
  - No risk of data loss (Notion is SoT)

## Test Data Details

Update any documentation referencing test data or development setup:

**Entities (10):**
- Supermarkets: Woolworths, Coles
- Subscriptions: Netflix, Spotify
- Fuel: Shell
- Retail: Amazon AU, JB Hi-Fi, Bunnings
- Technology: Apple
- Income: Employer

**Transactions (16):**
- 3 salary payments (income)
- 6 grocery purchases
- 2 subscriptions
- 2 fuel purchases
- 3 shopping transactions
- 2 linked transfers (demonstrates transfer pairs)
- Mix of online/in-store, different accounts, categories

**Budgets (8):**
- Monthly: Groceries ($800), Transport ($300), Entertainment ($150), Shopping ($400), Home & Garden ($200), Utilities ($250), Subscriptions ($100)
- Yearly: Holiday Fund ($5000)

**Inventory (5):**
- MacBook Pro M3 Max
- Sony WH-1000XM5 Headphones (with transaction link)
- Samsung 65" QLED TV
- Dyson V15 Vacuum
- Breville Barista Express

**Wish List (5):**
- Gaming PC ($3500 target, $1200 saved, "Soon")
- Standing Desk ($800 target, $450 saved, "Needing")
- Japan Trip ($8000 target, $2100 saved, "One Day")
- Herman Miller Chair ($2200 target, $0 saved, "Dreaming")
- New Camera ($4500 target, $800 saved, "One Day")

## Commands Reference

Update command references in any Notion pages to include:

```bash
# Database Management
mise db:init          # Initialize empty database
mise db:clear         # Clear all data
mise db:seed          # Seed test data
mise db:pull          # Pull from Notion

# Development
mise dev              # All dev servers
mise dev:api          # API only
mise dev:pwa          # PWA only

# Quality
mise test             # Run tests
mise typecheck        # Type check
mise lint             # Lint code
```

---

**Note:** After updating Notion pages, delete this file as it's only needed for documentation sync purposes.
