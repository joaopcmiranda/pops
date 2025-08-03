# ✈️ Trip Organizer

A comprehensive trip planning application built with React, TypeScript, and Vite to organize multiple trips and adventures around the world!

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

### 🎨 **Modern UI & Developer Experience**

- **Professional Design** - shadcn/ui components with consistent styling
- **Loading States** - Skeleton components and connection indicators
- **Form Validation** - Client-side validation with user feedback
- **Error Boundaries** - Comprehensive error handling throughout the app
- **TypeScript** - Full type safety with strict ESLint rules (no `any` types!)
- **Code Quality** - ESLint + Prettier + TypeScript checks all passing
- **Component Library** - Full shadcn/ui integration with custom components
- **Storybook Integration** - Ladle stories for all UI components
- **Responsive Layout** - Sidebar navigation with collapsible design

## 🚧 In Progress & Todo

### 🔧 **Immediate Priorities**

- [ ] **Fix Category Pages** - Debug content loading and display issues in category pages
- [ ] **Content Editing System** - Rich editor for creating/editing trip content
- [ ] **Mobile Responsive Design** - Optimize for phones/tablets (sidebar, cards, forms)
- [ ] **Budget Calculator** - Add expense tracking and budget management
- [ ] **Calendar Integration** - Connect calendar view with actual trip dates

### 🚀 **Backend Enhancements**

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

## Tech Stack

> **📦 Package Manager Migration**: Successfully migrated from Yarn to pnpm for faster installs, better dependency management, and reduced disk usage.

- **Architecture**: Nx monorepo with pnpm workspaces
- **Frontend**: React 19 with TypeScript (apps/web)
- **Backend**: tRPC with Express.js and Prisma ORM (apps/api)
- **Database**: SQLite with Prisma client generation
- **Shared Packages**: Types and utilities (packages/types, packages/shared)
- **Build Tools**: Vite 7 (frontend), tsx (backend), tsup (packages)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
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
git clone https://github.com/joaopcmiranda/trip-organizer.git
cd trip-organizer
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
pnpm run dev
```

5. **Alternative**: Run services individually in separate terminals:

```bash
# Terminal 1: API Server
pnpm nx run api:dev

# Terminal 2: Web App  
pnpm nx run web:dev
```

6. Open the application:
   - **Frontend**: [http://localhost:5173](http://localhost:5173) 
   - **API Health**: [http://localhost:3001/health](http://localhost:3001/health)

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

- `pnpm run dev` - Start all development servers (Nx run-many)
- `pnpm run build` - Build all apps and packages
- `pnpm run lint` - Run ESLint across all projects
- `pnpm run lint:fix` - Auto-fix ESLint issues
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check code formatting
- `pnpm run type-check` - Run TypeScript type checking
- `pnpm nx run api:dev` - Start API server only
- `pnpm nx run web:dev` - Start web app only
- `pnpm nx run web:storybook` - Start Ladle for component development
- `pnpm nx run api:db:generate` - Generate Prisma client
- `pnpm nx run api:db:push` - Push database schema changes

### Project Structure

```
trip-organizer/
├── apps/
│   ├── api/                    # Backend API server
│   │   ├── src/
│   │   │   ├── config/         # Database, env, tRPC configuration
│   │   │   ├── middleware/     # Auth, error handling, rate limiting
│   │   │   ├── routes/         # tRPC routers (trip, user, content)
│   │   │   └── index.ts        # Express server entry point
│   │   └── prisma/
│   │       └── schema.prisma   # Database schema
│   └── web/                    # Frontend React app
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/         # shadcn/ui components library
│       │   │   ├── forms/      # Trip form components
│       │   │   └── *.tsx       # App components (Header, Sidebar, etc.)
│       │   ├── contexts/       # React contexts (TripContext)
│       │   ├── hooks/          # Custom React hooks
│       │   ├── services/       # API services (tRPC integration)
│       │   └── types/          # TypeScript type definitions
│       └── .storybook/         # Ladle configuration
├── packages/
│   ├── shared/                 # Shared utilities
│   └── types/                  # Shared TypeScript types
├── content/                    # Markdown content files
│   ├── destinations/           # Travel destination guides
│   ├── itinerary/             # Daily schedules
│   └── ...                    # Other content categories
└── nx.json                    # Nx workspace configuration
```

## 🚨 Known Issues

1. **Category Pages** - Content display not working properly, needs debugging
2. **Node Version** - Must use Node v24.5.0+ for Vite 7 compatibility
3. **Type Casting** - Compression middleware requires type casting due to version mismatch

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
