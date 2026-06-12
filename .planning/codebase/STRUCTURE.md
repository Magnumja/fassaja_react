# Codebase Structure

**Analysis Date:** 2026-06-12

## Directory Layout

```text
fassaja_react/
├── .planning/              # GSD planning and codebase mapping artifacts
│   └── codebase/           # Generated architecture/structure maps
├── node_modules/           # Installed npm dependencies, ignored by git
├── public/                 # Static files served from the public root
│   ├── bobduvida.png       # Mascot confused image
│   ├── boberror404.png     # Mascot error image
│   ├── bobforte.png        # Mascot strong image
│   ├── bobjoia.png         # Mascot happy image
│   ├── bobparabens.png     # Mascot celebration image
│   ├── bobtriste.png       # Mascot sad image
│   └── logofassaja.png     # Logo used by `Logo`
├── src/                    # React application source
│   ├── components/         # Reusable and feature-specific UI components
│   │   ├── calendar/       # Calendar UI
│   │   ├── common/         # Shared primitives
│   │   ├── dashboard/      # Dashboard widgets
│   │   ├── layout/         # App shell
│   │   ├── mascot/         # Mascot image components
│   │   ├── projects/       # Project feature UI
│   │   └── tasks/          # Task feature UI
│   ├── contexts/           # React context providers and context hooks
│   ├── data/               # Mock seed data
│   ├── hooks/              # Custom hooks for data/state and derived values
│   ├── pages/              # Route-level pages
│   ├── routes/             # Route table
│   ├── services/           # Data access facades over mock data
│   ├── types/              # Shared TypeScript domain contracts
│   ├── utils/              # Shared helper functions
│   ├── App.tsx             # App providers and router root
│   ├── index.css           # Tailwind and global styles
│   └── main.tsx            # ReactDOM entry point
├── index.html              # Vite HTML shell
├── package.json            # npm scripts and dependencies
├── package-lock.json       # npm lockfile
├── postcss.config.js       # Tailwind/PostCSS plugin config
├── tailwind.config.js      # Tailwind content, theme, and dark-mode config
├── tsconfig.json           # TypeScript app config and `@/*` alias
├── tsconfig.node.json      # TypeScript config for Node-side config files
└── vite.config.ts          # Vite React plugin, alias, and dev server config
```

## Directory Purposes

**`.planning/`:**
- Purpose: Store GSD workflow artifacts and generated codebase maps.
- Contains: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`.
- Key files: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`.

**`public/`:**
- Purpose: Serve static assets from the web root.
- Contains: Mascot PNGs and application logo.
- Key files: `public/logofassaja.png`, `public/bobjoia.png`, `public/bobduvida.png`, `public/boberror404.png`, `public/bobforte.png`, `public/bobtriste.png`, `public/bobparabens.png`.

**`src/`:**
- Purpose: Contain the complete React SPA source.
- Contains: Entry point, app root, global CSS, route table, pages, components, hooks, services, mock data, types, and utilities.
- Key files: `src/main.tsx`, `src/App.tsx`, `src/index.css`.

**`src/components/`:**
- Purpose: Hold reusable UI and domain-specific visual components.
- Contains: Feature folders (`calendar`, `dashboard`, `mascot`, `projects`, `tasks`), layout shell, and common primitives.
- Key files: `src/components/layout/AppLayout.tsx`, `src/components/common/Button.tsx`, `src/components/tasks/TaskList.tsx`.

**`src/components/common/`:**
- Purpose: Provide shared primitives used by pages and feature components.
- Contains: `Badge`, `Button`, `Card`, `EmptyState`, `Input`, `Logo`, `Modal`, `Select`, `Textarea`.
- Key files: `src/components/common/Button.tsx`, `src/components/common/Card.tsx`, `src/components/common/Modal.tsx`.

**`src/components/layout/`:**
- Purpose: Provide the persistent app shell.
- Contains: `AppLayout`, `Sidebar`, `Topbar`.
- Key files: `src/components/layout/AppLayout.tsx`, `src/components/layout/Sidebar.tsx`, `src/components/layout/Topbar.tsx`.

**`src/components/tasks/`:**
- Purpose: Provide the task management UI.
- Contains: Task cards, task list, filters, create modal, and edit modal.
- Key files: `src/components/tasks/TaskList.tsx`, `src/components/tasks/TaskCard.tsx`, `src/components/tasks/CreateTaskModal.tsx`, `src/components/tasks/EditTaskModal.tsx`.

**`src/components/projects/`:**
- Purpose: Provide the project management UI.
- Contains: Project cards and create project modal.
- Key files: `src/components/projects/ProjectCard.tsx`, `src/components/projects/CreateProjectModal.tsx`.

**`src/components/calendar/`:**
- Purpose: Provide calendar rendering for task due dates.
- Contains: Month grid component.
- Key files: `src/components/calendar/CalendarMonth.tsx`.

**`src/components/dashboard/`:**
- Purpose: Provide dashboard metric/progress widgets.
- Contains: Metric card and progress card components.
- Key files: `src/components/dashboard/MetricCard.tsx`, `src/components/dashboard/ProgressCard.tsx`.

**`src/components/mascot/`:**
- Purpose: Render mascot images and mascot message cards.
- Contains: `Mascot` and `MascotMessage`.
- Key files: `src/components/mascot/Mascot.tsx`, `src/components/mascot/MascotMessage.tsx`.

**`src/contexts/`:**
- Purpose: Store React context providers and context hooks.
- Contains: Theme context only.
- Key files: `src/contexts/ThemeContext.tsx`.

**`src/data/`:**
- Purpose: Store mock seed data used by services and pages.
- Contains: Mock tasks, projects, and user profile data.
- Key files: `src/data/mockTasks.ts`, `src/data/mockProjects.ts`, `src/data/mockUser.ts`.

**`src/hooks/`:**
- Purpose: Store reusable React hooks for data loading, mutations, and derived values.
- Contains: `useTasks`, `useProjects`, `useDashboardStats`.
- Key files: `src/hooks/useTasks.ts`, `src/hooks/useProjects.ts`, `src/hooks/useDashboardStats.ts`.

**`src/pages/`:**
- Purpose: Store route-level screens.
- Contains: Dashboard, Tasks, Projects, Calendar, Reports, Settings, and Not Found pages.
- Key files: `src/pages/DashboardPage.tsx`, `src/pages/TasksPage.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/CalendarPage.tsx`, `src/pages/ReportsPage.tsx`, `src/pages/SettingsPage.tsx`, `src/pages/NotFoundPage.tsx`.

**`src/routes/`:**
- Purpose: Store routing configuration.
- Contains: React Router route table.
- Key files: `src/routes/AppRoutes.tsx`.

**`src/services/`:**
- Purpose: Store data access facades.
- Contains: In-memory task and project services.
- Key files: `src/services/tasksService.ts`, `src/services/projectsService.ts`.

**`src/types/`:**
- Purpose: Store TypeScript domain contracts.
- Contains: Task, project, and user types.
- Key files: `src/types/task.ts`, `src/types/project.ts`, `src/types/user.ts`.

**`src/utils/`:**
- Purpose: Store shared utility functions.
- Contains: Date formatting and date classification helpers.
- Key files: `src/utils/date.ts`.

## Key File Locations

**Entry Points:**
- `index.html`: Vite HTML shell with `#root` and `/src/main.tsx` script.
- `src/main.tsx`: ReactDOM mount and global CSS import.
- `src/App.tsx`: App-level providers and router composition.
- `src/routes/AppRoutes.tsx`: Route declarations for all pages.

**Configuration:**
- `package.json`: npm scripts and dependency declarations.
- `package-lock.json`: npm dependency lockfile.
- `vite.config.ts`: Vite React plugin, `@` alias, and dev server port `5173`.
- `tsconfig.json`: TypeScript strict settings, JSX mode, bundler resolution, and `@/*` path alias.
- `tsconfig.node.json`: TypeScript config reference for Node-side config.
- `tailwind.config.js`: Tailwind content globs, class-based dark mode, color tokens, radius tokens, and shadows.
- `postcss.config.js`: Tailwind CSS and Autoprefixer PostCSS plugins.
- `.gitignore`: Ignores `node_modules`, `dist`, logs, editor files, and local-only files.

**Core Logic:**
- `src/hooks/useTasks.ts`: Task loading, task mutation callbacks, local task state, loading/error state.
- `src/hooks/useProjects.ts`: Project loading, project mutation callbacks, local project state, loading/error state.
- `src/hooks/useDashboardStats.ts`: Derived dashboard metrics from task arrays.
- `src/services/tasksService.ts`: Task data access and in-memory task mutations.
- `src/services/projectsService.ts`: Project data access and in-memory project mutations.
- `src/contexts/ThemeContext.tsx`: Theme persistence and document class toggling.

**UI Composition:**
- `src/pages/DashboardPage.tsx`: Dashboard route composition.
- `src/pages/TasksPage.tsx`: Task management route composition.
- `src/pages/ProjectsPage.tsx`: Project management route composition.
- `src/pages/CalendarPage.tsx`: Calendar route composition.
- `src/pages/ReportsPage.tsx`: Report route composition.
- `src/pages/SettingsPage.tsx`: Settings route composition.
- `src/components/layout/AppLayout.tsx`: Shared shell wrapper for pages.

**Domain Types and Data:**
- `src/types/task.ts`: `Task`, `TaskStatus`, `TaskPriority`.
- `src/types/project.ts`: `Project`.
- `src/types/user.ts`: `User`.
- `src/data/mockTasks.ts`: Mock task seed data.
- `src/data/mockProjects.ts`: Mock project seed data.
- `src/data/mockUser.ts`: Mock user profile and goals.

**Testing:**
- Not detected. No `*.test.*`, `*.spec.*`, Playwright config, Vitest config, Jest config, or test directory is present in the scanned file list.

## Naming Conventions

**Files:**
- Use PascalCase for React page and component files: `src/pages/DashboardPage.tsx`, `src/components/tasks/TaskCard.tsx`, `src/components/common/Button.tsx`.
- Use camelCase for hooks, services, utilities, and mock data: `src/hooks/useTasks.ts`, `src/services/tasksService.ts`, `src/utils/date.ts`, `src/data/mockTasks.ts`.
- Use lowercase root config filenames where ecosystem conventions expect them: `package.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`.
- Use `Page` suffix for route-level components: `src/pages/TasksPage.tsx`, `src/pages/ReportsPage.tsx`.
- Use `Modal`, `Card`, `List`, and `Filters` suffixes for UI role clarity: `src/components/tasks/CreateTaskModal.tsx`, `src/components/projects/ProjectCard.tsx`, `src/components/tasks/TaskList.tsx`, `src/components/tasks/TaskFilters.tsx`.

**Directories:**
- Use plural domain folders for grouped features and layers: `src/components/tasks`, `src/components/projects`, `src/pages`, `src/hooks`, `src/services`, `src/types`.
- Use `common` for shared primitives: `src/components/common`.
- Use feature names under `src/components/` when components are domain-specific: `src/components/calendar`, `src/components/dashboard`, `src/components/mascot`.

**Exports:**
- Use default exports for route pages consumed by `src/routes/AppRoutes.tsx`: `src/pages/DashboardPage.tsx`, `src/pages/TasksPage.tsx`.
- Use named exports for components, hooks, services, data, and utilities: `src/components/common/Button.tsx`, `src/hooks/useTasks.ts`, `src/services/tasksService.ts`, `src/data/mockTasks.ts`, `src/utils/date.ts`.

**Imports:**
- Use `@/` absolute imports for cross-folder source imports: `@/components/layout/AppLayout`, `@/hooks/useTasks`, `@/types/task`.
- Use relative imports for same-folder component relationships: `src/components/layout/AppLayout.tsx` imports `./Sidebar` and `./Topbar`; `src/components/tasks/TaskList.tsx` imports `./TaskCard`.

## Where to Add New Code

**New Route/Page:**
- Primary code: Add the page component to `src/pages/NewPage.tsx`.
- Route registration: Add a route in `src/routes/AppRoutes.tsx`.
- Navigation: Add a navigation item in `src/components/layout/Sidebar.tsx`.
- Shared layout: Wrap page content in `src/components/layout/AppLayout.tsx`.

**New Feature Component:**
- Implementation: Add domain-specific UI under `src/components/<feature>/`.
- Shared primitives: Add reusable controls to `src/components/common/` only when used across multiple feature folders.
- Types: Import domain types from `src/types/` rather than redefining prop data shapes in multiple components.

**New Task Feature:**
- Primary code: Use `src/pages/TasksPage.tsx` for route-level coordination.
- Components: Put task UI in `src/components/tasks/`.
- State/data access: Put task hook behavior in `src/hooks/useTasks.ts` and service behavior in `src/services/tasksService.ts`.
- Types: Extend `src/types/task.ts`.
- Mock data: Extend `src/data/mockTasks.ts`.

**New Project Feature:**
- Primary code: Use `src/pages/ProjectsPage.tsx` for route-level coordination.
- Components: Put project UI in `src/components/projects/`.
- State/data access: Put project hook behavior in `src/hooks/useProjects.ts` and service behavior in `src/services/projectsService.ts`.
- Types: Extend `src/types/project.ts`.
- Mock data: Extend `src/data/mockProjects.ts`.

**New Dashboard/Report Metric:**
- Derived calculations: Add reusable task-derived calculations to `src/hooks/useDashboardStats.ts`.
- Dashboard UI: Add visual widgets under `src/components/dashboard/`.
- Report UI: Compose chart data and Recharts components in `src/pages/ReportsPage.tsx` unless it becomes reusable, then extract to `src/components/dashboard/` or a new feature folder.

**New Context Provider:**
- Implementation: Add provider and hook in `src/contexts/<Name>Context.tsx`.
- Composition: Wrap it in `src/App.tsx` when it is app-wide.
- Consumers: Use a context hook pattern like `useTheme` from `src/contexts/ThemeContext.tsx`.

**New Service/API Boundary:**
- Implementation: Add service modules under `src/services/`.
- Hook adapter: Expose service calls through a hook in `src/hooks/`.
- Pages/components: Prefer consuming hooks from `src/hooks/` and passing props down to feature components.
- Types: Place request/response/domain contracts in `src/types/`.

**Utilities:**
- Shared helpers: Add pure helpers to `src/utils/`.
- Date helpers: Extend `src/utils/date.ts`.
- Avoid adding utility logic directly in pages when the helper is used by multiple pages/components.

**Static Assets:**
- Public assets: Add browser-addressable static files to `public/`.
- Logo updates: Update references in `src/components/common/Logo.tsx`.
- Mascot state images: Update the `mascotImages` map in `src/components/mascot/Mascot.tsx`.

**Tests:**
- Test structure is not established. When tests are introduced, colocate focused tests near source files or create a clear `src/__tests__/` convention and document it in `.planning/codebase/TESTING.md`.

## Special Directories

**`.planning/`:**
- Purpose: GSD planning and generated codebase mapping artifacts.
- Generated: Yes.
- Committed: Project-dependent; directory is present in the workspace and not ignored by `.gitignore`.

**`node_modules/`:**
- Purpose: Installed npm packages.
- Generated: Yes.
- Committed: No; ignored by `.gitignore`.

**`public/`:**
- Purpose: Static assets copied/served by Vite from the public root.
- Generated: No.
- Committed: Yes, unless individual files are ignored.

**`src/`:**
- Purpose: Application source code.
- Generated: No.
- Committed: Yes.

**`dist/`:**
- Purpose: Vite production build output.
- Generated: Yes.
- Committed: No; ignored by `.gitignore`.
- Note: Directory is not present in the current root listing.

**`public/images/` and `public/images/mascot/`:**
- Purpose: Placeholder static asset directories.
- Generated: No.
- Committed: Project-dependent.
- Note: Directories are present, but no files are detected under them.

---

*Structure analysis: 2026-06-12*
