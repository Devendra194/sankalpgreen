# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development Server
```bash
cd my-app && npm run dev
```
Start development server at http://localhost:5173 with hot module replacement.

### Build & Preview
```bash
cd my-app && npm run build
cd my-app && npm run preview
```
Build production version and preview the build locally.

### Linting
```bash
cd my-app && npm run lint
```
Run ESLint on the entire codebase with React and React Hooks rules.

## Architecture

This is a React 19 + Vite waste management application called "Sankalp Green" with a multi-user role-based interface.

### Project Structure
- **Root level**: Contains project metadata and this my-app/ subdirectory
- **my-app/**: Main React application built with Vite
- **my-app/src/**: All source code organized by feature and role

### User Roles & Navigation
The application serves three distinct user types with separate dashboards:

1. **Citizens** (`/citizen/*`): Home dashboard, problem reporting, collection schedules, learning hub, rewards, truck tracking, scrap collection
2. **Workers** (`/worker/*`): Route management, collection status tracking, performance metrics
3. **Admins** (`/admin/*`): System-wide analytics, complaints management, worker management, infrastructure oversight

### Key Components

- **DashboardLayout**: Reusable layout with sidebar navigation, used by all role-specific pages
- **ThemeContext**: Global theme provider with dark/light mode toggle and localStorage persistence
- **WasteSegregationGame**: Interactive educational game component with scoring, levels, and gamification
- **Sidebar**: Dynamic navigation menu that adapts based on user role

### Routing Structure
All routing handled via React Router with role-based path prefixes:
- `/` - Landing page with role selection
- `/citizen/*` - Citizen dashboard and features
- `/worker/*` - Worker dashboard and tools  
- `/admin/*` - Administrative interface

### State Management
- Context API for theme management
- Component-level state for game logic and UI interactions
- No external state management library currently used

### Styling
- CSS modules with component-specific stylesheets
- Custom CSS variables for theming
- Responsive design patterns

### Interactive Features
The WasteSegregationGame component includes:
- Multi-category waste sorting (organic, recyclable, hazardous, general)
- Progressive difficulty levels with time pressure
- Streak bonuses and point system
- Performance analytics and accuracy tracking

### Map Integration
Uses React Leaflet for location-based features like truck tracking and route visualization.