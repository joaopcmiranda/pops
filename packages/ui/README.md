# UI Package

The shared design system for all frontend applications in the POPS project.

## Overview

This package contains reusable UI components that are shared across all frontend apps. It serves as the central design system, providing consistent styling and behavior throughout the project.

## Key Principles

- **Shared Components**: All components are designed to be used across multiple frontend applications
- **Storybook Documentation**: Each component includes comprehensive Storybook stories for development and testing
- **Independent Package**: Does not depend on any other packages and can be used standalone
- **Build-Only**: No development server - components are built and consumed by other packages

## Package Structure

```
packages/ui/
├── src/
│   └── components/     # UI components organized by type
├── .storybook/        # Storybook configuration
└── package.json       # Package configuration
```

## Components

The design system includes components such as:

- Avatar
- Button
- Card
- Dialog
- Progress
- Separator
- Sidebar
- Switch
- Toggle

## Development

### Building

```bash
# Build the UI package
pnpm run build
```

### Storybook

```bash
# Run Storybook for component development and documentation
pnpm run storybook
```

## Usage

Import components in other packages:

```typescript
import { Button, Card } from '@pops/ui'
```

## Architecture

- **Framework Agnostic**: Components are designed to work with React
- **TypeScript**: Full TypeScript support with proper type definitions
- **Styling**: Uses Tailwind CSS classes and CSS variables for theming
- **shadcn/ui**: Based on shadcn/ui component patterns and design principles
