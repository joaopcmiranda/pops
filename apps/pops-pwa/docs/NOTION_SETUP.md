# Notion Database Setup Guide

## Required Properties for Balance Sheet Database

### Core Transaction Properties
1. **Description** (Title) - Transaction description
2. **Account** (Select) - Bank account name
3. **Amount** (Number) - Transaction amount
4. **Date** (Date) - Transaction date
5. **Type** (Select) - Transaction type (Income, Expense, Transfer)
6. **Category** (Multi-select) - Transaction categories
7. **Entity** (Relation) - Link to Entities database
8. **Location** (Select) - Transaction location
9. **Country** (Select) - Transaction country
10. **Online** (Checkbox) - Online transaction flag
11. **Novated Lease** (Checkbox) - Novated lease flag
12. **Tax Return** (Checkbox) - Tax return flag
13. **Related Transaction** (Relation) - Link to related transaction

### Import-Specific Properties (Required for imports)
14. **Checksum** (Rich text) - Used for deduplication
15. **Raw Row** (Rich text) - Original CSV data for audit trail

## Setup Instructions

### 1. Add Missing Properties

If you're missing the import-specific properties:

1. Open your Balance Sheet database in Notion
2. Click on any column header → "+" to add a new property
3. Add **Checksum**:
   - Name: `Checksum`
   - Type: `Rich text`
   - Purpose: Stores SHA-256 hash for duplicate detection
4. Add **Raw Row**:
   - Name: `Raw Row`
   - Type: `Rich text`
   - Purpose: Stores original CSV row for audit trail

### 2. Verify Database Sharing

Ensure your integration has access:

1. Open Balance Sheet database
2. Click "..." (top right) → "Connections"
3. Add your Notion integration
4. Repeat for Entities database

### 3. Environment Variables

Ensure these are set in your `.env`:

```bash
NOTION_API_TOKEN=secret_xxx
NOTION_BALANCE_SHEET_ID=your-database-id
NOTION_ENTITIES_DB_ID=your-entities-id
NOTION_HOME_INVENTORY_ID=your-inventory-id
NOTION_BUDGET_ID=your-budget-id
NOTION_WISH_LIST_ID=your-wishlist-id
```

## Existing Data

**Important:** Existing transactions won't have `Checksum` or `Raw Row` values.

**Implications:**
- Deduplication won't work for existing records
- New imports may create duplicates of existing transactions
- After import, new transactions will have checksums

**Solutions:**
1. Accept duplicates for initial import, then manually clean up
2. Or: Run a one-time script to generate checksums for existing records (not yet implemented)
3. Or: Start fresh with a new database

## Verification

Run the database verification script:

```bash
# Coming soon
mise db:verify
```

This will check:
- ✓ Database IDs are valid
- ✓ Required properties exist
- ✓ Integration has access
- ✓ Property types are correct
