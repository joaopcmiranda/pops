# @pops/navigation

Shared navigation components and cross-domain utilities for the POps Personal Operations Suite.

## Overview

This package provides unified navigation components that work across all POps applications (mypops.io, travel.mypops.io, money.mypops.io, etc.). It handles cross-domain routing, shared authentication state, and consistent user experience across the entire suite.

## Features

- **UnifiedHeader**: Consistent header component across all POps apps
- **DomainSwitcher**: Navigation between different POps applications
- **Cross-Domain State**: Shared authentication and user state
- **Notification Center**: Centralized notifications across apps
- **Domain Configuration**: Centralized domain and routing configuration

## Installation

```bash
pnpm add @pops/navigation
```

## Usage

### UnifiedHeader

The main header component that provides consistent navigation across all POps apps:

```tsx
import { UnifiedHeader } from '@pops/navigation'

export function App() {
  return (
    <div>
      <UnifiedHeader
        currentApp='travel'
        title='Trip Organizer'
        showDomainSwitcher={true}
        showNotifications={true}
      />
      {/* Your app content */}
    </div>
  )
}
```

### Domain Configuration

Access domain configuration and URL helpers:

```tsx
import { POPS_DOMAINS, getAppUrl } from '@pops/navigation'

// Navigate to money app
const moneyUrl = getAppUrl('money', '/dashboard')
window.location.href = moneyUrl
```

### App Suite Context

Manage shared state across POps applications:

```tsx
import { AppSuiteProvider, useAppSuite } from '@pops/navigation'

function MyApp() {
  return (
    <AppSuiteProvider currentApp='travel'>
      <AppContent />
    </AppSuiteProvider>
  )
}

function AppContent() {
  const { currentUser, notifications, switchToApp } = useAppSuite()

  return (
    <div>
      <p>Welcome {currentUser?.name}</p>
      <button onClick={() => switchToApp('money')}>Go to Money Manager</button>
    </div>
  )
}
```

## Components

### UnifiedHeader

Main navigation header for all POps apps.

**Props:**

- `currentApp`: Current POps app identifier
- `title`: Page title to display
- `showDomainSwitcher`: Show app switcher dropdown
- `showNotifications`: Show notification bell
- `showSearch`: Show global search
- `customActions`: Custom action buttons

### DomainSwitcher

Dropdown component for switching between POps applications.

### UserMenu

Global user menu with profile, settings, and logout options.

### NotificationCenter

Centralized notification system across all POps apps.

## API

### Domain Configuration

- `POPS_DOMAINS`: Object containing all POps domain mappings
- `getAppUrl(app, path?)`: Generate URL for specific POps app
- `getCurrentApp()`: Detect current app from domain
- `getAppPort(app)`: Get development port for app

### Cross-Domain Communication

- `CrossDomainAPI`: API client for cross-app communication
- `subscribeToApp(app, callback)`: Real-time updates from other apps
- `fetchFromApp(app, endpoint)`: Fetch data from other POps apps

## Development

```bash
# Install dependencies
pnpm install

# Start development build
pnpm dev

# Build package
pnpm build

# Run linting
pnpm lint

# Run type checking
pnpm type-check
```

## Architecture

The navigation package is designed to work in a multi-domain environment where each POps app runs on its own subdomain:

- **mypops.io** - Hub app (central dashboard)
- **travel.mypops.io** - Travel organizer
- **money.mypops.io** - Money manager
- **accounts.mypops.io** - Account management
- And more...

All apps share authentication state via cookies with `.mypops.io` domain, enabling seamless navigation and shared user experience.
