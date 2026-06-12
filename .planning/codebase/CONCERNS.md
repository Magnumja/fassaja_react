# Codebase Concerns

**Analysis Date:** 2026-06-12

## Tech Debt

**Production build is blocked by unused code under strict TypeScript settings:**
- Issue: `tsconfig.json:20-22` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`, while `npm run build` runs `tsc && vite build` from `package.json:7`. The TypeScript phase fails on unused imports/variables.
- Files: `tsconfig.json`, `package.json`, `src/App.tsx`, `src/components/projects/ProjectCard.tsx`, `src/components/tasks/TaskCard.tsx`, `src/components/tasks/TaskFilters.tsx`, `src/pages/CalendarPage.tsx`, `src/pages/DashboardPage.tsx`, `src/pages/NotFoundPage.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/ReportsPage.tsx`
- Impact: The app cannot produce a production bundle until the unused declarations are removed or intentionally used.
- Fix approach: Remove unused imports and variables first; keep `noUnusedLocals` and `noUnusedParameters` enabled because they are already part of the compiler contract.

**Lint command is configured but ESLint is not installed:**
- Issue: `package.json:9` defines `eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0`, but `package.json:19-29` has no `eslint`, TypeScript ESLint packages, or ESLint config file.
- Files: `package.json`
- Impact: `npm run lint` exits before linting, so style and correctness checks are not enforceable in local or CI workflows.
- Fix approach: Add the ESLint dependency set and config for React + TypeScript, or replace the script with the linting tool actually used by the project.

**Application state is mock, mutable, and process-local:**
- Issue: `tasksService` and `projectsService` keep module-level arrays seeded from mock data (`let tasks = [...mockTasks]`, `let projects = [...mockProjects]`) and expose async methods that only mutate memory.
- Files: `src/services/tasksService.ts:4`, `src/services/projectsService.ts:4`, `src/data/mockTasks.ts`, `src/data/mockProjects.ts`, `src/hooks/useTasks.ts`, `src/hooks/useProjects.ts`
- Impact: Data disappears on page reload, cannot sync across tabs/users, and each hook consumer can hold stale local state after another view mutates the service.
- Fix approach: Introduce a real persistence boundary or an app-level store; make hooks subscribe to one source of truth instead of copying service snapshots into isolated component state.

**Project/task relationships are not enforced:**
- Issue: `projectsService.deleteProject` removes only the project record; tasks that reference the deleted `projectId` remain in `tasksService`.
- Files: `src/services/projectsService.ts:33-38`, `src/services/tasksService.ts:48-54`, `src/pages/ProjectsPage.tsx:55-58`, `src/components/tasks/TaskFilters.tsx:48-51`
- Impact: Deleted projects can leave orphaned tasks with invisible or invalid project filters, and project statistics no longer explain where those tasks belong.
- Fix approach: Decide the product behavior for deletion, then cascade delete, clear `projectId`, or block deletion while tasks reference the project.

**Project loading is duplicated and weakly typed:**
- Issue: `TasksPage`, `CreateTaskModal`, `EditTaskModal`, and `TaskFilters` each load or accept project data independently, with `any[]` used for project arrays.
- Files: `src/pages/TasksPage.tsx:14-26`, `src/components/tasks/CreateTaskModal.tsx:33-36`, `src/components/tasks/EditTaskModal.tsx:36-39`, `src/components/tasks/TaskFilters.tsx:17`
- Impact: Project options can drift between task views, and TypeScript cannot protect consumers from malformed project objects.
- Fix approach: Use `Project[]` from `src/types/project.ts` and centralize project option loading through `useProjects` or a shared store.

## Known Bugs

**Build command fails before Vite bundling:**
- Symptoms: `npm run build` reports unused declarations including `React` in `src/App.tsx`, `Badge` in `src/components/projects/ProjectCard.tsx`, `Flag` in `src/components/tasks/TaskCard.tsx`, `TaskList` and `deleteTask` in `src/pages/CalendarPage.tsx`, `Mascot` in `src/pages/DashboardPage.tsx`, `Button` in `src/pages/NotFoundPage.tsx`, `updateProject` in `src/pages/ProjectsPage.tsx`, and `entry` in `src/pages/ReportsPage.tsx`.
- Files: `package.json:7`, `tsconfig.json:21-22`, `src/App.tsx`, `src/components/projects/ProjectCard.tsx`, `src/components/tasks/TaskCard.tsx`, `src/components/tasks/TaskFilters.tsx`, `src/pages/CalendarPage.tsx`, `src/pages/DashboardPage.tsx`, `src/pages/NotFoundPage.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/ReportsPage.tsx`
- Trigger: Run `npm run build`.
- Workaround: Remove the unused declarations; disabling compiler checks hides the issue and conflicts with the existing TypeScript settings.

**Task completion checkbox can also open the edit modal:**
- Symptoms: In the task list view, clicking a task checkbox can bubble to the parent card click handler and open edit UI while completing the task.
- Files: `src/components/tasks/TaskCard.tsx:46-56`, `src/components/common/Card.tsx:19-27`, `src/pages/TasksPage.tsx:117-125`
- Trigger: Open `/tasks` and click a task checkbox rendered by `TaskList`.
- Workaround: Stop event propagation on the checkbox click/change path before calling `onComplete`.

**Project edit action is a placeholder:**
- Symptoms: Project cards expose an edit button, but `ProjectsPage` only shows an alert and has a `TODO` comment.
- Files: `src/pages/ProjectsPage.tsx:51-54`, `src/components/projects/ProjectCard.tsx:37-43`
- Trigger: Open `/projects` and click a project edit button.
- Workaround: None in the UI; use `projectsService.updateProject` directly only from code.

**Reports trend chart shows random values on each render:**
- Symptoms: The weekly trend data is generated with `Math.random`, so chart values change when the page re-renders and do not reflect task history.
- Files: `src/pages/ReportsPage.tsx:50-56`
- Trigger: Open `/reports` and cause a rerender or revisit the route.
- Workaround: Derive trend data from `createdAt` and `completedAt` in `src/types/task.ts` instead of random numbers.

**Date-only strings can render one day off in local time zones west of UTC:**
- Symptoms: `new Date('YYYY-MM-DD')` parses as UTC midnight, then `toLocaleDateString('pt-BR')` renders in the browser's local time. In `America/Cuiaba`, date-only task due dates can display as the previous local day.
- Files: `src/utils/date.ts:1-8`, `src/utils/date.ts:10-18`, `src/utils/date.ts:20-34`, `src/components/tasks/TaskCard.tsx:80-83`
- Trigger: Format an input-date value such as `2026-06-12` through `formatDate`.
- Workaround: Parse date-only values as local dates by splitting `YYYY-MM-DD` into numeric year/month/day, or store due dates as full timezone-aware instants.

**Settings controls do not persist and can produce invalid numbers:**
- Symptoms: Goal inputs update local component state only, notification checkboxes are uncontrolled with `defaultChecked`, and clearing a number field stores `NaN`.
- Files: `src/pages/SettingsPage.tsx:11-12`, `src/pages/SettingsPage.tsx:55-67`, `src/pages/SettingsPage.tsx:112-121`
- Trigger: Change goals or notification toggles, then reload or navigate away; clear a goal input.
- Workaround: None in the UI; persist settings through a service/store and validate numeric input before storing it.

## Security Considerations

**Known vulnerable dev dependency chain:**
- Risk: `npm audit --audit-level=moderate` reports Vite/esbuild advisories, including a high-severity esbuild development-server exposure and a moderate esbuild binary-integrity issue.
- Files: `package.json:23-28`, `package-lock.json:1814-1850`, `package-lock.json:3138-3150`, `vite.config.ts:12-15`
- Current mitigation: Vite dev server is configured for local port `5173` with `open: false`; no host restriction beyond Vite defaults is explicitly documented in `vite.config.ts`.
- Recommendations: Upgrade Vite/esbuild through a tested dependency update path; avoid exposing the Vite dev server beyond localhost until the advisory is remediated.

**No authentication, authorization, or data isolation layer exists:**
- Risk: All app data is local mock data and there is no user boundary beyond `mockUser`.
- Files: `src/data/mockUser.ts`, `src/services/tasksService.ts`, `src/services/projectsService.ts`, `src/App.tsx`
- Current mitigation: No backend or remote persistence is present, so server-side access control is not applicable.
- Recommendations: Before adding persistence or APIs, define authentication, ownership checks for tasks/projects, and API-side validation instead of trusting client-side fields.

**Browser storage access is not guarded:**
- Risk: `ThemeProvider` reads and writes `localStorage` directly during state initialization/effects; restricted browser contexts can throw storage exceptions.
- Files: `src/contexts/ThemeContext.tsx:13-20`
- Current mitigation: None detected.
- Recommendations: Wrap storage reads/writes in `try/catch` and fall back to an in-memory/default theme when storage is unavailable.

## Performance Bottlenecks

**Task filtering and status counts repeatedly scan arrays in render paths:**
- Problem: Pages compute counts with multiple `.filter` passes and list filtering scans all tasks on every relevant render.
- Files: `src/pages/TasksPage.tsx:40-46`, `src/pages/ProjectsPage.tsx:14-19`, `src/hooks/useDashboardStats.ts:25-43`, `src/components/tasks/TaskList.tsx:15-24`
- Cause: Derived data is recomputed independently in each view rather than normalized into shared selectors.
- Improvement path: Keep the current approach for small mock data; introduce memoized selectors or indexed aggregates before adding large persisted task lists.

**Calendar does per-day task scans:**
- Problem: `CalendarMonth` calls `getTasksForDate(day)` for every rendered day, and each call filters the full task array.
- Files: `src/components/calendar/CalendarMonth.tsx:34-37`, `src/components/calendar/CalendarMonth.tsx:93-119`
- Cause: Tasks are not grouped by `dueDate` before rendering the calendar grid.
- Improvement path: Build a `Map<dueDate, Task[]>` with `useMemo` once per `tasks`/month change and read each day from the map.

## Fragile Areas

**Hook state can diverge across routes and components:**
- Files: `src/hooks/useTasks.ts:8-70`, `src/hooks/useProjects.ts:8-63`, `src/services/tasksService.ts`, `src/services/projectsService.ts`
- Why fragile: Each `useTasks`/`useProjects` caller loads a snapshot into local state, while the service mutates module arrays without notifying existing hook instances.
- Safe modification: Move mutation ownership into a context/store provider or add a subscription mechanism before adding cross-route workflows.
- Test coverage: No tests detected for hook synchronization or service mutation behavior.

**Forms rely on browser alerts and minimal validation:**
- Files: `src/components/tasks/CreateTaskModal.tsx:55-90`, `src/components/tasks/EditTaskModal.tsx:71-98`, `src/components/projects/CreateProjectModal.tsx:45-72`
- Why fragile: Required fields are checked manually, errors are surfaced through `alert`, project IDs and dates are not validated against domain rules, and service failures have no recoverable UI state.
- Safe modification: Add field-level validation and typed error display in shared form components before expanding task/project fields.
- Test coverage: No form tests detected for validation, failed submissions, or loading states.

**Modal accessibility is incomplete:**
- Files: `src/components/common/Modal.tsx:31-69`
- Why fragile: The modal renders visual overlay/content but does not set `role="dialog"`, `aria-modal`, labelled title linkage, focus trapping, Escape handling, or focus restoration.
- Safe modification: Add accessible dialog behavior in `Modal` once, then keep feature modals thin.
- Test coverage: No accessibility or keyboard interaction tests detected.

**UI routes contain nonfunctional quick actions and support actions:**
- Files: `src/pages/DashboardPage.tsx:153-179`, `src/pages/ProjectsPage.tsx:51-54`
- Why fragile: Buttons appear actionable but either have no handler or show placeholder alerts.
- Safe modification: Wire buttons to existing route/modal actions or hide them until the feature exists.
- Test coverage: No route-level tests detected for button behavior.

## Scaling Limits

**Client-side memory services limit data size and collaboration:**
- Current capacity: Capacity is effectively one browser session and one in-memory JavaScript runtime.
- Limit: Reloads reset to mock data; multi-device, multi-user, background sync, and offline conflict handling are unsupported.
- Scaling path: Add a persistence layer with typed repository methods, migrations/schema, and clear task/project ownership boundaries.

**Charts and reports have no historical event model:**
- Current capacity: Reports can summarize the current task array and display generated trend data.
- Limit: Accurate trend, creation, completion, and productivity history cannot be reconstructed reliably from only current task fields.
- Scaling path: Store task lifecycle events or immutable audit timestamps, then derive report series from those records.

## Dependencies at Risk

**Vite/esbuild:**
- Risk: `npm audit` reports advisories in the installed Vite/esbuild chain and suggests a breaking major update path.
- Impact: Development server exposure risk remains until dependencies are upgraded; a forced update can break Vite/plugin compatibility.
- Migration plan: Upgrade Vite and `@vitejs/plugin-react` together in a dedicated dependency phase, run `npm run build`, and add a smoke test for local dev/preview.

**ESLint toolchain:**
- Risk: A lint script exists without the package/config required to run it.
- Impact: CI or developer environments that expect `npm run lint` to pass will fail immediately.
- Migration plan: Install and configure ESLint for React + TypeScript, or remove the script and document the replacement checker.

**Playwright package without test harness:**
- Risk: `@playwright/test` is installed but no `playwright.config.*` or `*.spec.*` files are present.
- Impact: The dependency adds maintenance surface without delivering executable coverage.
- Migration plan: Add a minimal Playwright config and route smoke tests, or remove the dependency until E2E tests are introduced.

## Missing Critical Features

**Persistent task/project storage:**
- Problem: User-created tasks and projects only live in memory.
- Blocks: Real user adoption, reload-safe workflows, cross-device access, and meaningful reports.

**Project editing workflow:**
- Problem: `ProjectCard` exposes edit UI but `ProjectsPage` only shows a placeholder alert.
- Blocks: Correcting project names, colors, or descriptions after creation.

**Settings persistence and notification behavior:**
- Problem: Goals and notification toggles are local-only UI controls.
- Blocks: Personalization, reminders, and any feature depending on saved user preferences.

**Automated test suite:**
- Problem: No `*.test.*`, `*.spec.*`, Vitest/Jest config, or Playwright config files are detected.
- Blocks: Safe refactors of service state, date logic, forms, and route interactions.

## Test Coverage Gaps

**Services and hooks:**
- What's not tested: Task/project create, update, delete, completion, snapshot refresh, and cross-hook synchronization.
- Files: `src/services/tasksService.ts`, `src/services/projectsService.ts`, `src/hooks/useTasks.ts`, `src/hooks/useProjects.ts`
- Risk: State regressions and orphaned relationships can ship unnoticed.
- Priority: High

**Date utilities and calendar grouping:**
- What's not tested: Date-only parsing, local timezone rendering, overdue/today/tomorrow logic, and calendar task matching.
- Files: `src/utils/date.ts`, `src/components/calendar/CalendarMonth.tsx`, `src/pages/CalendarPage.tsx`
- Risk: Due dates can appear on the wrong day or report incorrect overdue status.
- Priority: High

**Task and project forms:**
- What's not tested: Validation, loading states, project selection, submission success/failure, and edit form initialization.
- Files: `src/components/tasks/CreateTaskModal.tsx`, `src/components/tasks/EditTaskModal.tsx`, `src/components/projects/CreateProjectModal.tsx`
- Risk: Form changes can break core create/edit workflows without detection.
- Priority: High

**Route-level user flows:**
- What's not tested: Dashboard quick actions, task completion/delete/edit interactions, project edit/delete interactions, reports rendering, and settings controls.
- Files: `src/pages/DashboardPage.tsx`, `src/pages/TasksPage.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/ReportsPage.tsx`, `src/pages/SettingsPage.tsx`
- Risk: Visible UI regressions are only caught manually.
- Priority: Medium

---

*Concerns audit: 2026-06-12*
