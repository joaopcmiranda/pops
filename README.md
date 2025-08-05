# 🚀 POps - Personal Operations Suite

**POps** (Personal Operations) is a comprehensive suite of applications designed to streamline personal life management. Built with modern web technologies including React, TypeScript, and a robust monorepo architecture.

## 🎯 Current App: Travel Organizer ✈️

**Live at**: [travel.mymops.io](https://travel.mymops.io)

The first POps application - a comprehensive trip planning platform to organize multiple trips and adventures around the world!

## ✅ Current Features

### 🗂️ **Multi-Trip Management System**

- **Trip Selector Interface** - Beautiful trip selection with empty states and creation flow
- **Trip Context Management** - Global state management with localStorage persistence
- **New Trip Creation** - Professional form with validation for title, destination, dates, and type
- **Trip-Aware Navigation** - Header shows current trip with switching capability
- **Database Integration** - Persistent trip storage with user management
- **Trip Management** - Create, read, update, and delete trips with full CRUD operations

### 🔧 **Full-Stack Architecture**

- **tRPC Backend API** - Type-safe API with Express.js and Prisma ORM
- **Frontend-Backend Connection** - React Query integration with authentication
- **Database Schema** - Trip, User, and Collaborator models with SQLite
- **Development User** - Mock authentication for seamless development experience
- **Health Monitoring** - Connection status indicators and error handling
- **API Endpoints** - Complete trip, user, itinerary, and content management endpoints

### 📝 **Rich Content Editing System** ✨

- **TipTap WYSIWYG Editor** - Professional rich text editing with markdown support
- **Auto-save Functionality** - Automatic saving after user stops typing (configurable delay)
- **Content-Type-Specific Toolbars** - Different tools for itinerary, budget, destinations, etc.
- **Multiple Editor Variants** - Full editor, inline editor, and modal editor components
- **Character & Word Counting** - Real-time text statistics and content limits
- **Advanced Features** - Tables, task lists, links, images, headings, and rich formatting
- **Provider System** - Comprehensive state management with dirty tracking and error handling
- **Keyboard Shortcuts** - Ctrl+S manual save, formatting shortcuts, and accessibility
- **Shared UI Library** - Editor components migrated to packages/ui for reusability across apps

### 🎨 **Modern UI & Developer Experience** ✨

- **Professional Design** - shadcn/ui components with consistent styling
- **Loading States** - Skeleton components and connection indicators
- **Form Validation** - Client-side validation with user feedback
- **Error Boundaries** - Comprehensive error handling throughout the app
- **TypeScript** - Full type safety with strict ESLint rules (no `any` types!)
- **Code Quality** - ESLint + Prettier + TypeScript checks all passing
- **Shared UI Library** - Complete packages/ui with reusable components (Button, Card, Dialog, Form, etc.)
- **Comprehensive Storybook** - All UI components documented with variants, controls, and examples
- **Responsive Layout** - Sidebar navigation with collapsible design
- **Monorepo Architecture** - Nx workspace with optimized build system and shared packages

## 🚧 In Progress & Todo

### 🔧 **Immediate Priorities**

- [ ] **Mobile Responsive Design** - Optimize for phones/tablets (sidebar, cards, forms)
- [ ] **Budget Calculator** - Add expense tracking and budget management
- [ ] **Calendar Integration** - Connect calendar view with actual trip dates
- [ ] **Content Routing** - Connect editor to category pages and content display
- [ ] **Wishlist Feature** - Allow users to add places, activities, food, experiences to a wishlist

### 🚀 **Backend Enhancements**

- [ ] **Trip Sharing** - Allow sharing trips with other users (collaborators)
- [ ] **Real Authentication** - Replace mock user with proper JWT authentication
- [ ] **Multi-user Support** - User accounts, trip sharing, collaboration features
- [ ] **PostgreSQL Migration** - Move from SQLite to PostgreSQL for production
- [ ] **File Upload** - Support for images and documents in trips
- [ ] **API Rate Limiting** - Implement proper rate limiting for production
- [ ] **Deployment Setup** - Docker, CI/CD, hosting (Vercel + Railway/Supabase)

### 🎯 **Future Enhancements**

- [ ] **AI Trip Assistant** - AI-powered suggestions for activities and itineraries
- [ ] **Interactive Maps** - Map integration for location visualization
- [ ] **Export to PDF** - Generate printable trip documents
- [ ] **Offline Support** - Work without internet connection via service workers
- [ ] **Real-time Collaboration** - Live updates when multiple users edit
- [ ] **Trip Templates** - Pre-built templates for popular destinations
- [ ] **Weather Integration** - Show weather forecasts for trip dates
- [ ] **Currency Converter** - Real-time currency conversion for budgets
- [ ] **Travel Checklist** - Customizable packing and preparation lists
- [ ] **Trip Sharing** - Share read-only trip views with friends/family

## 🌟 POps App Suite Roadmap

POps is designed as a comprehensive personal operations platform. The travel organizer is just the beginning!

### 🚀 **Planned Applications**

#### 💰 **Financial Management Suite**
- **💳 Budget & Money Management** - Personal finance tracking, budgeting, expense categorization
- **✈️ Trip Money Management** - Integrated with travel app for trip-specific budgeting and expense tracking
- **🧾 Cost Splitting** - Split expenses for trips, events, home expenses, and group activities with automated calculations

#### 🎉 **Lifestyle & Organization**
- **🎊 Event/Party Manager** - Plan and organize events, parties, gatherings with guest management and coordination
- **📄 Document Manager** - Secure document storage, organization, and sharing for important personal documents
- **🍳 Recipe Manager** - Recipe collection, meal planning, grocery list generation, and cooking schedule
- **🏠 Home Inventory** - Track household items, warranties, maintenance schedules, and replacement planning

#### 🔮 **Future Concepts**
- **📚 Learning Tracker** - Course progress, skill development, certification tracking
- **💪 Health & Fitness Hub** - Workout planning, nutrition tracking, health metrics dashboard
- **📱 Digital Life Manager** - Subscription tracking, digital asset organization, online account management
- **🌱 Habit Tracker** - Build and maintain positive habits with progress visualization
- **📊 Personal Analytics** - Cross-app insights and life optimization recommendations

### 🔗 **Integrated Ecosystem**
All POps applications will share:
- **Unified UI Library** - Consistent design language across all apps
- **Cross-App Data Integration** - Trip budgets connect to money management, event costs to cost splitting
- **Single Sign-On** - One account for all POps applications
- **Shared Calendar** - Events, trips, and schedules in one unified timeline

## Tech Stack

> **📦 Package Manager Migration**: Successfully migrated from Yarn to pnpm for faster installs, better dependency management, and reduced disk usage.
> 
> **🔧 Service Management Migration**: Migrated bash scripts to NX-powered service orchestration for better task management, caching, and developer experience while maintaining all existing functionality.

- **Architecture**: Nx monorepo with pnpm workspaces (designed for multi-app suite)
- **Frontend**: React 19 with TypeScript (apps/travel - first POps app)
- **Backend**: tRPC with Express.js and Prisma ORM (apps/api - shared backend for all POps apps)
- **Database**: SQLite with Prisma client generation
- **Rich Text Editor**: TipTap with extensions (CharacterCount, Focus, Image, Table, TaskList, etc.)
- **Shared Packages**: Complete UI library (packages/ui), types (packages/types), utilities (packages/shared), database models (packages/database)
- **Build Tools**: Vite 7 (frontend), tsx (backend), tsup (packages)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Component Documentation**: Storybook with comprehensive stories
- **Icons**: Lucide React
- **State Management**: React Query + tRPC + Context API
- **Code Quality**: ESLint + Prettier + Husky
- **Node Version**: v24.5.0 (required for Vite 7 compatibility)

## Getting Started

### Prerequisites

- **Node.js v24.5.0+** (required for Vite 7 compatibility)
- **pnpm v10.14.0+** package manager (fast, efficient, strict dependency management)
- **nvm** (recommended for Node version management)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/joaopcmiranda/pops.git
cd pops
```

2. Use the correct Node.js version:

```bash
nvm use 24.5.0
```

3. Install dependencies:

```bash
pnpm install
```

4. Start all development servers:

```bash
# Frontend + Backend (full stack)
pnpm run dev

# Backend services only (NX-powered with orchestration)
pnpm services:dev
```

5. **Alternative**: Run services individually:

```bash
# Terminal 1: Backend services (orchestrated startup with health checks)
pnpm services:dev

# Terminal 2: Travel App frontend
pnpm nx run travel:dev
```

6. Open the application:
   - **Travel App**: [http://localhost:5174](http://localhost:5174)
   - **Production**: [travel.mypops.io](https://travel.mypops.io)
   - **API Health**: [http://localhost:3001/health](http://localhost:3001/health)
   - **Storybook**: [http://localhost:6006](http://localhost:6006) (run `pnpm run storybook` in apps/travel)

## Content Management

The app uses a markdown-based content system located in the `/content` directory:

- `destinations/` - Information about places to visit
- `itinerary/` - Daily schedules and trip timeline
- `transport/` - Flight bookings, train tickets, etc.
- `accommodation/` - Hotel bookings and lodging details
- `activities/` - Tours, experiences, restaurants
- `budget/` - Cost breakdowns and expense tracking
- `documents/` - Travel documents and important info

Simply add markdown files to these directories and the app will automatically load and display them.

## Development

### Available Scripts

#### 🏃‍♂️ **Development & Build**
- `pnpm run dev` - Start all development servers (Nx run-many)
- `pnpm run build` - Build all apps and packages
- `pnpm nx run travel:dev` - Start travel app frontend only

#### 🔧 **Backend Services (NX-Powered)**
- `pnpm services:dev` - Start all backend services with orchestration and health checks
- `pnpm services:stop` - Stop all backend services gracefully
- `pnpm services:health` - Check health status of all services
- `pnpm services:build` - Build all backend services
- `pnpm services:start` - Start built services in production mode
- `pnpm services:dev:raw` - Start services in parallel (no orchestration)
- `pnpm services:health:raw` - Run NX health targets directly

#### 🧹 **Code Quality**
- `pnpm run lint` - Run ESLint across all projects
- `pnpm run lint:fix` - Auto-fix ESLint issues
- `pnpm run format` - Format code with Prettier  
- `pnpm run format:check` - Check code formatting
- `pnpm run type-check` - Run TypeScript type checking

#### 📚 **Development Tools**
- `pnpm run storybook` - Start Storybook for component development (from apps/travel)
- `pnpm run build-storybook` - Build Storybook for deployment (from apps/travel)

#### 🗄️ **Database (Legacy API)**
- `pnpm nx run api:db:generate` - Generate Prisma client
- `pnpm nx run api:db:push` - Push database schema changes

### Project Structure

```
pops/ (POps Personal Operations Suite)
├── apps/
│   ├── api/                    # Shared backend API for all POps apps
│   │   ├── src/
│   │   │   ├── config/         # Database, env, tRPC configuration
│   │   │   ├── middleware/     # Auth, error handling, rate limiting
│   │   │   ├── routes/         # tRPC routers (trip, user, content, future: budget, events)
│   │   │   └── index.ts        # Express server entry point
│   │   └── prisma/
│   │       └── schema.prisma   # Database schema (extensible for all POps apps)
│   └── travel/                 # Travel Organizer (first POps app) ✈️
│       ├── src/
│       │   ├── components/     # Travel-specific components (Header, Sidebar, etc.)
│       │   ├── contexts/       # React contexts (TripContext)
│       │   ├── hooks/          # Custom React hooks
│       │   ├── services/       # API services (tRPC integration)
│       │   └── types/          # TypeScript type definitions
│       └── .storybook/         # Storybook configuration
├── packages/                   # Shared across all POps applications
│   ├── ui/                     # Unified UI component library ✨
│   │   ├── src/components/     # All shadcn/ui components with stories
│   │   │   ├── editor/         # TipTap content editing components
│   │   │   ├── button/         # Button component with variants
│   │   │   ├── card/           # Card component
│   │   │   ├── dialog/         # Modal dialog components
│   │   │   └── ...             # 20+ other UI components
│   │   └── src/typography/     # Typography system
│   ├── database/               # Database models and utilities (shared schemas)
│   ├── shared/                 # Shared utilities and helpers
│   └── types/                  # Shared TypeScript types
├── content/                    # Travel app content files
│   ├── destinations/           # Travel destination guides
│   ├── itinerary/             # Daily schedules
│   └── ...                    # Other content categories
└── nx.json                    # Nx workspace configuration
```

## 🚨 Known Issues

1. **Category Pages** - Content display not connected to editor system yet
2. **Node Version** - Must use Node v24.5.0+ for Vite 7 compatibility
3. **Type Casting** - Compression middleware requires type casting due to version mismatch
4. **API Type Errors** - Backend has unresolved Prisma type issues (doesn't affect frontend development)

## 🤖 Development Notes

**For Claude Code Assistant:**

- Always read this README and CLAUDE.md before starting work
- Update the "In Progress & Todo" section when completing tasks
- Move completed items from Todo to "Current Features"
- Add new features discovered during development to the appropriate sections
- Keep the project structure updated as new files are added
- Update available scripts when new npm scripts are added
- Run `pnpm run lint`, `pnpm run type-check`, and `pnpm run format:check` before committing
- All code quality checks must pass before pushing

## License

Private repository for personal use.
