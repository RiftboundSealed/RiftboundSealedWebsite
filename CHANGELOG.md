# Template
## Breaking Change
## Add
## Remove
## Internal
- Updated website branding and metadata across multiple files to improve the site's presentation and social media sharing capabilities
- Replaced text-based title in `ApplicationBar` with a clickable logo

# 0.12.1
## Internal
- Updated README to reflect new data update

# 0.12.0
## Add
- Removed hardcoded image URLs from type definitions and replaced with dynamic CDN URL construction
- Updated mock data structure to match Riftcodex format with support for OGN, OGS, and SFD sets
- Included logic for 'Signature Gear' cards
## Internal
- Refactored card fetching to be set-based with new parsing logic for public codes
- Fixed domain identity checks for legends and signature cards

# 0.11.1
## Internal
- Created centralized environment variable management with validation in `src/consts/env.ts`
- Migrated rune images and favicons from local assets to CDN-hosted resources

# 0.11.0
## Add
- New `Footer` component with legal disclaimer and contact information
## Internal
- Restructured app layout with flexbox to enable sticky footer behavior
- Enhanced radio button styling, updated application bar and other components with golden bell accent color borders

# 0.10.5
## Internal
- Renamed event handler naming conventions across components, containers, and pages to follow React naming conventions.

# 0.10.4
## Internal
- Renamed all reusable components (in `/components`) to have the material be the prefix.

# 0.10.3
## Internal
- Shifted constants to a separate folder for organizational purposes.

# 0.10.2
## Internal
- Added a `riot.txt` for app verification and review by Riot.

# 0.10.1
## Internal
- Updated the color palette to establish a custom dark theme with brand-specific colors ("Riftbound blue" and "Golden bell").

# 0.10.0
## Add
- Extracted AppBar implementation into a reusable `ApplicationBar` component with configurable props
## Internal
- Standardized page layout spacing by adding `disableGutters` to all Container components and applying consistent padding-top: 16px
- Removed deprecated mock data files (users.ts, cards.ts), example components (CardList, CardItem), and type definitions that were only used for examples

# 0.9.0
## Add
- Implemented `checkLegalDeck` thunk that validates deck composition against game rules (25 main deck cards, 12 runes, domain restrictions, legend/battlefield limits)
- Enhanced export functionality to support both pool and deck export with sideboard, replacing the previous single-purpose card list export
- Added visual feedback for deck validation errors through a new `DialogError` component and status indicators in the deck container

# 0.8.0
## Add
- Added `RuneContainer` container with visual rune selection UI displaying all six domain types (Fury, Calm, Mind, Body, Order, Chaos)
- Added `RemoveButton` presentational component for displaying a negative symbol icon
- Modified deck display to aggregate duplicate runes and show counts (e.g., "3x Fury Rune")
## Internal
- Refactored event handler naming in hooks to use `handle` prefix consistently (e.g., `addCardsToPool` → `handleAddCardsToPool`)

# 0.7.0
## Add
- Created new containers: `PoolStaticContainer` (display-only), `PoolConstructContainer` (clickable), `DeckContainer` (deck list with removal)
- Added deck construction validation logic for main deck size limits (25 cards excluding Runes)
## Internal
- Refactored pool and deck selectors to include entity IDs (poolId, deckId) for proper tracking

# 0.6.0
## Add
- Added ExportCardsTextDialog component to export card pools as formatted text
## Remove
- Removed deprecated example Redux slice
## Internal
- Refactored OpenedCardsPanel into a more flexible CardsPanel component
- Integrated pool state management with the unpacking workflow

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
