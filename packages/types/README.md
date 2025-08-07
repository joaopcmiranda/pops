# Types Package

Centralized type definitions and schemas for the POPS project, ensuring type safety across all services and applications.

## Overview

This package serves as the single source of truth for all type definitions used in communication between services and frontend applications. It combines Zod schemas for runtime validation with TypeScript types inferred from those schemas.

## Key Principles

- **Single Source of Truth**: All communication types between services and apps must be defined here
- **Schema-First**: Types are defined using Zod schemas and TypeScript types are inferred from them
- **Runtime Safety**: Zod provides runtime validation alongside compile-time type checking
- **Enum Management**: All relevant enums are TypeScript enums used with `z.nativeEnum()`
- **Type Inference**: All types use `z.infer<typeof schemaName>` for consistency

## Architecture

### Schema Definition Pattern

```typescript
// 1. Define TypeScript enum
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

// 2. Create Zod schema using native enum
export const userRoleSchema = z.nativeEnum(UserRole)

// 3. Create complex schema
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: userRoleSchema,
  createdAt: z.date(),
})

// 4. Infer TypeScript type
export type User = z.infer<typeof userSchema>
```

## Package Structure

```
packages/types/
├── src/
│   ├── schemas/           # Zod schemas organized by domain
│   ├── types/            # Inferred TypeScript types
│   ├── enums/            # TypeScript enums
│   └── index.ts          # Main exports
└── package.json
```

## Usage

### In Services (Backend)

```typescript
import { userSchema, type User } from '@pops/types'

// Runtime validation
const validateUser = (data: unknown): User => {
  return userSchema.parse(data)
}
```

### In Frontend Applications

```typescript
import { type User, type Trip, UserRole } from '@pops/types'

// Type-safe component props
interface UserProfileProps {
  user: User
  onRoleChange: (role: UserRole) => void
}
```

## Type Categories

### Communication Types

All types used for:

- API request/response payloads
- Database entities
- Service-to-service communication
- Frontend-backend data exchange

### Domain Enums

- User roles and permissions
- Trip statuses
- Content types
- API response codes

## Development Guidelines

1. **Schema First**: Always define Zod schema before TypeScript type
2. **Inference Only**: Use `z.infer<typeof schema>` for all type definitions
3. **Native Enums**: Use `z.nativeEnum()` for TypeScript enums in schemas
4. **Validation**: All communication boundaries should validate using schemas
5. **Exports**: Export both schemas and inferred types from main index

## Dependencies

- **Zod**: Runtime schema validation and type inference
- **TypeScript**: Compile-time type checking and enum definitions

## Benefits

- **Type Safety**: Compile-time and runtime type validation
- **Consistency**: Shared types prevent drift between services
- **Developer Experience**: Auto-completion and type checking across the entire stack
- **Maintainability**: Centralized type definitions make refactoring safer
