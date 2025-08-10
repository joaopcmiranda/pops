# POps - Personal Operations Suite - Project Context

## 🚀 Current Status

**Status**: ✅ Travel Organizer with Real Auth + PostgreSQL + Mobile Optimization (75% mobile-ready)
**Main App**: Travel Organizer running on http://localhost:4003
**Package Manager**: pnpm with Turborepo (migrated from NX for simplified build orchestration)
**Node Version**: v24.5.0+ required (for Vite 7 compatibility)
**Architecture**: Monorepo with microservices backend + PostgreSQL database
**Last Updated**: August 2025

## 🏗️ Tech Stack & Architecture

### Frontend
- **Framework**: React 19 + TypeScript + Vite 7
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Mobile**: ✅ 75% mobile-ready with responsive design + touch optimization
- **State Management**: React Query + Context API
- **Icons**: Lucide React
- **Editor**: TipTap WYSIWYG with markdown support
- **Documentation**: Comprehensive Storybook stories

### Backend
- **Services**: Fastify microservices with Direct API Client
- **Database**: ✅ PostgreSQL with Drizzle ORM (migrated from SQLite)
- **Authentication**: ✅ Real JWT with refresh tokens (15min access, 7d refresh)
- **Orchestration**: Turborepo with systematic port allocation

### Current Active Services (PostgreSQL)
- **Trip Service**: http://localhost:8030 (PostgreSQL + Drizzle)
- **Itinerary Service**: http://localhost:8031 (PostgreSQL + Drizzle)  
- **User Service**: http://localhost:8011 (PostgreSQL + Drizzle)

## 📁 Project Structure

```
pops/
├── apps/
│   ├── hub/                    # POps main dashboard (future)
│   └── travel/                 # ✅ Travel organizer (active)
│       ├── src/
│       │   ├── components/     # App components + stories
│       │   ├── contexts/       # React contexts (Auth, Trip)
│       │   ├── hooks/          # Custom hooks
│       │   ├── services/       # API service clients
│       │   └── types/          # App-specific types
│       └── vite.config.ts
│
├── services/                   # Backend microservices
│   ├── trip-service/          # Trip management (port 8030)
│   ├── itinerary-service/     # Itinerary management (port 8031)
│   └── user-service/          # User management (port 8011)
│
├── packages/                   # Shared packages
│   ├── ui/                    # shadcn/ui component library
│   ├── types/                 # Shared TypeScript types/schemas
│   ├── navigation/            # Unified navigation components
│   ├── api-client/           # Direct API client
│   └── shared/               # Shared utilities
│
├── scripts/                   # Development & deployment scripts
│   ├── dev.sh                # 🚀 Main development starter
│   ├── dev-start.sh          # Backend orchestration
│   ├── dev-stop.sh           # Service shutdown
│   ├── health-check.sh       # System validation
│   └── [other scripts]
│
├── content/                   # Content structure (future feature)
├── turbo.json                # Turborepo configuration
└── pnpm-workspace.yaml       # Workspace configuration
```

## 🎨 Travel Organizer - Current Features

### ✅ Fully Implemented
- **Multi-Trip Management** - Create, manage, switch between trips
- **Real Authentication** - JWT with refresh tokens, full auth flow
- **PostgreSQL Database** - Production-ready database with Drizzle ORM
- **Mobile Optimization** - 75% mobile-ready with touch interfaces (Phase 3 complete)
- **Rich Content Editor** - TipTap WYSIWYG with auto-save
- **Trip Context** - Global state with localStorage persistence
- **Responsive UI** - Complete shadcn/ui integration + mobile CSS framework
- **Category Navigation** - 7 travel categories with routing
- **Error Boundaries** - Comprehensive error handling
- **Storybook Documentation** - Complete component stories

### 📋 Travel Categories
1. **Destinations** (Blue) - MapPin icon
2. **Itinerary** (Green) - Calendar icon  
3. **Transport** (Purple) - Plane icon
4. **Accommodation** (Orange) - Home icon
5. **Activities** (Red) - Activity icon
6. **Budget** (Yellow) - DollarSign icon
7. **Documents** (Gray) - FileText icon

## 🛠️ Technical Implementation

### Port Strategy
- **Frontend Apps**: 4000-4099 range
- **Backend Services**: 8000-8099 range
- **Current Active**: 4003 (travel), 8011 (user), 8030 (trip), 8031 (itinerary)

