<!-- refreshed: 2026-06-12 -->
# Architecture

**Analysis Date:** 2026-06-12

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Browser SPA Entry                         │
│ `index.html` -> `src/main.tsx` -> `src/App.tsx`              │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                  App Providers and Routing                   │
│ `src/contexts/ThemeContext.tsx` + `src/routes/AppRoutes.tsx` │
├──────────────┬──────────────┬──────────────┬────────────────┤
│ Dashboard    │ Tasks        │ Projects     │ Calendar/Reports│
│ `src/pages/` │ `src/pages/` │ `src/pages/` │ `src/pages/`    │
└──────┬───────┴──────┬───────┴──────┬───────┴───────┬────────┘
       │              │              │               │
       ▼              ▼              ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│                Layout, Feature, and Common UI                │
│ `src/components/layout`, `src/components/tasks`,             │
│ `src/components/projects`, `src/components/common`           │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                 Hooks, Services, Types, Data                 │
│ `src/hooks` -> `src/services` -> `src/data` + `src/types`    │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Vite HTML shell | Hosts the root DOM node and loads the React module entry. | `index.html` |
| React entry | Mounts `<App />` into `#root` inside React strict mode. | `src/main.tsx` |
| App root | Composes `ThemeProvider`, `BrowserRouter`, and route rendering. | `src/App.tsx` |
| Route table | Maps URL paths to page components and the wildcard 404 page. | `src/routes/AppRoutes.tsx` |
| Theme context | Owns light/dark theme state, persists it to `localStorage`, and toggles the document class. | `src/contexts/ThemeContext.tsx` |
| App layout | Provides the fixed sidebar/topbar shell around page content. | `src/components/layout/AppLayout.tsx` |
| Navigation sidebar | Owns route-aware navigation links and mobile drawer state. | `src/components/layout/Sidebar.tsx` |
| Dashboard page | Reads tasks, derives dashboard stats, and composes metric/progress/task preview widgets. | `src/pages/DashboardPage.tsx` |
| Tasks page | Owns task list filters, create/edit modal visibility, task CRUD callbacks, and project filter options. | `src/pages/TasksPage.tsx` |
| Projects page | Reads projects and tasks, calculates per-project progress, and composes project cards. | `src/pages/ProjectsPage.tsx` |
| Calendar page | Owns current/selected date state and filters tasks for the selected date. | `src/pages/CalendarPage.tsx` |
| Reports page | Builds Recharts data series from task state and dashboard stats. | `src/pages/ReportsPage.tsx` |
| Settings page | Reads theme context, mock user profile data, and local goal form state. | `src/pages/SettingsPage.tsx` |
| Task hook | Provides page-level task state, loading/error state, and CRUD actions over `tasksService`. | `src/hooks/useTasks.ts` |
| Project hook | Provides page-level project state, loading/error state, and CRUD actions over `projectsService`. | `src/hooks/useProjects.ts` |
| Stats hook | Derives memoized task counts, completion rate, and week-over-week values. | `src/hooks/useDashboardStats.ts` |
| Task service | Stores mutable in-memory task data seeded from mock tasks and exposes async CRUD methods. | `src/services/tasksService.ts` |
| Project service | Stores mutable in-memory project data seeded from mock projects and exposes async CRUD methods. | `src/services/projectsService.ts` |
| Domain types | Define `Task`, `Project`, and `User` shapes used across hooks, services, pages, and components. | `src/types/task.ts`, `src/types/project.ts`, `src/types/user.ts` |

## Pattern Overview

**Overall:** Client-side React single page application with route-level pages, presentational feature components, hooks as page state adapters, and mock in-memory services.

**Key Characteristics:**
- Use route components in `src/pages/` as feature coordinators that assemble layout, hooks, and components.
- Use `src/components/common/` for reusable primitives such as `Button`, `Card`, `Input`, `Select`, `Textarea`, `Modal`, `Badge`, `Logo`, and `EmptyState`.
- Use hooks in `src/hooks/` to isolate data loading, React state, service calls, and derived calculations.
- Use object-literal service modules in `src/services/` for the current data access boundary.
- Use `@/*` imports for absolute paths configured in `tsconfig.json` and `vite.config.ts`.

## Layers

