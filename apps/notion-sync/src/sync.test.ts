import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import BetterSqlite3 from 'better-sqlite3';
import type Database from 'better-sqlite3';
import { initSchema } from './schema.js';
import { mapTransaction, mapEntity, mapInventoryItem, mapBudget, mapWishListItem } from './sync.js';
import { upsertTransactions } from './databases/transactions/index.js';
import { upsertEntities } from './databases/entities/index.js';
import { upsertInventory } from './databases/inventory/index.js';
import { upsertBudgets } from './databases/budgets/index.js';
import { upsertWishList } from './databases/wish-list/index.js';
import { saveCursor, loadCursor } from './cursor.js';
import { richText, makePage } from './test-helpers.js';

// ─── mapTransaction ──────────────────────────────────────────

describe('mapTransaction', () => {
  it('maps a fully populated Balance Sheet page', () => {
    const entityLookup = new Map([['entity-abc', 'Woolworths']]);
    const page = makePage(
      'tx-1',
      {
        Description: { type: 'title', title: richText('Weekly groceries'), id: 'p1' },
        Account: {
          type: 'select',
          select: { id: 's1', name: 'ANZ Everyday', color: 'blue' },
          id: 'p2',
        },
        Amount: { type: 'number', number: -125.5, id: 'p3' },
        Date: { type: 'date', date: { start: '2024-06-15', end: null, time_zone: null }, id: 'p4' },
        Type: { type: 'select', select: { id: 's2', name: 'Expense', color: 'red' }, id: 'p5' },
        Category: {
          type: 'multi_select',
          multi_select: [
            { id: 'ms1', name: 'Groceries', color: 'green' },
            { id: 'ms2', name: 'Food', color: 'orange' },
          ],
          id: 'p6',
        },
        Entity: { type: 'relation', relation: [{ id: 'entity-abc' }], id: 'p7' },
        Location: {
          type: 'select',
          select: { id: 's8', name: 'Woolworths Bondi', color: 'gray' },
          id: 'p8',
        },
        Country: {
          type: 'select',
          select: { id: 's3', name: 'Australia', color: 'green' },
          id: 'p9',
        },
        Online: { type: 'checkbox', checkbox: false, id: 'p10' },
        'Novated Lease': { type: 'checkbox', checkbox: false, id: 'p11' },
        'Tax Return': { type: 'checkbox', checkbox: true, id: 'p12' },
        'Related Transaction': { type: 'relation', relation: [{ id: 'tx-related' }], id: 'p13' },
        Notes: { type: 'rich_text', rich_text: richText('For the week'), id: 'p14' },
      },
      '2024-06-15T12:00:00.000Z'
    );

    const row = mapTransaction(page, entityLookup);

    expect(row).toEqual({
      notionId: 'tx-1',
      description: 'Weekly groceries',
      account: 'ANZ Everyday',
      amount: -125.5,
      date: '2024-06-15',
      type: 'Expense',
      categories: JSON.stringify(['Groceries', 'Food']),
      entityId: 'entity-abc',
      entityName: 'Woolworths',
      location: 'Woolworths Bondi',
      country: 'Australia',
      online: false,
      novatedLease: false,
      taxReturn: true,
      relatedTransactionId: 'tx-related',
      notes: 'For the week',
      lastEditedTime: '2024-06-15T12:00:00.000Z',
    });
  });

  it('handles missing optional fields gracefully', () => {
    const page = makePage(
      'tx-2',
      {
        Description: { type: 'title', title: richText('ATM withdrawal'), id: 'p1' },
        Account: {
          type: 'select',
          select: { id: 's1', name: 'ANZ Everyday', color: 'blue' },
          id: 'p2',
        },
        Amount: { type: 'number', number: -100, id: 'p3' },
        Date: { type: 'date', date: { start: '2024-06-16', end: null, time_zone: null }, id: 'p4' },
        Type: { type: 'select', select: null, id: 'p5' },
        Category: { type: 'multi_select', multi_select: [], id: 'p6' },
        Entity: { type: 'relation', relation: [], id: 'p7' },
        Location: { type: 'select', select: null, id: 'p8' },
        Country: { type: 'select', select: null, id: 'p9' },
        Online: { type: 'checkbox', checkbox: false, id: 'p10' },
        'Novated Lease': { type: 'checkbox', checkbox: false, id: 'p11' },
        'Tax Return': { type: 'checkbox', checkbox: false, id: 'p12' },
        'Related Transaction': { type: 'relation', relation: [], id: 'p13' },
        Notes: { type: 'rich_text', rich_text: [], id: 'p14' },
      },
      '2024-06-16T08:00:00.000Z'
    );

    const row = mapTransaction(page, new Map());

    expect(row.entityId).toBeNull();
    expect(row.entityName).toBeNull();
    expect(row.location).toBeNull();
    expect(row.country).toBeNull();
    expect(row.type).toBe('');
    expect(row.categories).toBe('[]');
    expect(row.relatedTransactionId).toBeNull();
    expect(row.notes).toBeNull();
  });

  it('returns null entityName when entity ID is not in lookup', () => {
    const page = makePage(
      'tx-3',
      {
        Description: { type: 'title', title: richText('Unknown vendor'), id: 'p1' },
        Account: { type: 'select', select: { id: 's1', name: 'Up', color: 'orange' }, id: 'p2' },
        Amount: { type: 'number', number: -50, id: 'p3' },
        Date: { type: 'date', date: { start: '2024-07-01', end: null, time_zone: null }, id: 'p4' },
        Entity: { type: 'relation', relation: [{ id: 'entity-unknown' }], id: 'p7' },
      },
      '2024-07-01T00:00:00.000Z'
    );

    const row = mapTransaction(page, new Map());

    expect(row.entityId).toBe('entity-unknown');
    expect(row.entityName).toBeNull();
  });
});

