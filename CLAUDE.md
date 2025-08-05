# Trip Organizer - Project Context

## 🚀 Current Status

**Status**: ✅ Core UI complete, ready for feature development
**Server**: Running on http://localhost:5174 (Node.js v24.5.0 required)
**Package Manager**: pnpm (migrated from Yarn for better performance)
**Last Updated**: January 2025

## 🏗️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Custom CSS + shadcn/ui components (Tailwind v4 compatibility issues resolved)
- **Icons**: Lucide React
- **Content**: Markdown files in `/content` directory structure

## 📁 Project Structure

```
src/
├── components/ui/          # shadcn/ui components (Button, Card)
├── lib/utils.ts           # Utility functions
├── App.tsx               # Main dashboard with category grid
├── index.css             # Global styles + CSS variables
└── main.tsx              # App entry point

content/
├── destinations/         # Travel destination guides
├── itinerary/           # Daily schedules and plans
├── transport/           # Flight, bus, train info
├── accommodation/       # Hotel and lodging details
├── activities/          # Things to do and experiences
├── budget/             # Cost tracking and planning
└── documents/          # Important travel documents
```

## 🎨 Current Features

### ✅ Completed

- **Responsive dashboard** with 7 category cards in grid layout
- **Color-coded categories** with custom icons
- **shadcn/ui integration** with proper styling
- **Hover effects** and clean card design
- **CSS Grid layout** (custom implementation due to Tailwind v4 issues)

### 📋 Content Categories

1. **Destinations** (Blue) - MapPin icon
2. **Itinerary** (Green) - Calendar icon
3. **Transport** (Purple) - Plane icon
4. **Accommodation** (Orange) - Home icon
5. **Activities** (Red) - Activity icon
6. **Budget** (Yellow) - DollarSign icon
7. **Documents** (Gray) - FileText icon

## 🛠️ Technical Notes

### CSS Architecture

- **Hybrid approach**: Custom CSS classes + shadcn/ui components
- **Tailwind v4**
- **CSS Variables**: Full shadcn/ui design system implemented
- **Grid**: Custom `.app-grid` class for responsive layout

### Known Issues Resolved

- ✅ Node.js version compatibility (requires v24.5.0+)
- ✅ PostCSS configuration for Tailwind v4
- ✅ CSS variable conflicts resolved
- ✅ Grid layout rendering fixed

## 🎯 Development Priorities

### High Priority Features

1. **Markdown Content System** - Parse and display content from `/content` directory
2. **Routing** - React Router for navigation between categories
3. **Category Pages** - Individual pages for each travel category

### Medium Priority Visual

1. **Missing Cards** - Currently only showing 4/7 category cards
2. **Quick Stats Styling** - Improve bottom stats section
3. **Mobile Responsive** - Better mobile layout optimization

### Future Features

- Content editing and saving
- Budget calculator
- Itinerary timeline
- Search and filtering
- Loading states and animations

## 🚀 Development Commands

```bash
# Ensure Node.js v24.5.0+
nvm use stable

# Frontend development
pnpm run dev         # http://localhost:5174

# Backend services (NX-powered)
pnpm services:dev    # Start all backend services with orchestration
pnpm services:stop   # Stop all backend services  
pnpm services:health # Check health of all services
pnpm services:build  # Build all backend services

# Raw NX commands (no orchestration)
pnpm services:dev:raw    # Start services in parallel (no startup order)
pnpm services:health:raw # Run NX health targets directly

# Build and quality checks
pnpm run build
pnpm run lint
pnpm run type-check
```

## 💡 Development Notes

- **shadcn/ui components** for consistent UI elements
- use Tailwind classes
- **Desktop-first with responsive layout** design principles
- Nothing is finished until lint, build, format and test pass with no errors

## 💡 Coding Guidelines

- use @ aliases whenever you can
- **Imports**: Whenever available, use destructured imports like { Banana } from "banana". Avoid defaults and * 
- Always export each export individually and avoid using defaults. so use "export function Banana = ..." instead of export default Banana; or adding export at the end of the file,dont do that

## 💡 Project Principles

- NO TASK IS FINISHED UNTIL ALL ERRORS HAVE BEEN RESOLVED