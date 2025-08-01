# ✈️ Trip Organizer

A comprehensive trip planning application built with React, TypeScript, and Vite to organize multiple trips and adventures around the world!

## ✅ Current Features

### 🗂️ **Multi-Trip Management System**

- **Trip Selector Interface** - Beautiful trip selection with empty states and creation flow
- **Trip Context Management** - Global state management with localStorage persistence
- **New Trip Creation** - Professional form with validation for title, destination, dates, and type
- **Trip-Aware Navigation** - Header shows current trip with switching capability
- **Database Integration** - Persistent trip storage with user management

### 🔧 **Full-Stack Architecture**

- **tRPC Backend API** - Type-safe API with Express.js and Prisma ORM
- **Frontend-Backend Connection** - React Query integration with authentication
- **Database Schema** - Trip, User, and Collaborator models with SQLite
- **Development User** - Mock authentication for seamless development experience
- **Health Monitoring** - Connection status indicators and error handling

### 🎨 **Modern UI & Developer Experience**

- **Professional Design** - shadcn/ui components with consistent styling
- **Loading States** - Skeleton components and connection indicators
- **Form Validation** - Client-side validation with user feedback
- **Error Boundaries** - Comprehensive error handling throughout the app
- **TypeScript** - Full type safety with strict ESLint rules (no `any` types!)
- **Code Quality** - ESLint + Prettier + Husky pre-commit hooks

## 🚧 In Progress & Todo

### 🔧 **Next Up**

- [ ] **Content Editing System** - Rich editor for creating/editing trip content
- [ ] **Mobile Responsive Design** - Make app work beautifully on phones/tablets
- [ ] **Budget Calculator** - Add expense tracking and budget management
- [ ] **Content Display Enhancement** - Show Rio de Janeiro and sample content in category pages

### 🚀 **Backend & Production**

- [ ] **Backend API Development** - Node.js/Express or Python/FastAPI backend
  - Database design (PostgreSQL/MongoDB)
  - User authentication & authorization
  - Trip data persistence (itineraries, content, budget)
  - RESTful API endpoints
  - Data validation & security
- [ ] **Multi-user Support** - User accounts, trip sharing, collaboration
- [ ] **Database Integration** - Replace in-memory storage with persistent DB
- [ ] **Authentication System** - Login, registration, JWT tokens
- [ ] **API Client Integration** - Replace services with API calls
- [ ] **Deployment Setup** - Docker, CI/CD, hosting (Vercel + Railway/Supabase)

### 🎯 **Future Enhancements**

- [ ] **Hover Animations** - Add micro-interactions for polished UI
- [ ] **Loading States** - Skeleton components and loading indicators
- [ ] **Search & Filtering** - Find content and itinerary items quickly
- [ ] **Image Upload** - Add photos to destinations and activities (requires backend)
- [ ] **Interactive Maps** - Integration for location visualization
- [ ] **Export to PDF** - Generate trip documents
- [ ] **Offline Support** - Work without internet connection
- [ ] **Real-time Collaboration** - Live updates when multiple users edit
- [ ] **Trip Templates** - Pre-built templates for different destinations worldwide

## Tech Stack

- **Architecture**: Nx monorepo with yarn workspaces
- **Frontend**: React 19 with TypeScript (apps/web)
- **Backend**: tRPC with Express.js and Prisma ORM (apps/api)
- **Database**: SQLite with Prisma client generation
- **Shared Packages**: Types and utilities (packages/types, packages/shared)
- **Build Tools**: Vite 7 (frontend), tsx (backend), tsup (packages)
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Query + tRPC + Context API
- **Code Quality**: ESLint + Prettier + Husky
- **Node Version**: v24.5.0 (required for Vite 7 compatibility)

## Getting Started

### Prerequisites

- **Node.js v24.5.0+** (required for Vite 7 compatibility)
- **Yarn v1.22.22** package manager
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
yarn install
```

4. Start all development servers:

```bash
yarn dev
```

5. **Alternative**: Run services individually in separate terminals:

```bash
# Terminal 1: API Server
yarn nx run api:dev

# Terminal 2: Web App  
yarn nx run web:dev
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

- `yarn dev` - Start all development servers (Nx run-many)
- `yarn build` - Build all apps and packages
- `yarn lint` - Run ESLint across all projects
- `yarn lint:fix` - Auto-fix ESLint issues
- `yarn format` - Format code with Prettier
- `yarn type-check` - Run TypeScript type checking
- `yarn nx run api:dev` - Start API server only
- `yarn nx run web:dev` - Start web app only
- `yarn nx run api:db:generate` - Generate Prisma client
- `yarn nx run api:db:push` - Push database schema changes

### Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (Card, Button, etc.)
│   ├── AppSidebar.tsx   # Main navigation sidebar
│   ├── AppHeader.tsx    # Top navigation header
│   ├── Dashboard.tsx    # Main dashboard with overview
│   ├── ItineraryView.tsx # Timeline view for trip planning
│   ├── CategoryPage.tsx # Content category displays (needs debugging)
│   └── ContentViewer.tsx # Markdown content renderer
├── services/
│   ├── contentService.ts    # Content CRUD operations
│   └── itineraryService.ts  # Itinerary management with sample data
├── types/
│   └── itinerary.ts    # TypeScript interfaces for trip data
├── lib/
│   └── utils.ts        # Utility functions (cn, etc.)
└── App.tsx             # Main application component

content/                # Markdown content files
├── destinations/       # Rio de Janeiro sample content
├── itinerary/         # Sample day planning
├── transport/         # (empty, ready for content)
├── accommodation/     # (empty, ready for content)
├── activities/        # (empty, ready for content)
├── budget/           # (empty, ready for content)
└── documents/        # (empty, ready for content)
```

## 🤖 Development Notes

**For Claude Code Assistant:**

- Always read this README before starting work
- Update the "In Progress & Todo" section when completing tasks
- Move completed items from Todo to "Current Features"
- Add new features discovered during development to the appropriate sections
- Keep the project structure updated as new files are added
- Update available scripts when new npm scripts are added

## License

Private repository for personal use.
