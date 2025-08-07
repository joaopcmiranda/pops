# 🚀 POps - Personal Operations Suite

**POps** (Personal Operations) is a comprehensive suite of applications designed to streamline personal life management. Built with modern web technologies including React, TypeScript, and a robust monorepo architecture using Turborepo.

> **Latest Update**: Recently migrated from NX to Turborepo for simplified build orchestration while maintaining all functionality and improving hot reload performance.

## 📚 Table of Contents

- [Quick Start](#-quick-start)
- [Current Status](#-current-status)
- [Architecture](#-architecture)
- [Port Strategy](#-port-strategy)
- [Development](#-development)
- [Roadmap](#-roadmap)
- [Known Issues](#-known-issues)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js v24.5.0+** (required for Vite 7 compatibility)
- **pnpm v10.14.0+** package manager
- **nvm** (recommended for Node version management)

### Installation

```bash
# Clone repository
git clone https://github.com/joaopcmiranda/pops.git
cd pops

# Use correct Node version
nvm use 24.5.0

# Install dependencies
pnpm install

# Start everything (frontend + backend)
pnpm dev

# Or start services separately
pnpm services:dev    # Backend services only
pnpm dev:travel      # Travel app frontend only
```

### Access Points

- **Travel App**: [http://localhost:4003](http://localhost:4003)
- **Trip Service**: [http://localhost:8030/health](http://localhost:8030/health)
- **Production**: [travel.mymops.io](https://travel.mymops.io)
- **Storybook**: [http://localhost:6006](http://localhost:6006) (run `pnpm storybook`)

---

## 🎯 Current Status

### ✅ Travel Organizer (First POps App)

The travel organizer is live and functional with the following features:

#### Core Features
- **Multi-Trip Management** - Create, manage, and switch between multiple trips
- **Rich Content Editor** - TipTap WYSIWYG editor with markdown support
- **Auto-save** - Automatic content saving with configurable delays
- **Trip Context** - Global state management with localStorage persistence
- **Database Integration** - SQLite with Drizzle ORM

#### Technical Implementation
- **Frontend**: React 19 + TypeScript + Vite 7
- **Backend**: Fastify + Direct API Client + Drizzle ORM
- **UI Library**: shadcn/ui components + Tailwind CSS v4
- **State Management**: React Query + Context API
- **Documentation**: Comprehensive Storybook stories

### 🚧 In Progress

- [ ] Mobile responsive design optimization
- [ ] Budget calculator integration
- [ ] Calendar view with trip dates
- [ ] Content routing for category pages
- [ ] Real JWT authentication (currently mock)
- [ ] PostgreSQL migration for production

---

## 🏗 Architecture

### Tech Stack

- **Monorepo**: Turborepo with pnpm workspaces
- **Frontend**: React 19, TypeScript, Vite 7, Tailwind CSS v4
- **Backend**: Fastify, Direct API Client, Drizzle ORM (SQLite)
- **UI Components**: shadcn/ui with Radix UI
- **Database**: SQLite (dev), PostgreSQL (planned for prod)
- **Code Quality**: ESLint, Prettier, Husky, TypeScript strict mode

### Project Structure

```
pops/
├── apps/
│   └── travel/                 # Travel organizer frontend app
│       ├── src/
│       │   ├── components/     # App-specific components
│       │   ├── contexts/       # React contexts
│       │   ├── hooks/          # Custom hooks
│       │   └── utils/          # Utilities
│       └── vite.config.ts      # Vite configuration
│
├── services/                   # Backend microservices
│   ├── trip-service/          # Trip management (port 8030)
│   ├── itinerary-service/     # Itinerary management (port 8031)
│   └── user-service/          # User management (port 8011)
│
├── packages/                   # Shared packages
│   ├── ui/                    # Shared UI component library
│   ├── types/                 # Shared TypeScript types and schemas
│   ├── api-client/           # Direct API client for service communication
│   └── shared/               # Shared utilities
│
├── turbo.json                 # Turborepo configuration
└── pnpm-workspace.yaml        # pnpm workspace configuration
```

---

## 🔌 Port Strategy

POps uses a systematic port allocation strategy for scalable development:

### Port Ranges
- **Frontend Applications**: `4000-4099`
- **Backend Services**: `8000-8099`

### Current Active Ports

#### Frontend (4000s)
| Port | Application | Status |
|------|-------------|--------|
| **4003** | Travel Organizer | ✅ Active |

#### Backend (8000s)
| Port | Service | Status |
|------|---------|--------|
| **8011** | User Service | ✅ Active |
| **8030** | Trip Service | ✅ Active |
| **8031** | Itinerary Service | ✅ Active |

### Future Port Allocations

<details>
<summary>View Complete Port Strategy</summary>

#### Frontend Applications (4000-4099)
- `4000` - POps Hub (main dashboard)
- `4001` - Auth & Accounts
- `4002` - Money Manager
- `4004` - Event Manager
- `4005` - Document Manager
- `4006` - Recipe Manager
- `4007` - Home Inventory
- `4008` - Health & Fitness
- `4009` - Admin Dashboard

#### Backend Services (8000-8099)

**Core Infrastructure (8000-8009)**
- `8001` - Health Monitor
- `8002` - Configuration Service
- `8006` - Analytics
- `8008` - Centralized Logging

**Authentication (8010-8019)**
- `8010` - Auth Service
- `8011` - User Management
- `8013` - Permissions (RBAC)

**Financial Services (8020-8029)**
- `8020` - Budget Service
- `8021` - Expense Tracker
- `8022` - Cost Splitter
- `8023` - Currency Service

**Travel Services (8030-8039)**
- `8030` - Trip Management
- `8031` - Itinerary Service
- `8032` - Travel Budget
- `8036` - Weather Service

**Event Services (8040-8049)**
- `8040` - Event Management
- `8041` - Guest Management
- `8042` - Calendar Service

**Document Services (8050-8059)**
- `8050` - Document Storage
- `8051` - Document Indexing
- `8054` - OCR Service

**Shared Services (8080-8089)**
- `8080` - Notification Service
- `8081` - File Processing
- `8084` - Email Service

</details>

---

## 💻 Development

### Available Commands

#### Development
```bash
pnpm dev              # Start everything
pnpm dev:travel       # Start travel app only
pnpm dev:services     # Start all backend services
pnpm dev:backend      # Start backend services
pnpm dev:frontend     # Start frontend apps
```

#### Services Management
```bash
pnpm services:dev     # Start backend with orchestration
pnpm services:stop    # Stop all backend services
pnpm services:health  # Check service health
pnpm services:build   # Build all services
```

#### Code Quality
```bash
pnpm lint            # Run ESLint
pnpm lint:fix        # Fix ESLint issues
pnpm format          # Format with Prettier
pnpm format:check    # Check formatting
pnpm type-check      # TypeScript checking
pnpm check           # Run all checks
```

#### Storybook
```bash
pnpm storybook       # Start Storybook dev server
pnpm build-storybook # Build Storybook for deployment
```

### Environment Setup

Each service has its own `.env.example` file. Copy to `.env` and configure:

```bash
# Example for Trip Service
cp services/trip-service/.env.example services/trip-service/.env
```

### Hot Reload

The project uses Turborepo for intelligent hot reloading:
- Changes in `packages/ui` → Automatic reload of apps using those components
- Changes in shared packages → Services rebuild automatically
- All services run with `tsx watch --clear-screen=false` for instant backend updates
- Smart caching prevents unnecessary rebuilds

---

## 🌟 Roadmap

### POps Application Suite

POps is designed as a comprehensive personal operations platform with multiple integrated applications:

#### Phase 1: Core Infrastructure ✅
- [x] Monorepo setup with Turborepo (migrated from NX)
- [x] Shared UI component library
- [x] Travel Organizer MVP
- [x] Microservices architecture with proper port allocation
- [x] Hot reload cascade system

#### Phase 2: Authentication & Multi-App (Current)
- [ ] Real JWT authentication
- [ ] User management system
- [ ] POps Hub (main dashboard)
- [ ] Cross-app navigation

#### Phase 3: Financial Suite
- [ ] Budget & Money Manager
- [ ] Expense Tracker
- [ ] Cost Splitting Calculator
- [ ] Trip-specific budgeting

#### Phase 4: Lifestyle Applications
- [ ] Event/Party Manager
- [ ] Document Manager
- [ ] Recipe Manager
- [ ] Home Inventory

#### Phase 5: Advanced Features
- [ ] AI-powered suggestions
- [ ] Real-time collaboration
- [ ] Mobile applications
- [ ] Offline support

### Travel Organizer Enhancements

**Immediate Priorities**
- Mobile responsive design
- Budget calculator
- Calendar integration
- Content routing

**Future Features**
- AI trip assistant
- Interactive maps
- Weather integration
- Export to PDF
- Trip templates
- Currency converter

---

## 🚨 Known Issues

1. **Node Version** - Must use Node v24.5.0+ for Vite 7 compatibility
2. **Content Routing** - Content display not connected to editor system yet
3. **Mobile Responsive** - UI needs optimization for mobile devices
4. **Authentication** - Currently using mock authentication for development

---

## 🤖 Development Notes

### For Contributors

- Read `CLAUDE.md` for AI assistant instructions
- Follow the port strategy when adding services
- Update this README when adding features
- Ensure all checks pass before committing:
  ```bash
  pnpm check
  ```

### Content Management

The travel app supports markdown-based content in `/content` (future feature):
- `destinations/` - Travel destination guides
- `itinerary/` - Daily schedules
- `transport/` - Travel bookings
- `accommodation/` - Lodging details
- `activities/` - Tours and experiences
- `budget/` - Cost tracking
- `documents/` - Important documents

*Note: Content routing is currently in development.*

---

## 📝 License

Private repository for personal use.

---

## 🔗 Links

- **Production**: [travel.mymops.io](https://travel.mymops.io)
- **Repository**: [github.com/joaopcmiranda/pops](https://github.com/joaopcmiranda/pops)