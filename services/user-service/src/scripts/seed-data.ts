#!/usr/bin/env tsx

import { DatabaseSync } from 'node:sqlite'
import { createId } from '@paralleldrive/cuid2'
import bcrypt from 'bcryptjs'

const dbFile = './data/users.db'

// Ensure data directory exists
import { mkdirSync } from 'fs'
try {
  mkdirSync('./data', { recursive: true })
} catch (error) {
  // Directory may already exist
}
const sqlite = new DatabaseSync(dbFile)

console.log('🌱 Seeding user database...')

async function seedData() {
  try {
    // Clear existing data first
    sqlite.exec('DELETE FROM users')
    sqlite.exec('DELETE FROM people')

    const now = Date.now()

    // Hash default password for test users
    const defaultPassword = await bcrypt.hash('password123', 12)

    // Test users
    const users = [
      {
        id: 'user_test_john_doe',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: defaultPassword,
        avatar: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'user_test_jane_smith',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: defaultPassword,
        avatar: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'user_test_admin',
        name: 'Admin User',
        email: 'admin@example.com',
        password: defaultPassword,
        avatar: null,
        created_at: now,
        updated_at: now,
      },
    ]

    // People/contacts
    const people = [
      {
        id: createId(),
        name: 'Maria Santos',
        relationship_type: 'family',
        phone: '+55 11 99999-1234',
        email: null,
        whatsapp: '+55 11 99999-1234',
        notes: 'Cousin in São Paulo, great local guide',
        created_at: now,
        updated_at: now,
      },
      {
        id: createId(),
        name: 'João Silva',
        relationship_type: 'friend',
        phone: null,
        email: 'joao.silva@email.com',
        whatsapp: '+55 21 88888-5678',
        notes: 'Friend from Rio, knows great restaurants and nightlife',
        created_at: now,
        updated_at: now,
      },
      {
        id: createId(),
        name: 'Ana Costa',
        relationship_type: 'colleague',
        phone: '+1 555-0123',
        email: 'ana.costa@company.com',
        whatsapp: null,
        notes: 'Work contact for research interviews and business meetings',
        created_at: now,
        updated_at: now,
      },
      {
        id: createId(),
        name: 'Carlos Rodriguez',
        relationship_type: 'friend',
        phone: '+34 600 123 456',
        email: 'carlos@email.com',
        whatsapp: '+34 600 123 456',
        notes: 'Travel buddy from Madrid, loves adventure activities',
        created_at: now,
        updated_at: now,
      },
      {
        id: createId(),
        name: 'Yuki Tanaka',
        relationship_type: 'contact',
        phone: '+81 90-1234-5678',
        email: 'yuki.tanaka@email.jp',
        whatsapp: null,
        notes: 'Local Tokyo guide, speaks excellent English',
        created_at: now,
        updated_at: now,
      },
      {
        id: createId(),
        name: 'Emma Thompson',
        relationship_type: 'friend',
        phone: '+44 20 7123 4567',
        email: 'emma.thompson@email.co.uk',
        whatsapp: '+44 7700 900123',
        notes: 'London local, works in theater district',
        created_at: now,
        updated_at: now,
      },
    ]

    // Insert users
    const insertUserStmt = sqlite.prepare(`
    INSERT INTO users (id, name, email, password, avatar, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

    for (const user of users) {
      insertUserStmt.run(
        user.id,
        user.name,
        user.email,
        user.password,
        user.avatar,
        user.created_at,
        user.updated_at
      )
      console.log(`✅ Created user: ${user.name}`)
    }

    // Insert people
    const insertPersonStmt = sqlite.prepare(`
    INSERT INTO people (id, name, relationship_type, phone, email, whatsapp, notes, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

    for (const person of people) {
      insertPersonStmt.run(
        person.id,
        person.name,
        person.relationship_type,
        person.phone,
        person.email,
        person.whatsapp,
        person.notes,
        person.created_at,
        person.updated_at
      )
      console.log(`✅ Created person: ${person.name}`)
    }

    console.log(`🎉 Successfully seeded ${users.length} users and ${people.length} people!`)
  } catch (error) {
    console.error('❌ Error seeding user data:', error)
    process.exit(1)
  } finally {
    sqlite.close()
  }
}

// Run the async seeding function
seedData()