**Runtime Shell:**
- Purpose: Load the Vite module application into a browser document.
- Location: `index.html`, `src/main.tsx`
- Contains: DOM root, module script, ReactDOM mount.
- Depends on: `react`, `react-dom`, `src/App.tsx`, `src/index.css`.
- Used by: Vite development server and production build output.

**Application Composition:**
- Purpose: Provide app-wide context and client-side routing.
- Location: `src/App.tsx`, `src/routes/AppRoutes.tsx`, `src/contexts/ThemeContext.tsx`
- Contains: `ThemeProvider`, `BrowserRouter`, route-to-page mapping, `useTheme`.
- Depends on: `react-router-dom`, browser `localStorage`, `document.documentElement`.
- Used by: `src/main.tsx` and all routed pages.

**Pages:**
- Purpose: Own route-level workflow state and compose the visible screen.
- Location: `src/pages/`
- Contains: `DashboardPage`, `TasksPage`, `ProjectsPage`, `CalendarPage`, `ReportsPage`, `SettingsPage`, `NotFoundPage`.
- Depends on: `src/components`, `src/hooks`, `src/services`, `src/data`, `src/types`.
- Used by: `src/routes/AppRoutes.tsx`.

**Layout Components:**
- Purpose: Provide persistent navigation, top bar actions, search slot, and page content frame.
- Location: `src/components/layout/`
- Contains: `AppLayout`, `Sidebar`, `Topbar`.
- Depends on: `react-router-dom`, `lucide-react`, `src/components/common`.
- Used by: All primary pages in `src/pages/`.

**Feature Components:**
- Purpose: Render task, project, calendar, dashboard, and mascot UI.
- Location: `src/components/tasks/`, `src/components/projects/`, `src/components/calendar/`, `src/components/dashboard/`, `src/components/mascot/`
- Contains: Lists, cards, filters, modals, calendar grid, charts support widgets, mascot imagery.
- Depends on: Domain types in `src/types/`, common components in `src/components/common/`, services for project options in modal components.
- Used by: Route pages in `src/pages/`.

**Common UI Components:**
- Purpose: Centralize reusable UI primitives and styling variants.
- Location: `src/components/common/`
- Contains: `Button`, `Card`, `Input`, `Select`, `Textarea`, `Modal`, `Badge`, `Logo`, `EmptyState`.
- Depends on: React, Tailwind class names, `framer-motion` for `Modal`, `lucide-react` for modal close icon, mascot assets through `EmptyState`.
- Used by: Pages and feature components.

**State Hooks:**
- Purpose: Bridge React components to services and derived calculations.
- Location: `src/hooks/`
- Contains: `useTasks`, `useProjects`, `useDashboardStats`.
- Depends on: React hooks, services in `src/services/`, domain types in `src/types/`.
- Used by: `src/pages/DashboardPage.tsx`, `src/pages/TasksPage.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/CalendarPage.tsx`, `src/pages/ReportsPage.tsx`.

**Data Access Services:**
- Purpose: Provide async APIs for task and project CRUD over in-memory module arrays.
- Location: `src/services/`
- Contains: `tasksService`, `projectsService`.
- Depends on: Mock data in `src/data/` and types in `src/types/`.
- Used by: Hooks in `src/hooks/` and some components/pages directly.

**Mock Data and Types:**
- Purpose: Seed current app state and define TypeScript contracts.
- Location: `src/data/`, `src/types/`
- Contains: `mockTasks`, `mockProjects`, `mockUser`, `Task`, `TaskStatus`, `TaskPriority`, `Project`, `User`.
- Depends on: Browser date runtime for generated mock dates.
- Used by: Services, hooks, and pages.

## Data Flow

### Primary Request Path

1. Browser loads the Vite entry script from `index.html:11`.
2. React mounts `<App />` into `#root` from `src/main.tsx:6`.
3. `App` wraps routes with `ThemeProvider` and `BrowserRouter` from `src/App.tsx:7`.
4. `AppRoutes` maps the active route to a page component from `src/routes/AppRoutes.tsx:13`.
5. The page renders `AppLayout` and route-specific feature components, such as `TasksPage` from `src/pages/TasksPage.tsx:66`.
6. The page calls a hook such as `useTasks` from `src/pages/TasksPage.tsx:13`.
7. The hook loads data through a service such as `tasksService.getTasks()` from `src/hooks/useTasks.ts:17`.
8. The service returns module-scoped in-memory data seeded from `mockTasks` in `src/services/tasksService.ts:4`.
9. The hook stores the result in local React state with `setTasks(data)` in `src/hooks/useTasks.ts:18`.
10. Components render the current state and callbacks, such as `TaskList` in `src/pages/TasksPage.tsx:117`.