// ─── mapEntity ──────────────────────────────────────────────

describe('mapEntity', () => {
  it('maps a fully populated Entities page', () => {
    const page = makePage(
      'ent-1',
      {
        Name: { type: 'title', title: richText('Woolworths'), id: 'p1' },
        Type: { type: 'select', select: { id: 's1', name: 'Retailer', color: 'green' }, id: 'p2' },
        ABN: { type: 'rich_text', rich_text: richText('88 000 014 675'), id: 'p3' },
        Aliases: { type: 'rich_text', rich_text: richText('Woolies, WOW'), id: 'p4' },
        'Default Transaction Type': {
          type: 'select',
          select: { id: 's2', name: 'Expense', color: 'red' },
          id: 'p5',
        },
        'Default Category': {
          type: 'multi_select',
          multi_select: [{ id: 'ms1', name: 'Groceries', color: 'green' }],
          id: 'p6',
        },
        Notes: { type: 'rich_text', rich_text: richText('Supermarket chain'), id: 'p7' },
      },
      '2024-05-01T00:00:00.000Z'
    );

    const row = mapEntity(page);

    expect(row).toEqual({
      notionId: 'ent-1',
      name: 'Woolworths',
      type: 'Retailer',
      abn: '88 000 014 675',
      aliases: 'Woolies, WOW',
      defaultTransactionType: 'Expense',
      defaultCategory: JSON.stringify(['Groceries']),
      notes: 'Supermarket chain',
      lastEditedTime: '2024-05-01T00:00:00.000Z',
    });
  });

  it('handles entity with only name', () => {
    const page = makePage(
      'ent-2',
      {
        Name: { type: 'title', title: richText('Cash'), id: 'p1' },
        Type: { type: 'select', select: null, id: 'p2' },
        ABN: { type: 'rich_text', rich_text: [], id: 'p3' },
        Aliases: { type: 'rich_text', rich_text: [], id: 'p4' },
        'Default Transaction Type': { type: 'select', select: null, id: 'p5' },
        'Default Category': { type: 'multi_select', multi_select: [], id: 'p6' },
        Notes: { type: 'rich_text', rich_text: [], id: 'p7' },
      },
      '2024-05-02T00:00:00.000Z'
    );

    const row = mapEntity(page);

    expect(row.name).toBe('Cash');
    expect(row.type).toBeNull();
    expect(row.abn).toBeNull();
    expect(row.aliases).toBeNull();
    expect(row.defaultTransactionType).toBeNull();
    expect(row.defaultCategory).toBeNull();
    expect(row.notes).toBeNull();
  });
});

// ─── mapInventoryItem ──────────────────────────────────────

