# RiftboundSealedWebsite

A website that simulates the deck registration and construction experience for players to practice the sealed deck format.

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Material-UI (MUI) v7** - Component library and design system
- **Redux Toolkit** - State management
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Architecture Overview

### Components
Presentational components that focus on UI rendering. They are typically stateless and receive data via props.

### Containers
Smart components that connect to Redux state and handle business logic. They compose presentational components.

### Redux Structure
- **slices/**: Feature-based Redux slices containing actions, reducers, and selectors
- **store/**: Store configuration and typed hooks for use throughout the app

### Mock Data
Sample data used during development to simulate API responses and test UI components.

### Types
Centralized TypeScript type definitions ensuring type safety across the application.

## Development Guidelines

1. **Component Organization**: Keep components small and focused on a single responsibility
2. **Type Safety**: Always define TypeScript interfaces for props and state
3. **Redux Best Practices**: Use Redux Toolkit for simplified Redux logic
4. **Material-UI**: Follow Material Design principles and use MUI components consistently
5. **Code Style**: Follow the ESLint configuration and maintain consistent formatting

## Contributing

### Jira

The active JIRA board for planning is under [RIFTS](https://aegisesports.atlassian.net/jira/software/projects/RIFTS/boards/34/backlog). Ask Doowan for permission to access.

### Pushing Code

`husky` Git hooks:

- When _committing_ code, a pre-commit hook will run ESLint and Prettier to enforce coding practices. VSCode settings should automatically format the code upon saving. Sometimes that may not be the case and the changes can happen after committing.

Though highly unadvised, the hooks can be temporarily disabled by:

```
$ HUSKY=0 git commit ... # To skip pre-commit hook
```

### Changelog Update

TBD

### Testing

TBD