### Development Architecture
- **Hot Reload**: Turborepo cascading updates across packages
- **Smart Caching**: Prevents unnecessary rebuilds
- **Service Orchestration**: Automated startup/shutdown scripts
- **Health Monitoring**: Comprehensive service health checks

### Database Schema (PostgreSQL)
- **Trip Management**: Full trip CRUD with metadata
- **User Management**: JWT authentication with refresh tokens
- **Itinerary System**: Rich content with auto-save functionality

### Mobile Architecture
- **Responsive Breakpoints**: 320px (iPhone SE) → 768px (tablet) → desktop
- **Touch Targets**: 44px+ minimum for accessibility compliance
- **Mobile Hooks**: `useIsMobile()`, `useMobileGestures()`, `useMobilePerformance()`
- **CSS Framework**: Comprehensive mobile.css with touch optimizations
- **Performance**: Device detection, lazy loading, reduced motion support

## 🚀 Development Commands

```bash
# Ensure Node.js v24.5.0+
nvm use 24.5.0

# Main Development Commands
pnpm dev              # Start everything (frontend + backend)
pnpm dev:travel       # Start travel app only (http://localhost:4003)

# Backend Services (Turborepo-powered)
pnpm services:dev     # Start all backend services with orchestration
pnpm services:stop    # Stop all backend services  
pnpm services:health  # Check health of all services
pnpm services:build   # Build all backend services

# Alternative: Development Scripts
./scripts/dev.sh              # 🚀 Main development starter
./scripts/dev-start.sh        # Backend orchestration
./scripts/dev-stop.sh         # Clean service shutdown
./scripts/health-check.sh     # System health validation

# Code Quality (must pass before task completion)
pnpm lint             # ESLint checking
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Prettier formatting
pnpm type-check       # TypeScript checking
pnpm check            # Run all checks

# Storybook Documentation
pnpm storybook        # http://localhost:6006

# Build and Production
pnpm build            # Build all apps/packages
```

## 🎯 Development Priorities

### ✅ Completed Phases
- **Phase 1**: Backend Integration (Trip management, database, APIs)
- **Phase 2**: Real Authentication (JWT with refresh tokens, PostgreSQL migration)  
- **Phase 3**: Mobile Optimization (75% mobile-ready, touch interfaces, responsive design)

### Current Phase: Complete Mobile Experience
1. **Hamburger Menu Implementation** - Complete mobile navigation (remaining 25%)
2. **iPad Touch Target Refinements** - Final mobile accessibility improvements
3. **Mobile Testing & Polish** - Cross-device validation

### Next Phase: Multi-App Platform
1. **POps Hub** - Main dashboard app (port 4000)
2. **Cross-App Navigation** - Unified navigation system
3. **Money Manager** - Financial management app (port 4002)
4. **Event Manager** - Event planning app (port 4004)

### Future Roadmap
- **AI Integration** - Smart suggestions and automation
- **Mobile Applications** - React Native apps
- **Real-time Collaboration** - Multi-user features
- **Advanced Analytics** - Usage and behavior insights

## 💡 Development Standards

### Code Quality Requirements
- **NO TASK IS FINISHED UNTIL ALL ERRORS RESOLVED**
- All lint, build, format, and type checks must pass
- Never use `any` or `unknown as Type` - always type properly
- No eslint-disable or ts-ignore - fix issues instead

### Coding Guidelines
- **Imports**: Use destructured imports `{ Component }` not defaults
- **Exports**: Individual exports, avoid `export default`
- **Aliases**: Use `@/` aliases for clean imports
- **Components**: Follow shadcn/ui patterns and conventions
- **Types**: Use shared types from `@pops/types` when possible

### Architecture Principles
- **Monorepo Structure**: Keep packages focused and reusable
- **Service Independence**: Each backend service owns its domain
- **Component Reusability**: Build for the POps suite, not just travel
- **Performance**: Leverage Turborepo caching and hot reload
- **Documentation**: Maintain Storybook stories for all components

## 💡 Type Management Strategy
- **Shared Types**: Use `@pops/types` for cross-app types
- **Domain Types**: Create in individual apps/services for specific needs  
- **Schema Validation**: Maintain Drizzle schemas as source of truth
- **API Types**: Generate from backend schemas when possible