describe('mapInventoryItem', () => {
  it('maps a fully populated Home Inventory page', () => {
    const entityLookup = new Map([['entity-jbhifi', 'JB Hi-Fi']]);
    const page = makePage(
      'inv-1',
      {
        'Item Name': { type: 'title', title: richText('MacBook Pro 14"'), id: 'p1' },
        'Brand/Manufacturer': { type: 'rich_text', rich_text: richText('Apple'), id: 'p2' },
        Model: { type: 'rich_text', rich_text: richText('M3 Pro'), id: 'p3' },
        ID: { type: 'rich_text', rich_text: richText('SN-12345'), id: 'p4' },
        Room: { type: 'select', select: { id: 's1', name: 'Office', color: 'blue' }, id: 'p5' },
        Location: { type: 'select', select: { id: 's2', name: 'Desk', color: 'gray' }, id: 'p6' },
        Type: {
          type: 'select',
          select: { id: 's3', name: 'Electronics', color: 'purple' },
          id: 'p7',
        },
        Condition: {
          type: 'select',
          select: { id: 's4', name: 'Excellent', color: 'green' },
          id: 'p8',
        },
        'In-use': { type: 'checkbox', checkbox: true, id: 'p9' },
        Deductible: { type: 'checkbox', checkbox: true, id: 'p10' },
        'Purchase Date': {
          type: 'date',
          date: { start: '2024-01-15', end: null, time_zone: null },
          id: 'p11',
        },
        'Warranty Expires': {
          type: 'date',
          date: { start: '2026-01-15', end: null, time_zone: null },
          id: 'p12',
        },
        'Est. Replacement Value': { type: 'number', number: 3499, id: 'p13' },
        'Est. Resale Value': { type: 'number', number: 2200, id: 'p14' },
        'Purchase Transaction': { type: 'relation', relation: [{ id: 'tx-purchase' }], id: 'p15' },
        'Purchased From': { type: 'relation', relation: [{ id: 'entity-jbhifi' }], id: 'p16' },
      },
      '2024-03-01T00:00:00.000Z'
    );

    const row = mapInventoryItem(page, entityLookup);

    expect(row).toEqual({
      notionId: 'inv-1',
      itemName: 'MacBook Pro 14"',
      brand: 'Apple',
      model: 'M3 Pro',
      itemId: 'SN-12345',
      room: 'Office',
      location: 'Desk',
      type: 'Electronics',
      condition: 'Excellent',
      inUse: true,
      deductible: true,
      purchaseDate: '2024-01-15',
      warrantyExpires: '2026-01-15',
      replacementValue: 3499,
      resaleValue: 2200,
      purchaseTransactionId: 'tx-purchase',
      purchasedFromId: 'entity-jbhifi',
      purchasedFromName: 'JB Hi-Fi',
      lastEditedTime: '2024-03-01T00:00:00.000Z',
    });
  });

  it('handles item with minimal fields', () => {
    const page = makePage(
      'inv-2',
      {
        'Item Name': { type: 'title', title: richText('Random cable'), id: 'p1' },
        'Brand/Manufacturer': { type: 'rich_text', rich_text: [], id: 'p2' },
        Model: { type: 'rich_text', rich_text: [], id: 'p3' },
        ID: { type: 'rich_text', rich_text: [], id: 'p4' },
        Room: { type: 'select', select: null, id: 'p5' },
        Location: { type: 'select', select: null, id: 'p6' },
        Type: { type: 'select', select: null, id: 'p7' },
        Condition: { type: 'select', select: null, id: 'p8' },
        'In-use': { type: 'checkbox', checkbox: false, id: 'p9' },
        Deductible: { type: 'checkbox', checkbox: false, id: 'p10' },
        'Purchase Date': { type: 'date', date: null, id: 'p11' },
        'Warranty Expires': { type: 'date', date: null, id: 'p12' },
        'Est. Replacement Value': { type: 'number', number: null, id: 'p13' },
        'Est. Resale Value': { type: 'number', number: null, id: 'p14' },
        'Purchase Transaction': { type: 'relation', relation: [], id: 'p15' },
        'Purchased From': { type: 'relation', relation: [], id: 'p16' },
      },
      '2024-03-02T00:00:00.000Z'
    );

    const row = mapInventoryItem(page, new Map());

    expect(row.itemName).toBe('Random cable');
    expect(row.brand).toBeNull();
    expect(row.model).toBeNull();
    expect(row.room).toBeNull();
    expect(row.purchaseDate).toBeNull();
    expect(row.replacementValue).toBeNull();
    expect(row.inUse).toBe(false);
    expect(row.purchaseTransactionId).toBeNull();
    expect(row.purchasedFromId).toBeNull();
    expect(row.purchasedFromName).toBeNull();
  });

  it('returns null purchasedFromName when entity not in lookup', () => {
    const page = makePage(
      'inv-3',
      {
        'Item Name': { type: 'title', title: richText('Mystery item'), id: 'p1' },
        'Purchased From': { type: 'relation', relation: [{ id: 'entity-unknown' }], id: 'p16' },
      },
      '2024-03-03T00:00:00.000Z'
    );

    const row = mapInventoryItem(page, new Map());

    expect(row.purchasedFromId).toBe('entity-unknown');
    expect(row.purchasedFromName).toBeNull();
  });
});

