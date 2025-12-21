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

### Environment Variables

Create a new `.env` file and add it to the codebase directory.
```
VITE_CDN_BASE_URL=https://riftbound-assets.nyc3.cdn.digitaloceanspaces.com
```

## Architecture Overview

### Components
Presentational components that focus on UI rendering. They are typically stateless and receive data via props.

### Containers
Smart components that connect to Redux state and handle business logic. They compose of presentational components.

### Pages
Highest level component that is mapped to a specific route. It will handle additional business logic and mainly compose of the containers.

### Redux Structure
- **store.ts**: Redux store setup that illustrates the core state.
- **hooks.ts**: Exports typed versions of React Redux's `useDispatch` and `useSelector` hooks for use throughout the app with proper TypeScript typing.
- ***/**: Feature-based folders following the 'ducks' pattern, each containing a slice (state, actions, and reducers), selectors, and optionally thunks for that feature.

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

### Changelog Updates

Every PR must involve an update into the top template block of `CHANGELOG.md`. **ONLY** edit the template block; __*never*__ change older version sections further down the file.

At least one bullet is required when updating the changelog. Add one or more bullets under the right heading:
- **Breaking Change** – backwards-incompatible changes (e.g. remove/rename public API)
- **Add** – new features, new endpoints, new options
- **Remove** – removed non-breaking behavior, deprecations, cleanup
- **Internal** – bug fixes, refactors that don’t change behavior

Once that's done, the Github Action will automatically update the CHANGELOG and will bump the version based on the specified changes.

### Testing

TBD
