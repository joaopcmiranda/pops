/**
 * Seed database with comprehensive test data
 * Run with: tsx scripts/db-seed.ts
 */
import BetterSqlite3 from "better-sqlite3";
import { existsSync } from "node:fs";

const DB_PATH = process.env.SQLITE_PATH ?? "./data/pops.db";

if (!existsSync(DB_PATH)) {
  console.error(`❌ Database not found at ${DB_PATH}`);
  console.log("💡 Run 'tsx scripts/init-db.ts' to create the database first");
  process.exit(1);
}

const db = new BetterSqlite3(DB_PATH);

// Set pragmas
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 5000");

console.log("🌱 Seeding database with test data...\n");

// Seed data
const now = new Date().toISOString();

// Wrap everything in one atomic transaction (clear + all inserts)
const seedDatabase = db.transaction(() => {
  // Clear existing data first
  console.log("🧹 Clearing existing data...");
  db.exec(`DELETE FROM transactions`);
  db.exec(`DELETE FROM entities`);
  db.exec(`DELETE FROM budgets`);
  db.exec(`DELETE FROM home_inventory`);
  db.exec(`DELETE FROM wish_list`);
  db.exec(`DELETE FROM sync_cursors`);
  db.exec(`DELETE FROM ai_usage`);

// =============================================================================
// Entities (merchants/payees)
// =============================================================================

console.log("📦 Seeding entities...");

const entities = [
  {
    notion_id: "entity-001",
    name: "Woolworths",
    type: "Supermarket",
    abn: "88000014675",
    aliases: "Woolies, WOW, Woolworths Metro",
    default_transaction_type: "Expense",
    default_category: "Groceries",
    notes: "Primary grocery shopping",
    last_edited_time: now,
  },
  {
    notion_id: "entity-002",
    name: "Coles",
    type: "Supermarket",
    abn: "45004189708",
    aliases: "Coles Express, Coles Local",
    default_transaction_type: "Expense",
    default_category: "Groceries",
    notes: null,
    last_edited_time: now,
  },
  {
    notion_id: "entity-003",
    name: "Netflix",
    type: "Subscription",
    abn: null,
    aliases: "Netflix.com",
    default_transaction_type: "Expense",
    default_category: "Entertainment",
    notes: "Streaming service",
    last_edited_time: now,
  },
  {
    notion_id: "entity-004",
    name: "Spotify",
    type: "Subscription",
    abn: null,
    aliases: "Spotify Premium",
    default_transaction_type: "Expense",
    default_category: "Entertainment",
    notes: "Music streaming",
    last_edited_time: now,
  },
  {
    notion_id: "entity-005",
    name: "Shell",
    type: "Fuel Station",
    abn: "46004610459",
    aliases: "Shell Coles Express, Shell Service Station",
    default_transaction_type: "Expense",
    default_category: "Transport",
    notes: "Fuel and convenience",
    last_edited_time: now,
  },
  {
    notion_id: "entity-006",
    name: "Amazon AU",
    type: "Retailer",
    abn: "72054094117",
    aliases: "Amazon.com.au, Amazon Australia",
    default_transaction_type: "Expense",
    default_category: "Shopping",
    notes: "Online marketplace",
    last_edited_time: now,
  },
  {
    notion_id: "entity-007",
    name: "Employer",
    type: "Employer",
    abn: null,
    aliases: "Salary, Payroll",
    default_transaction_type: "Income",
    default_category: "Salary",
    notes: "Primary income source",
    last_edited_time: now,
  },
  {
    notion_id: "entity-008",
    name: "Apple",
    type: "Technology",
    abn: null,
    aliases: "Apple Inc, Apple Store, iTunes",
    default_transaction_type: "Expense",
    default_category: "Technology",
    notes: null,
    last_edited_time: now,
  },
  {
    notion_id: "entity-009",
    name: "Bunnings",
    type: "Hardware",
    abn: "63008672179",
    aliases: "Bunnings Warehouse",
    default_transaction_type: "Expense",
    default_category: "Home & Garden",
    notes: "Hardware and home improvement",
    last_edited_time: now,
  },
  {
    notion_id: "entity-010",
    name: "JB Hi-Fi",
    type: "Retailer",
    abn: "98093220136",
    aliases: "JB HiFi, JB",
    default_transaction_type: "Expense",
    default_category: "Technology",
    notes: "Electronics retailer",
    last_edited_time: now,
  },
];

const insertEntity = db.prepare(`
  INSERT INTO entities (
    notion_id, name, type, abn, aliases, default_transaction_type,
    default_category, notes, last_edited_time
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

  // Seed entities
  for (const entity of entities) {
    insertEntity.run(
      entity.notion_id,
      entity.name,
      entity.type,
      entity.abn,
      entity.aliases,
      entity.default_transaction_type,
      entity.default_category,
      entity.notes,
      entity.last_edited_time
    );
  }
  console.log(`  ✓ Inserted ${entities.length} entities`);

// =============================================================================
// Transactions
// =============================================================================

console.log("💳 Seeding transactions...");

const transactions = [
  // Income
  {
    notion_id: "txn-001",
    description: "Salary Payment",
    account: "Bank Account",
    amount: 5200.0,
    date: "2026-02-01",
    type: "Income",
    categories: JSON.stringify(["Salary"]),
    entity_id: "entity-007",
    entity_name: "Employer",
    location: null,
    country: "Australia",
    online: 1,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "Fortnightly salary",
    last_edited_time: now,
  },
  {
    notion_id: "txn-002",
    description: "Salary Payment",
    account: "Bank Account",
    amount: 5200.0,
    date: "2026-01-18",
    type: "Income",
    categories: JSON.stringify(["Salary"]),
    entity_id: "entity-007",
    entity_name: "Employer",
    location: null,
    country: "Australia",
    online: 1,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "Fortnightly salary",
    last_edited_time: now,
  },

  // Groceries
  {
    notion_id: "txn-003",
    description: "Woolworths Metro",
    account: "Credit Card",
    amount: -87.45,
    date: "2026-02-10",
    type: "Expense",
    categories: JSON.stringify(["Groceries"]),
    entity_id: "entity-001",
    entity_name: "Woolworths",
    location: "Sydney CBD",
    country: "Australia",
    online: 0,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: null,
    last_edited_time: now,
  },
  {
    notion_id: "txn-004",
    description: "Coles Local",
    account: "Debit Card",
    amount: -124.8,
    date: "2026-02-08",
    type: "Expense",
    categories: JSON.stringify(["Groceries"]),
    entity_id: "entity-002",
    entity_name: "Coles",
    location: "Surry Hills",
    country: "Australia",
    online: 0,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "Weekly shop",
    last_edited_time: now,
  },
  {
    notion_id: "txn-005",
    description: "Woolworths",
    account: "Credit Card",
    amount: -156.32,
    date: "2026-02-03",
    type: "Expense",
    categories: JSON.stringify(["Groceries"]),
    entity_id: "entity-001",
    entity_name: "Woolworths",
    location: "Bondi Junction",
    country: "Australia",
    online: 0,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: null,
    last_edited_time: now,
  },

  // Subscriptions
  {
    notion_id: "txn-006",
    description: "Netflix Subscription",
    account: "Credit Card",
    amount: -22.99,
    date: "2026-02-05",
    type: "Expense",
    categories: JSON.stringify(["Entertainment", "Subscriptions"]),
    entity_id: "entity-003",
    entity_name: "Netflix",
    location: null,
    country: "Australia",
    online: 1,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "Premium plan",
    last_edited_time: now,
  },
  {
    notion_id: "txn-007",
    description: "Spotify Premium",
    account: "Credit Card",
    amount: -13.99,
    date: "2026-02-01",
    type: "Expense",
    categories: JSON.stringify(["Entertainment", "Subscriptions"]),
    entity_id: "entity-004",
    entity_name: "Spotify",
    location: null,
    country: "Australia",
    online: 1,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "Individual plan",
    last_edited_time: now,
  },

  // Fuel
  {
    notion_id: "txn-008",
    description: "Shell Service Station",
    account: "Credit Card",
    amount: -75.5,
    date: "2026-02-07",
    type: "Expense",
    categories: JSON.stringify(["Transport", "Fuel"]),
    entity_id: "entity-005",
    entity_name: "Shell",
    location: "Randwick",
    country: "Australia",
    online: 0,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "45L unleaded",
    last_edited_time: now,
  },
  {
    notion_id: "txn-009",
    description: "Shell Coles Express",
    account: "Credit Card",
    amount: -68.2,
    date: "2026-01-28",
    type: "Expense",
    categories: JSON.stringify(["Transport", "Fuel"]),
    entity_id: "entity-005",
    entity_name: "Shell",
    location: "Mascot",
    country: "Australia",
    online: 0,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: null,
    last_edited_time: now,
  },

  // Shopping
  {
    notion_id: "txn-010",
    description: "Amazon.com.au",
    account: "Credit Card",
    amount: -89.95,
    date: "2026-02-04",
    type: "Expense",
    categories: JSON.stringify(["Shopping", "Technology"]),
    entity_id: "entity-006",
    entity_name: "Amazon AU",
    location: null,
    country: "Australia",
    online: 1,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "USB-C cables and phone case",
    last_edited_time: now,
  },
  {
    notion_id: "txn-011",
    description: "JB Hi-Fi",
    account: "Credit Card",
    amount: -1299.0,
    date: "2026-02-02",
    type: "Expense",
    categories: JSON.stringify(["Technology", "Shopping"]),
    entity_id: "entity-010",
    entity_name: "JB Hi-Fi",
    location: "Pitt St Mall",
    country: "Australia",
    online: 0,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "New headphones - Sony WH-1000XM5",
    last_edited_time: now,
  },
  {
    notion_id: "txn-012",
    description: "Bunnings Warehouse",
    account: "Debit Card",
    amount: -147.6,
    date: "2026-01-30",
    type: "Expense",
    categories: JSON.stringify(["Home & Garden"]),
    entity_id: "entity-009",
    entity_name: "Bunnings",
    location: "Alexandria",
    country: "Australia",
    online: 0,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "Paint supplies for bedroom",
    last_edited_time: now,
  },

  // Transfer pair example
  {
    notion_id: "txn-013",
    description: "Transfer to Savings",
    account: "Bank Account",
    amount: -500.0,
    date: "2026-02-01",
    type: "Transfer",
    categories: JSON.stringify(["Transfer"]),
    entity_id: null,
    entity_name: null,
    location: null,
    country: "Australia",
    online: 1,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: "txn-014",
    notes: "Monthly savings",
    last_edited_time: now,
  },
  {
    notion_id: "txn-014",
    description: "Transfer from Bank Account",
    account: "Savings Account",
    amount: 500.0,
    date: "2026-02-01",
    type: "Transfer",
    categories: JSON.stringify(["Transfer"]),
    entity_id: null,
    entity_name: null,
    location: null,
    country: "Australia",
    online: 1,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: "txn-013",
    notes: "Monthly savings",
    last_edited_time: now,
  },

  // Older transactions for historical data
  {
    notion_id: "txn-015",
    description: "Salary Payment",
    account: "Bank Account",
    amount: 5200.0,
    date: "2026-01-04",
    type: "Income",
    categories: JSON.stringify(["Salary"]),
    entity_id: "entity-007",
    entity_name: "Employer",
    location: null,
    country: "Australia",
    online: 1,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "Fortnightly salary",
    last_edited_time: now,
  },
  {
    notion_id: "txn-016",
    description: "Woolworths",
    account: "Credit Card",
    amount: -203.45,
    date: "2025-12-28",
    type: "Expense",
    categories: JSON.stringify(["Groceries"]),
    entity_id: "entity-001",
    entity_name: "Woolworths",
    location: "Sydney CBD",
    country: "Australia",
    online: 0,
    novated_lease: 0,
    tax_return: 0,
    related_transaction_id: null,
    notes: "Holiday shopping",
    last_edited_time: now,
  },
];

const insertTransaction = db.prepare(`
  INSERT INTO transactions (
    notion_id, description, account, amount, date, type, categories,
    entity_id, entity_name, location, country, online, novated_lease,
    tax_return, related_transaction_id, notes, last_edited_time
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

  // Seed transactions
  for (const txn of transactions) {
    insertTransaction.run(
      txn.notion_id,
      txn.description,
      txn.account,
      txn.amount,
      txn.date,
      txn.type,
      txn.categories,
      txn.entity_id,
      txn.entity_name,
      txn.location,
      txn.country,
      txn.online,
      txn.novated_lease,
      txn.tax_return,
      txn.related_transaction_id,
      txn.notes,
      txn.last_edited_time
    );
  }
  console.log(`  ✓ Inserted ${transactions.length} transactions`);

// =============================================================================
// Budgets
// =============================================================================

console.log("💰 Seeding budgets...");

const budgets = [
  {
    notion_id: "budget-001",
    category: "Groceries",
    period: "Monthly",
    amount: 800.0,
    active: 1,
    notes: "Supermarket shopping and essentials",
    last_edited_time: now,
  },
  {
    notion_id: "budget-002",
    category: "Transport",
    period: "Monthly",
    amount: 300.0,
    active: 1,
    notes: "Fuel, tolls, parking",
    last_edited_time: now,
  },
  {
    notion_id: "budget-003",
    category: "Entertainment",
    period: "Monthly",
    amount: 150.0,
    active: 1,
    notes: "Streaming, dining out, activities",
    last_edited_time: now,
  },
  {
    notion_id: "budget-004",
    category: "Shopping",
    period: "Monthly",
    amount: 400.0,
    active: 1,
    notes: "Clothing, electronics, misc purchases",
    last_edited_time: now,
  },
  {
    notion_id: "budget-005",
    category: "Home & Garden",
    period: "Monthly",
    amount: 200.0,
    active: 1,
    notes: "Maintenance, improvements, supplies",
    last_edited_time: now,
  },
  {
    notion_id: "budget-006",
    category: "Utilities",
    period: "Monthly",
    amount: 250.0,
    active: 1,
    notes: "Electricity, gas, water, internet",
    last_edited_time: now,
  },
  {
    notion_id: "budget-007",
    category: "Subscriptions",
    period: "Monthly",
    amount: 100.0,
    active: 1,
    notes: "Streaming services, software, memberships",
    last_edited_time: now,
  },
  {
    notion_id: "budget-008",
    category: "Holiday Fund",
    period: "Yearly",
    amount: 5000.0,
    active: 1,
    notes: "Annual vacation savings",
    last_edited_time: now,
  },
];

const insertBudget = db.prepare(`
  INSERT INTO budgets (
    notion_id, category, period, amount, active, notes, last_edited_time
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`);

  // Seed budgets
  for (const budget of budgets) {
    insertBudget.run(
      budget.notion_id,
      budget.category,
      budget.period,
      budget.amount,
      budget.active,
      budget.notes,
      budget.last_edited_time
    );
  }
  console.log(`  ✓ Inserted ${budgets.length} budgets`);

// =============================================================================
// Home Inventory
// =============================================================================

console.log("🏠 Seeding home_inventory...");

const home_inventory = [
  {
    notion_id: "inv-001",
    item_name: "MacBook Pro 16-inch",
    brand: "Apple",
    model: "M3 Max",
    item_id: "C02YX0MJLVDQ",
    room: "Home Office",
    location: "Desk",
    type: "Electronics",
    condition: "Excellent",
    in_use: 1,
    deductible: 1,
    purchase_date: "2024-11-15",
    warranty_expires: "2027-11-15",
    replacement_value: 5499.0,
    resale_value: 4200.0,
    purchase_transaction_id: null,
    purchased_from_id: "entity-008",
    purchased_from_name: "Apple",
    last_edited_time: now,
  },
  {
    notion_id: "inv-002",
    item_name: "Sony WH-1000XM5 Headphones",
    brand: "Sony",
    model: "WH-1000XM5",
    item_id: null,
    room: "Home Office",
    location: "Shelf",
    type: "Electronics",
    condition: "Excellent",
    in_use: 1,
    deductible: 1,
    purchase_date: "2026-02-02",
    warranty_expires: "2027-02-02",
    replacement_value: 1299.0,
    resale_value: 900.0,
    purchase_transaction_id: "txn-011",
    purchased_from_id: "entity-010",
    purchased_from_name: "JB Hi-Fi",
    last_edited_time: now,
  },
  {
    notion_id: "inv-003",
    item_name: "Samsung 65\" QLED TV",
    brand: "Samsung",
    model: "QN65Q80C",
    item_id: null,
    room: "Living Room",
    location: "Wall Mount",
    type: "Electronics",
    condition: "Good",
    in_use: 1,
    deductible: 1,
    purchase_date: "2023-08-20",
    warranty_expires: "2025-08-20",
    replacement_value: 2799.0,
    resale_value: 1200.0,
    purchase_transaction_id: null,
    purchased_from_id: "entity-010",
    purchased_from_name: "JB Hi-Fi",
    last_edited_time: now,
  },
  {
    notion_id: "inv-004",
    item_name: "Dyson V15 Vacuum",
    brand: "Dyson",
    model: "V15 Detect",
    item_id: null,
    room: "Laundry",
    location: "Storage Cupboard",
    type: "Appliance",
    condition: "Good",
    in_use: 1,
    deductible: 0,
    purchase_date: "2024-03-10",
    warranty_expires: "2026-03-10",
    replacement_value: 1249.0,
    resale_value: 750.0,
    purchase_transaction_id: null,
    purchased_from_id: "entity-006",
    purchased_from_name: "Amazon AU",
    last_edited_time: now,
  },
  {
    notion_id: "inv-005",
    item_name: "Breville Barista Express",
    brand: "Breville",
    model: "BES870BSS",
    item_id: null,
    room: "Kitchen",
    location: "Counter",
    type: "Appliance",
    condition: "Good",
    in_use: 1,
    deductible: 0,
    purchase_date: "2023-12-01",
    warranty_expires: "2025-12-01",
    replacement_value: 799.0,
    resale_value: 450.0,
    purchase_transaction_id: null,
    purchased_from_id: "entity-006",
    purchased_from_name: "Amazon AU",
    last_edited_time: now,
  },
];

const insertInventory = db.prepare(`
  INSERT INTO home_inventory (
    notion_id, item_name, brand, model, item_id, room, location, type, condition,
    in_use, deductible, purchase_date, warranty_expires, replacement_value,
    resale_value, purchase_transaction_id, purchased_from_id, purchased_from_name,
    last_edited_time
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

  // Seed home_inventory
  for (const item of home_inventory) {
    insertInventory.run(
      item.notion_id,
      item.item_name,
      item.brand,
      item.model,
      item.item_id,
      item.room,
      item.location,
      item.type,
      item.condition,
      item.in_use,
      item.deductible,
      item.purchase_date,
      item.warranty_expires,
      item.replacement_value,
      item.resale_value,
      item.purchase_transaction_id,
      item.purchased_from_id,
      item.purchased_from_name,
      item.last_edited_time
    );
  }
  console.log(`  ✓ Inserted ${home_inventory.length} home_inventory items`);

// =============================================================================
// Wish List
// =============================================================================

console.log("✨ Seeding wish list...");

const wishList = [
  {
    notion_id: "wish-001",
    item: "New Gaming PC",
    target_amount: 3500.0,
    saved: 1200.0,
    priority: "Soon",
    url: "https://www.pccasegear.com",
    notes: "RTX 4080, Ryzen 9 7950X build",
    last_edited_time: now,
  },
  {
    notion_id: "wish-002",
    item: "Standing Desk",
    target_amount: 800.0,
    saved: 450.0,
    priority: "Needing",
    url: "https://www.jarvis.com.au",
    notes: "Fully Jarvis bamboo top",
    last_edited_time: now,
  },
  {
    notion_id: "wish-003",
    item: "Japan Trip",
    target_amount: 8000.0,
    saved: 2100.0,
    priority: "One Day",
    url: null,
    notes: "2 week trip to Tokyo, Kyoto, Osaka",
    last_edited_time: now,
  },
  {
    notion_id: "wish-004",
    item: "Herman Miller Chair",
    target_amount: 2200.0,
    saved: 0.0,
    priority: "Dreaming",
    url: "https://www.hermanmiller.com",
    notes: "Aeron fully loaded",
    last_edited_time: now,
  },
  {
    notion_id: "wish-005",
    item: "New Camera",
    target_amount: 4500.0,
    saved: 800.0,
    priority: "One Day",
    url: "https://www.sony.com.au",
    notes: "Sony A7 IV with 24-70mm f/2.8 GM II",
    last_edited_time: now,
  },
];

const insertWishList = db.prepare(`
  INSERT INTO wish_list (
    notion_id, item, target_amount, saved, priority, url, notes, last_edited_time
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

  // Seed wish list
  for (const wish of wishList) {
    insertWishList.run(
      wish.notion_id,
      wish.item,
      wish.target_amount,
      wish.saved,
      wish.priority,
      wish.url,
      wish.notes,
      wish.last_edited_time
    );
  }
  console.log(`  ✓ Inserted ${wishList.length} wish list items`);
});

// Execute the atomic seeding transaction
seedDatabase();

// =============================================================================
// Summary
// =============================================================================

const counts = {
  transactions: db.prepare("SELECT COUNT(*) as count FROM transactions").get() as { count: number },
  entities: db.prepare("SELECT COUNT(*) as count FROM entities").get() as { count: number },
  budgets: db.prepare("SELECT COUNT(*) as count FROM budgets").get() as { count: number },
  home_inventory: db.prepare("SELECT COUNT(*) as count FROM home_inventory").get() as { count: number },
  wish_list: db.prepare("SELECT COUNT(*) as count FROM wish_list").get() as { count: number },
};

console.log("\n✅ Database seeded successfully\n");
console.log("📊 Final counts:");
console.log(`  transactions:  ${counts.transactions.count}`);
console.log(`  entities:      ${counts.entities.count}`);
console.log(`  budgets:       ${counts.budgets.count}`);
console.log(`  home_inventory:     ${counts.home_inventory.count}`);
console.log(`  wish_list:     ${counts.wish_list.count}`);
console.log("\n💡 Use this data for development and E2E testing");

db.close();