// ─── mapBudget ──────────────────────────────────────────────

describe('mapBudget', () => {
  it('maps a fully populated Budget page', () => {
    const page = makePage(
      'bud-1',
      {
        Category: { type: 'title', title: richText('Groceries'), id: 'p1' },
        Period: { type: 'select', select: { id: 's1', name: 'Monthly', color: 'blue' }, id: 'p2' },
        Amount: { type: 'number', number: 800, id: 'p3' },
        Active: { type: 'checkbox', checkbox: true, id: 'p4' },
        Notes: { type: 'rich_text', rich_text: richText('Family budget'), id: 'p5' },
      },
      '2024-07-01T00:00:00.000Z'
    );

    const row = mapBudget(page);

    expect(row).toEqual({
      notionId: 'bud-1',
      category: 'Groceries',
      period: 'Monthly',
      amount: 800,
      active: true,
      notes: 'Family budget',
      lastEditedTime: '2024-07-01T00:00:00.000Z',
    });
  });

  it('handles budget with minimal fields', () => {
    const page = makePage(
      'bud-2',
      {
        Category: { type: 'title', title: richText('Misc'), id: 'p1' },
        Period: { type: 'select', select: null, id: 'p2' },
        Amount: { type: 'number', number: null, id: 'p3' },
        Active: { type: 'checkbox', checkbox: false, id: 'p4' },
        Notes: { type: 'rich_text', rich_text: [], id: 'p5' },
      },
      '2024-07-02T00:00:00.000Z'
    );

    const row = mapBudget(page);

    expect(row.category).toBe('Misc');
    expect(row.period).toBeNull();
    expect(row.amount).toBeNull();
    expect(row.active).toBe(false);
    expect(row.notes).toBeNull();
  });
});

// ─── mapWishListItem ────────────────────────────────────────

describe('mapWishListItem', () => {
  it('maps a fully populated Wish List page', () => {
    const page = makePage(
      'wl-1',
      {
        Item: { type: 'title', title: richText('Standing Desk'), id: 'p1' },
        'Target Amount': { type: 'number', number: 1200, id: 'p2' },
        Saved: { type: 'number', number: 400, id: 'p3' },
        Priority: { type: 'select', select: { id: 's1', name: 'High', color: 'red' }, id: 'p4' },
        URL: { type: 'url', url: 'https://example.com/desk', id: 'p5' },
        Notes: { type: 'rich_text', rich_text: richText('Ergonomic model'), id: 'p6' },
      },
      '2024-07-01T00:00:00.000Z'
    );

    const row = mapWishListItem(page);

    expect(row).toEqual({
      notionId: 'wl-1',
      item: 'Standing Desk',
      targetAmount: 1200,
      saved: 400,
      priority: 'High',
      url: 'https://example.com/desk',
      notes: 'Ergonomic model',
      lastEditedTime: '2024-07-01T00:00:00.000Z',
    });
  });

  it('handles wish list item with minimal fields', () => {
    const page = makePage(
      'wl-2',
      {
        Item: { type: 'title', title: richText('Something nice'), id: 'p1' },
        'Target Amount': { type: 'number', number: null, id: 'p2' },
        Saved: { type: 'number', number: null, id: 'p3' },
        Priority: { type: 'select', select: null, id: 'p4' },
        URL: { type: 'url', url: null, id: 'p5' },
        Notes: { type: 'rich_text', rich_text: [], id: 'p6' },
      },
      '2024-07-02T00:00:00.000Z'
    );

    const row = mapWishListItem(page);

    expect(row.item).toBe('Something nice');
    expect(row.targetAmount).toBeNull();
    expect(row.saved).toBeNull();
    expect(row.priority).toBeNull();
    expect(row.url).toBeNull();
    expect(row.notes).toBeNull();
  });
});

