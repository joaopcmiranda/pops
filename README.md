# 🇧🇷 Brazil Trip Organizer

A personal trip planning application built with React, TypeScript, and Vite to organize an amazing Brazilian adventure!

## ✅ Current Features

### 🗓️ **Comprehensive Itinerary System**

- **Timeline View** - Beautiful day-by-day organization with stats
- **Accommodation Management** - Hotels, friends' houses, parents' house, own house
- **Event System** - Christmas, New Year's, etc. with people tracking and attendees
- **Work Integration** - Research locations, interviews, remote work with company contacts
- **Overarching Events** - Carnival support with sub-activities
- **Sample Data** - Christmas dinner, parents' house stay, work interviews

### 🎨 **Modern UI & Developer Experience**

- **Beautiful Dashboard** - Overview cards and category navigation
- **shadcn/ui Components** - Professional, consistent design system
- **TypeScript** - Full type safety with strict ESLint rules (no `any` types!)
- **Code Quality** - ESLint + Prettier + Husky pre-commit hooks
- **Responsive Design** - Works on desktop (mobile improvements coming)

### 📄 **Content Management Foundation**

- **Markdown Support** - Content stored in `/content` directory
- **Content Service** - CRUD operations for trip content
- **Sample Content** - Rio de Janeiro destination, sample itinerary

## 🚧 In Progress & Todo

### 🔧 **Next Up**

- [ ] **Fix CategoryPage Navigation** - Debug import issues to enable destinations/documents viewing
- [ ] **Content Editing System** - Rich editor for creating/editing trip content
- [ ] **Mobile Responsive Design** - Make app work beautifully on phones/tablets
- [ ] **Budget Calculator** - Add expense tracking and budget management

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
- [ ] **Trip Templates** - Pre-built templates for different Brazil destinations

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier + Husky
- **Content Management**: Markdown files in `/content` directory

## Getting Started

### Prerequisites

- Node.js 20.19.0+ or 22.12.0+
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/joaopcmiranda/brazil-trip-organizer.git
cd brazil-trip-organizer
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

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

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint with TypeScript rules
- `yarn lint:fix` - Auto-fix ESLint issues
- `yarn format` - Format code with Prettier
- `yarn type-check` - Run TypeScript type checking

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