### Task Create/Edit/Delete Flow

1. `DashboardPage` and `TasksPage` open `CreateTaskModal` using page-local modal state in `src/pages/DashboardPage.tsx:20` and `src/pages/TasksPage.tsx:15`.
2. `CreateTaskModal` validates the title and submits form data to the parent callback from `src/components/tasks/CreateTaskModal.tsx:56`.
3. `useTasks.createTask` calls `tasksService.createTask` from `src/hooks/useTasks.ts:29`.
4. `tasksService.createTask` creates an id and `createdAt`, mutates the module array, and resolves the new task from `src/services/tasksService.ts:15`.
5. `useTasks.createTask` appends the returned task to that hook instance's local state from `src/hooks/useTasks.ts:30`.
6. Task updates and completion flow through `useTasks.updateTask` and `useTasks.completeTask` from `src/hooks/useTasks.ts:38` and `src/hooks/useTasks.ts:51`.
7. Task deletion flows through `tasksService.deleteTask` and local state filtering from `src/hooks/useTasks.ts:58`.

### Project Create/Delete Flow

1. `ProjectsPage` opens `CreateProjectModal` using page-local modal state from `src/pages/ProjectsPage.tsx:12`.
2. `CreateProjectModal` validates the project name and submits to `onCreateProject` from `src/components/projects/CreateProjectModal.tsx:45`.
3. `useProjects.createProject` calls `projectsService.createProject` from `src/hooks/useProjects.ts:29`.
4. `projectsService.createProject` mutates the module array and resolves the new project from `src/services/projectsService.ts:15`.
5. `ProjectsPage` calculates progress by filtering tasks by `projectId` from `src/pages/ProjectsPage.tsx:14`.
6. Project deletion calls `deleteProject(project.id)` after a browser confirmation from `src/pages/ProjectsPage.tsx:56`.

### Theme Flow

1. `ThemeProvider` initializes `theme` from `localStorage.getItem('theme')` from `src/contexts/ThemeContext.tsx:13`.
2. Theme changes persist to `localStorage` and toggle the root `dark` class from `src/contexts/ThemeContext.tsx:18`.
3. `SettingsPage` reads `theme` and `toggleTheme` through `useTheme` from `src/pages/SettingsPage.tsx:10`.
4. Dark-mode styling comes from Tailwind `darkMode: 'class'` in `tailwind.config.js:7` plus global overrides in `src/index.css:22`.

**State Management:**
- Use React local state for route-level UI concerns such as filters and modal visibility in `src/pages/TasksPage.tsx`.
- Use custom hooks for task/project collections in `src/hooks/useTasks.ts` and `src/hooks/useProjects.ts`.
- Use module-level mutable arrays for shared mock data in `src/services/tasksService.ts` and `src/services/projectsService.ts`.
- Use React context only for theme in `src/contexts/ThemeContext.tsx`.
- No Redux, Zustand, React Query, Context-based data store, backend API, or browser persistence for task/project data is detected.

## Key Abstractions

**Route Page:**
- Purpose: A route-owned component that coordinates data, local workflow state, and feature UI.
- Examples: `src/pages/DashboardPage.tsx`, `src/pages/TasksPage.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/CalendarPage.tsx`, `src/pages/ReportsPage.tsx`, `src/pages/SettingsPage.tsx`.
- Pattern: Default-exported `React.FC` page rendered from `src/routes/AppRoutes.tsx`.

**App Layout:**
- Purpose: Shared shell for sidebar, topbar, and scrollable page content.
- Examples: `src/components/layout/AppLayout.tsx`, `src/components/layout/Sidebar.tsx`, `src/components/layout/Topbar.tsx`.
- Pattern: Pages wrap content in `<AppLayout>` and pass optional topbar callbacks such as `onNewTask`.

**Common Component Primitive:**
- Purpose: Reusable visual/control building blocks with variant props.
- Examples: `src/components/common/Button.tsx`, `src/components/common/Card.tsx`, `src/components/common/Input.tsx`, `src/components/common/Select.tsx`, `src/components/common/Modal.tsx`.
- Pattern: Named exports, typed props, Tailwind class composition, `React.forwardRef` for form/control primitives.

