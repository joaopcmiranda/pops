# @pops/widgets

Cross-domain widget system for POps dashboard applications.

## Overview

This package provides a flexible widget system that allows POps applications to display data from other apps in their dashboards. It supports real-time updates, customizable layouts, and cross-domain data fetching.

## Features

- **Widget Grid System**: Responsive grid layout for organizing widgets
- **Cross-Domain Data**: Fetch and display data from other POps apps
- **Real-Time Updates**: Live updates via WebSocket connections
- **Drag & Drop**: Reorderable widget layouts
- **Widget Library**: Pre-built widgets for common POps data
- **Custom Widgets**: Easy-to-create custom widget components

## Installation

```bash
pnpm add @pops/widgets
```

## Usage

### Basic Widget Grid

```tsx
import { WidgetGrid, Widget } from '@pops/widgets'

function Dashboard() {
  const widgets = [
    { id: 'trips', type: 'travel-summary', size: { w: 2, h: 1 } },
    { id: 'budget', type: 'budget-overview', size: { w: 1, h: 1 } },
    { id: 'recent', type: 'recent-activity', size: { w: 2, h: 2 } },
  ]

  return (
    <WidgetGrid
      widgets={widgets}
      editable={true}
      onLayoutChange={layout => console.log('Layout changed:', layout)}
    />
  )
}
```

### Custom Widget

```tsx
import { WidgetContainer } from '@pops/widgets'

function CustomWidget({ title, data, loading, error }) {
  return (
    <WidgetContainer
      title={title}
      loading={loading}
      error={error}
      refreshable={true}
      onRefresh={() => console.log('Refreshing...')}
    >
      <div className='p-4'>
        {/* Your widget content */}
        <p>{data?.message}</p>
      </div>
    </WidgetContainer>
  )
}
```

### Cross-Domain Data Widget

```tsx
import { useCrossDomainData } from '@pops/widgets'

function TravelSummaryWidget() {
  const { data, loading, error, refresh } = useCrossDomainData({
    app: 'travel',
    endpoint: '/api/trips/summary',
    refreshInterval: 300000, // 5 minutes
  })

  return (
    <WidgetContainer title='Travel Summary' loading={loading} error={error} onRefresh={refresh}>
      <div className='space-y-2'>
        <p>Next Trip: {data?.nextTrip?.destination}</p>
        <p>Total Trips: {data?.totalTrips}</p>
        <p>Days Until Next Trip: {data?.daysUntilNext}</p>
      </div>
    </WidgetContainer>
  )
}
```

## Built-in Widgets

### Travel Widgets

- **TravelSummaryWidget**: Upcoming trips and travel statistics
- **NextTripWidget**: Details about the next scheduled trip
- **TravelBudgetWidget**: Travel spending overview

### Money Widgets

- **BudgetOverviewWidget**: Monthly budget and spending
- **ExpenseSummaryWidget**: Recent expenses and trends
- **SavingsGoalWidget**: Progress toward savings goals

### Activity Widgets

- **RecentActivityWidget**: Cross-app activity feed
- **QuickStatsWidget**: Key metrics from all apps
- **WeatherWidget**: Weather for travel destinations

### Utility Widgets

- **ClockWidget**: World clock for travel destinations
- **QuickActionsWidget**: Common actions across apps
- **NotificationWidget**: Recent notifications summary

## Widget Configuration

```tsx
interface WidgetConfig {
  id: string
  type: string
  title?: string
  size: { w: number; h: number }
  position: { x: number; y: number }
  props?: Record<string, unknown>
  refreshInterval?: number
  app?: PopsAppId
  endpoint?: string
}
```

## Grid Layout

The widget system uses a 12-column grid with the following sizes:

- **Small (1x1)**: 1 column, 1 row
- **Medium (2x1)**: 2 columns, 1 row
- **Large (2x2)**: 2 columns, 2 rows
- **Wide (4x1)**: 4 columns, 1 row
- **Extra Large (4x2)**: 4 columns, 2 rows

## Real-Time Updates

Widgets can subscribe to real-time updates from POps applications:

```tsx
import { useRealtimeWidget } from '@pops/widgets'

function LiveWidget() {
  const { data, connected } = useRealtimeWidget({
    app: 'travel',
    events: ['trip_updated', 'itinerary_changed'],
    initialData: { trips: [] },
  })

  return (
    <WidgetContainer title='Live Travel Updates' status={connected ? 'connected' : 'disconnected'}>
      {/* Live data display */}
    </WidgetContainer>
  )
}
```

## Widget Persistence

Widget layouts are automatically saved to localStorage and can be synced to user preferences:

```tsx
import { useWidgetLayout } from '@pops/widgets'

function Dashboard() {
  const { layout, updateLayout, resetLayout } = useWidgetLayout({
    defaultLayout: defaultWidgets,
    persistKey: 'hub-dashboard-layout',
  })

  return <WidgetGrid layout={layout} onLayoutChange={updateLayout} onReset={resetLayout} />
}
```

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

The widget system is designed for cross-domain operation:

1. **Widget Registry**: Central registry of available widgets
2. **Data Fetching**: Cross-domain API client integration
3. **Layout Engine**: Grid-based responsive layout system
4. **State Management**: Local and remote state synchronization
5. **Real-Time**: WebSocket integration for live updates

Each widget can fetch data from any POps application while maintaining security and performance through the shared navigation package's cross-domain API client.
