import type { Config } from 'drizzle-kit'

const isTest = process.env.NODE_ENV === 'test'

export default {
  schema: './src/db/schema.postgres.ts',
  out: './migrations/postgres',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || (isTest ? '5433' : '5432')),
    database: process.env.DB_NAME || (isTest ? 'pops_test' : 'pops_development'),
    user: process.env.DB_USER || (isTest ? 'pops_test_user' : 'pops_user'),
    password: process.env.DB_PASSWORD || (isTest ? 'pops_test_password' : 'pops_password'),
    ssl: false,
  },
  schemaFilter: ['trip_service'],
  verbose: true,
  strict: true,
} satisfies Config
