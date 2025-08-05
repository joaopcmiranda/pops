#!/usr/bin/env tsx

/**
 * Main Seed Script
 *
 * Default seeding script that populates example data for development.
 */

import { seedExampleData } from './seed-examples.js'

// Run example data seeding by default
seedExampleData().catch(console.error)
