# Template
## Breaking Change
## Add
## Remove
## Internal

# 0.5.0
## Add
- Added card pack generation logic with rarity-based probabilities
- Created an OpenedCardsPanel component to display the 13 unpacked cards in a grid layout
## Internal
- Extends CardDto type definition to support nullable fields for cards that may lack certain properties
- Added `no-console` rule to ESLint

# 0.4.0
## Add
- Created new UnopenedPacksPanel component with overlapping pack visualization
## Internal
- Updated theme breakpoints to use an XL breakpoint at 1600px for better large-screen support

# 0.3.0
## Add
- Added set selection UI on the home page with visual cards for each available set
## Internal
- Introduced a services layer with mock data for sets, preparing for future API integration
- Changed Redux action names across all slices to follow a consistent verb-noun pattern

# 0.2.0
## Add
- Added React Router v7 with BrowserRouter setup and route definitions
- Implemented Guardrail component for state-based route access control

# 0.1.2
## Internal
- Reorganized Redux file structure to "ducks" pattern

# 0.1.1
## Internal
- Established a core Redux state to the application
- Deprecated many of the examples and marked them for removal
- Changed semantic versioning from 'Fix' -> 'Internal' to make clear that a minor update is only when new features are added

# 0.1.0
## Internal
- (NOTE: This was supposed to be internal because no new features were added. Let this slide for now, but take note in the future)
- Add GitHub Actions CI workflow with multi-stage checks (version/changelog validation, linting, type-checking, and building)
- Introduce CHANGELOG.md with template structure for tracking project changes
- Add PR template with Jira integration and standardized sections

# 0.0.0
## Add
- Initialized codebase with Node.js, React, Redux, Material-UI, Vite, and ESLint.
