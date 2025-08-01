# 🇧🇷 Brazil Trip Organizer

A personal trip planning application built with React, TypeScript, and Vite to organize an amazing Brazilian adventure!

## Features

- **Destinations Management** - Research and organize places to visit
- **Itinerary Planning** - Create detailed daily schedules
- **Transport Tracking** - Manage flights, buses, and local transport
- **Accommodation Organization** - Keep track of hotels and bookings
- **Activities Planning** - Organize tours, restaurants, and attractions
- **Budget Management** - Track expenses and cost planning
- **Document Storage** - Organize travel documents and important info

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
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
- `yarn lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── lib/
│   └── utils.ts      # Utility functions
└── App.tsx           # Main application component

content/              # Markdown content files
├── destinations/
├── itinerary/
├── transport/
├── accommodation/
├── activities/
├── budget/
└── documents/
```

## Future Enhancements

- Markdown file parsing and display
- Search and filtering functionality
- Interactive maps integration
- Expense tracking with charts
- Export to PDF functionality
- Offline support
- Mobile responsiveness improvements

## License

Private repository for personal use.