**Feature Component:**
- Purpose: Domain-specific UI that receives data and callbacks from pages.
- Examples: `src/components/tasks/TaskList.tsx`, `src/components/tasks/TaskCard.tsx`, `src/components/projects/ProjectCard.tsx`, `src/components/calendar/CalendarMonth.tsx`.
- Pattern: Named-exported `React.FC` with explicit prop interfaces and optional callback props.

**Form Modal:**
- Purpose: Encapsulate task/project creation or editing form state inside a modal.
- Examples: `src/components/tasks/CreateTaskModal.tsx`, `src/components/tasks/EditTaskModal.tsx`, `src/components/projects/CreateProjectModal.tsx`.
- Pattern: Local `formData` and `loading` state, browser `alert` for validation/failures, parent callback for persistence.

**Service Object:**
- Purpose: Data access facade around mock in-memory arrays.
- Examples: `src/services/tasksService.ts`, `src/services/projectsService.ts`.
- Pattern: Named object export with async methods returning `Promise.resolve(...)`.

**Domain Type:**
- Purpose: Shared TypeScript contracts for data shape and enum-like unions.
- Examples: `src/types/task.ts`, `src/types/project.ts`, `src/types/user.ts`.
- Pattern: Exported interfaces and union types imported by services, hooks, pages, and components.

**Mascot Asset Mapping:**
- Purpose: Map semantic mascot states to public image files.
- Examples: `src/components/mascot/Mascot.tsx`, `public/bobjoia.png`, `public/bobduvida.png`, `public/boberror404.png`, `public/bobforte.png`, `public/bobtriste.png`.
- Pattern: `Record<MascotState, string>` public-root image URLs.

## Entry Points

**HTML Entry:**
- Location: `index.html`
- Triggers: Browser request for the Vite app.
- Responsibilities: Set document language/title, provide `#root`, and load `/src/main.tsx`.

**React Entry:**
- Location: `src/main.tsx`
- Triggers: Vite module script.
- Responsibilities: Import global CSS and mount `<App />` into the DOM.

**Application Root:**
- Location: `src/App.tsx`
- Triggers: React render from `src/main.tsx`.
- Responsibilities: Provide theme context and client-side routing.

**Route Entry:**
- Location: `src/routes/AppRoutes.tsx`
- Triggers: `BrowserRouter` location changes.
- Responsibilities: Render the page for `/`, `/tasks`, `/projects`, `/calendar`, `/reports`, `/settings`, or wildcard `*`.

**Style Entry:**
- Location: `src/index.css`
- Triggers: Imported by `src/main.tsx`.
- Responsibilities: Load Tailwind layers, set global transitions, define body colors, and apply dark-mode tweaks.

**Build Config Entry:**
- Location: `vite.config.ts`
- Triggers: `npm run dev`, `npm run build`, `npm run preview`.
- Responsibilities: Register React plugin, configure `@` alias, and set development server port `5173`.

## Architectural Constraints

- **Threading:** Single-threaded browser React runtime. No Web Workers, service workers, or background jobs are detected in `src/`.
- **Global state:** `src/services/tasksService.ts` and `src/services/projectsService.ts` use module-level mutable arrays; `src/contexts/ThemeContext.tsx` mutates `localStorage` and `document.documentElement`.
- **Per-hook state:** Each call to `useTasks` or `useProjects` owns separate React state initialized from the shared service arrays; sibling pages do not share a React data context.
- **Circular imports:** No circular dependency chain is apparent from the scanned imports. Imports flow from pages/components to hooks/services/types/data, with `src/routes/AppRoutes.tsx` depending on pages.
- **Routing:** All page routes are declared centrally in `src/routes/AppRoutes.tsx`; route paths are also duplicated in the sidebar navigation items in `src/components/layout/Sidebar.tsx`.
- **Persistence:** Task and project mutations are in-memory only in `src/services/tasksService.ts` and `src/services/projectsService.ts`. A browser refresh resets tasks/projects to `src/data/mockTasks.ts` and `src/data/mockProjects.ts`.
- **Assets:** Public images are referenced by absolute public-root URLs in `src/components/common/Logo.tsx` and `src/components/mascot/Mascot.tsx`.
- **Styling:** Components rely on Tailwind utility classes and project tokens from `tailwind.config.js`; there is no CSS modules or component stylesheet layer.