// ─── SQLite round-trip ──────────────────────────────────────

describe('SQLite round-trip', () => {
  let db: Database.Database;

  beforeEach(() => {
    db = new BetterSqlite3(':memory:');
    initSchema(db);
  });

  afterEach(() => {
    db.close();
  });

  it('upserts and reads back entities with all fields', () => {
    upsertEntities(db, [
      {
        notionId: 'ent-1',
        name: 'Woolworths',
        type: 'Retailer',
        abn: '88 000 014 675',
        aliases: 'Woolies, WOW',
        defaultTransactionType: 'Expense',
        defaultCategory: JSON.stringify(['Groceries']),
        notes: 'Supermarket',
        lastEditedTime: '2024-05-01T00:00:00.000Z',
      },
    ]);

    const row = db.prepare('SELECT * FROM entities WHERE notion_id = ?').get('ent-1') as Record<
      string,
      unknown
    >;
    expect(row['name']).toBe('Woolworths');
    expect(row['type']).toBe('Retailer');
    expect(row['abn']).toBe('88 000 014 675');
    expect(row['aliases']).toBe('Woolies, WOW');
    expect(row['default_transaction_type']).toBe('Expense');
    expect(row['default_category']).toBe(JSON.stringify(['Groceries']));
    expect(row['notes']).toBe('Supermarket');
  });

  it('upserts entities and updates on conflict', () => {
    upsertEntities(db, [
      {
        notionId: 'ent-1',
        name: 'Old Name',
        type: null,
        abn: null,
        aliases: null,
        defaultTransactionType: null,
        defaultCategory: null,
        notes: null,
        lastEditedTime: '2024-01-01T00:00:00.000Z',
      },
    ]);

    upsertEntities(db, [
      {
        notionId: 'ent-1',
        name: 'New Name',
        type: 'Updated',
        abn: '12345',
        aliases: null,
        defaultTransactionType: null,
        defaultCategory: null,
        notes: null,
        lastEditedTime: '2024-06-01T00:00:00.000Z',
      },
    ]);

    const row = db.prepare('SELECT * FROM entities WHERE notion_id = ?').get('ent-1') as Record<
      string,
      unknown
    >;
    expect(row['name']).toBe('New Name');
    expect(row['type']).toBe('Updated');
    expect(row['abn']).toBe('12345');
    expect(row['last_edited_time']).toBe('2024-06-01T00:00:00.000Z');
  });

  it('upserts transactions with notes field', () => {
    upsertTransactions(db, [
      {
        notionId: 'tx-1',
        description: 'Groceries',
        account: 'ANZ',
        amount: -50,
        date: '2024-06-15',
        type: 'Expense',
        categories: JSON.stringify(['Food']),
        entityId: null,
        entityName: null,
        location: null,
        country: null,
        online: false,
        novatedLease: false,
        taxReturn: false,
        relatedTransactionId: null,
        notes: 'Weekly shop',
        lastEditedTime: '2024-06-15T00:00:00.000Z',
      },
    ]);

    const row = db.prepare('SELECT * FROM transactions WHERE notion_id = ?').get('tx-1') as Record<
      string,
      unknown
    >;
    expect(row['notes']).toBe('Weekly shop');
    expect(row['online']).toBe(0);
  });

  it('upserts inventory items with boolean conversion and relations', () => {
    upsertInventory(db, [
      {
        notionId: 'inv-1',
        itemName: 'Laptop',
        brand: 'Apple',
        model: 'M3',
        itemId: 'SN-1',
        room: 'Office',
        location: 'Desk',
        type: 'Electronics',
        condition: 'Good',
        inUse: true,
        deductible: false,
        purchaseDate: '2024-01-01',
        warrantyExpires: '2026-01-01',
        replacementValue: 3000,
        resaleValue: 2000,
        purchaseTransactionId: 'tx-abc',
        purchasedFromId: 'ent-xyz',
        purchasedFromName: 'JB Hi-Fi',
        lastEditedTime: '2024-03-01T00:00:00.000Z',
      },
    ]);

    const row = db
      .prepare('SELECT * FROM home_inventory WHERE notion_id = ?')
      .get('inv-1') as Record<string, unknown>;
    expect(row['item_name']).toBe('Laptop');
    expect(row['in_use']).toBe(1);
    expect(row['deductible']).toBe(0);
    expect(row['replacement_value']).toBe(3000);
    expect(row['purchase_transaction_id']).toBe('tx-abc');
    expect(row['purchased_from_id']).toBe('ent-xyz');
    expect(row['purchased_from_name']).toBe('JB Hi-Fi');
  });

  it('saves and loads sync cursors', () => {
    expect(loadCursor(db, 'db-1')).toBeUndefined();

    saveCursor(db, { databaseId: 'db-1', lastEditedTime: '2024-06-15T00:00:00.000Z' });
    expect(loadCursor(db, 'db-1')).toBe('2024-06-15T00:00:00.000Z');

    saveCursor(db, { databaseId: 'db-1', lastEditedTime: '2024-06-16T00:00:00.000Z' });
    expect(loadCursor(db, 'db-1')).toBe('2024-06-16T00:00:00.000Z');
  });

  it('upserts budget rows with boolean conversion', () => {
    upsertBudgets(db, [
      {
        notionId: 'bud-1',
        category: 'Groceries',
        period: 'Monthly',
        amount: 800,
        active: true,
        notes: 'Family of 2',
        lastEditedTime: '2024-07-01T00:00:00.000Z',
      },
    ]);

    const row = db.prepare('SELECT * FROM budgets WHERE notion_id = ?').get('bud-1') as Record<
      string,
      unknown
    >;
    expect(row['category']).toBe('Groceries');
    expect(row['period']).toBe('Monthly');
    expect(row['amount']).toBe(800);
    expect(row['active']).toBe(1);
    expect(row['notes']).toBe('Family of 2');
  });

  it('upserts wish list rows', () => {
    upsertWishList(db, [
      {
        notionId: 'wl-1',
        item: 'Standing Desk',
        targetAmount: 1200,
        saved: 400,
        priority: 'High',
        url: 'https://example.com/desk',
        notes: 'Ergonomic',
        lastEditedTime: '2024-07-01T00:00:00.000Z',
      },
    ]);

    const row = db.prepare('SELECT * FROM wish_list WHERE notion_id = ?').get('wl-1') as Record<
      string,
      unknown
    >;
    expect(row['item']).toBe('Standing Desk');
    expect(row['target_amount']).toBe(1200);
    expect(row['saved']).toBe(400);
    expect(row['priority']).toBe('High');
    expect(row['url']).toBe('https://example.com/desk');
    expect(row['notes']).toBe('Ergonomic');
  });

  it('upserts budgets and updates on conflict', () => {
    upsertBudgets(db, [
      {
        notionId: 'bud-1',
        category: 'Groceries',
        period: 'Monthly',
        amount: 500,
        active: true,
        notes: null,
        lastEditedTime: '2024-01-01T00:00:00.000Z',
      },
    ]);

    upsertBudgets(db, [
      {
        notionId: 'bud-1',
        category: 'Groceries',
        period: 'Monthly',
        amount: 800,
        active: false,
        notes: 'Increased budget',
        lastEditedTime: '2024-06-01T00:00:00.000Z',
      },
    ]);

    const row = db.prepare('SELECT * FROM budgets WHERE notion_id = ?').get('bud-1') as Record<
      string,
      unknown
    >;
    expect(row['amount']).toBe(800);
    expect(row['active']).toBe(0);
    expect(row['notes']).toBe('Increased budget');
  });

  it('handles batch upsert of multiple rows', () => {
    const entities = Array.from({ length: 50 }, (_, i) => ({
      notionId: `ent-${i}`,
      name: `Entity ${i}`,
      type: null,
      abn: null,
      aliases: null,
      defaultTransactionType: null,
      defaultCategory: null,
      notes: null,
      lastEditedTime: '2024-01-01T00:00:00.000Z',
    }));

    upsertEntities(db, entities);

    const count = db.prepare('SELECT COUNT(*) as c FROM entities').get() as { c: number };
    expect(count.c).toBe(50);
  });
});