## Anti-Patterns

### Bypassing Hook Data Boundaries

**What happens:** Some UI files call services directly for project options instead of using a hook-level data boundary.
**Why it's wrong:** It spreads data access across pages and modal components, making loading/error behavior inconsistent with `useTasks` and `useProjects`.
**Do this instead:** Route-level pages should load domain data through hooks such as `src/hooks/useProjects.ts` and pass the necessary options into child components such as `src/components/tasks/CreateTaskModal.tsx`.

### Duplicating Route Metadata

**What happens:** Paths and labels are defined in both `src/routes/AppRoutes.tsx` and `src/components/layout/Sidebar.tsx`.
**Why it's wrong:** New routes require coordinated edits in two places, and route/navigation drift is easy to introduce.
**Do this instead:** Keep route path constants or route metadata near `src/routes/AppRoutes.tsx` and import them into `src/components/layout/Sidebar.tsx`.

### Browser Dialogs in Feature Workflows

**What happens:** Pages and modals use `alert(...)`, `window.confirm(...)`, and console logging for user-visible validation and failure flows.
**Why it's wrong:** Browser dialogs bypass the reusable UI layer in `src/components/common/` and prevent consistent error display.
**Do this instead:** Use `src/components/common/Modal.tsx`, `src/components/common/Button.tsx`, and component-level error props or state to render confirmations and validation messages.

### In-Memory Service State as Data Store

**What happens:** `src/services/tasksService.ts` and `src/services/projectsService.ts` mutate module arrays seeded from mock data.
**Why it's wrong:** It behaves like persistence during one browser session but resets on reload and is not observable by all mounted hook instances.
**Do this instead:** Keep the service API shape, but replace internals with a real storage/API client or promote shared collection state to a single provider/hook boundary.

## Error Handling

**Strategy:** Local hook errors and form-level `try/catch`; no global error boundary or centralized notification system is detected.

**Patterns:**
- Hooks catch service failures, assign `Error | null` state, and rethrow mutation errors in `src/hooks/useTasks.ts` and `src/hooks/useProjects.ts`.
- Form modals catch mutation errors and show browser `alert(...)` messages in `src/components/tasks/CreateTaskModal.tsx`, `src/components/tasks/EditTaskModal.tsx`, and `src/components/projects/CreateProjectModal.tsx`.
- `useTheme` throws immediately if consumed outside `ThemeProvider` in `src/contexts/ThemeContext.tsx`.
- Not-found routing is handled with a wildcard route to `src/pages/NotFoundPage.tsx`.

## Cross-Cutting Concerns

**Logging:** Console logging is limited to form mutation catches in `src/components/tasks/CreateTaskModal.tsx`, `src/components/tasks/EditTaskModal.tsx`, and `src/components/projects/CreateProjectModal.tsx`.

**Validation:** Required title/name validation is local to form modals in `src/components/tasks/CreateTaskModal.tsx`, `src/components/tasks/EditTaskModal.tsx`, and `src/components/projects/CreateProjectModal.tsx`; no schema validation library is detected.

**Authentication:** Not detected. `src/data/mockUser.ts` supplies display/profile data only.

**Authorization:** Not detected. No role/permission checks are present in `src/`.

**Theming:** `src/contexts/ThemeContext.tsx`, `tailwind.config.js`, and `src/index.css` implement class-based dark mode.

**Internationalization:** Text is inline Portuguese strings across pages/components such as `src/pages/DashboardPage.tsx`, `src/pages/TasksPage.tsx`, and `src/components/tasks/CreateTaskModal.tsx`; no i18n framework is detected.

**Accessibility:** Standard HTML controls are used in common inputs and buttons, but custom icon buttons in files such as `src/components/layout/Topbar.tsx` and `src/components/tasks/TaskCard.tsx` do not define explicit ARIA labels.

**Animations:** `framer-motion` is used in `src/components/common/Modal.tsx`, `src/components/tasks/TaskCard.tsx`, `src/components/dashboard/ProgressCard.tsx`, and `src/components/mascot/Mascot.tsx`.

---

*Architecture analysis: 2026-06-12*
