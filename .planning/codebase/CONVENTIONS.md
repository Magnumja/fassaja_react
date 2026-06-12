# Coding Conventions

**Analysis Date:** 2026-06-12

## Naming Patterns

**Files:**
- Use PascalCase for React component files under `src/components/`, `src/pages/`, `src/routes/AppRoutes.tsx`, and `src/contexts/ThemeContext.tsx`: examples include `src/components/common/Button.tsx`, `src/components/tasks/TaskCard.tsx`, and `src/pages/DashboardPage.tsx`.
- Use `use` + PascalCase for hook files under `src/hooks/`: `src/hooks/useTasks.ts`, `src/hooks/useProjects.ts`, and `src/hooks/useDashboardStats.ts`.
- Use camelCase for service, utility, data, and type modules: `src/services/tasksService.ts`, `src/services/projectsService.ts`, `src/utils/date.ts`, `src/data/mockTasks.ts`, `src/types/task.ts`, and `src/types/project.ts`.
- Use domain-specific directories under `src/components/`: `src/components/common/`, `src/components/tasks/`, `src/components/projects/`, `src/components/dashboard/`, `src/components/calendar/`, `src/components/layout/`, and `src/components/mascot/`.

**Functions:**
- Use PascalCase for component declarations: `const DashboardPage: React.FC = () => { ... }` in `src/pages/DashboardPage.tsx` and `export const TaskCard: React.FC<TaskCardProps> = (...)` in `src/components/tasks/TaskCard.tsx`.
- Use camelCase verbs for event handlers and local helpers: `handleSubmit`, `handleChange`, `handleResetFilters`, `getProgressMessage`, and `getProjectStats` in `src/components/tasks/CreateTaskModal.tsx`, `src/pages/TasksPage.tsx`, `src/pages/DashboardPage.tsx`, and `src/pages/ProjectsPage.tsx`.
- Use named `export function` for hooks and pure utilities: `useTasks` in `src/hooks/useTasks.ts`, `useDashboardStats` in `src/hooks/useDashboardStats.ts`, and date helpers in `src/utils/date.ts`.
- Use object-method syntax for service methods on exported service singletons: `tasksService.getTasks`, `tasksService.createTask`, and `projectsService.updateProject` in `src/services/tasksService.ts` and `src/services/projectsService.ts`.

**Variables:**
- Use camelCase for state, derived data, and constants: `showCreateModal`, `selectedTask`, `filterStatus`, `taskStats`, `upcomingTasks`, and `completionRate` in `src/pages/TasksPage.tsx`, `src/pages/DashboardPage.tsx`, and `src/hooks/useDashboardStats.ts`.
- Use descriptive `setX` state setters from React hooks: `setTasks`, `setProjects`, `setLoading`, `setError`, and `setFormData` in `src/hooks/useTasks.ts`, `src/hooks/useProjects.ts`, and `src/components/tasks/CreateTaskModal.tsx`.
- Use plural names for arrays and singular names in callbacks: `tasks.filter(task => ...)` in `src/components/tasks/TaskList.tsx` and `projects.map(project => ...)` in `src/pages/ProjectsPage.tsx`.
- Avoid `any` in new code; existing `React.useState<any[]>([])` appears in `src/pages/TasksPage.tsx` and `src/components/tasks/CreateTaskModal.tsx`, but domain arrays should use `Project[]` from `src/types/project.ts`.

**Types:**
- Use `interface` for object-shaped props and domain objects: `Task` in `src/types/task.ts`, `Project` in `src/types/project.ts`, `ButtonProps` in `src/components/common/Button.tsx`, and `TaskCardProps` in `src/components/tasks/TaskCard.tsx`.
- Use union type aliases for constrained string domains: `TaskStatus` and `TaskPriority` in `src/types/task.ts`, plus component option unions like `ButtonVariant` and `ButtonSize` in `src/components/common/Button.tsx`.
- Use `Omit<T, ...>` and `Partial<T>` for service and form contracts: `Omit<Task, 'id' | 'createdAt'>` in `src/hooks/useTasks.ts` and `Partial<Project>` in `src/services/projectsService.ts`.

## Code Style

**Formatting:**
- Formatter config is not detected; there is no `.prettierrc`, `prettier.config.*`, or `biome.json` in the repository root.
- Most `src/` files use two-space indentation, single quotes, semicolons, trailing commas in multiline JSX calls, and JSX-first readability, as seen in `src/components/common/Button.tsx`, `src/components/common/Input.tsx`, and `src/pages/TasksPage.tsx`.
- `src/main.tsx`, `vite.config.ts`, and `tailwind.config.js` use no semicolons while most files under `src/` use semicolons. For new application code under `src/`, follow the semicolon style used by nearby files.
- Use Tailwind utility classes directly in JSX and small style maps for variants: `variantStyles` and `sizeStyles` in `src/components/common/Button.tsx`, `paddingStyles` in `src/components/common/Card.tsx`, and `statusConfig` in `src/components/tasks/TaskCard.tsx`.
- Put reusable Tailwind theme tokens in `tailwind.config.js` and global dark-mode tweaks in `src/index.css`; do not hard-code duplicate color names when `primary`, `text`, `border`, `success`, `warning`, or `danger` tokens exist.

**Linting:**
- `package.json` declares `npm run lint` as `eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0`.
- ESLint configuration is not detected; there is no `.eslintrc*` or `eslint.config.*` in the repository root.
- `eslint` is not listed in `package.json` or detected in `package-lock.json`; treat the lint script in `package.json` as declared but not fully wired.
- TypeScript strictness is enforced by `tsconfig.json`: `strict`, `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` are enabled.

## Import Organization

**Order:**
1. React imports first: `import React, { useState } from 'react';` in `src/pages/DashboardPage.tsx` and `src/components/tasks/CreateTaskModal.tsx`.
2. Third-party UI/runtime imports next: `react-router-dom`, `lucide-react`, `framer-motion`, and `recharts` imports in `src/routes/AppRoutes.tsx`, `src/pages/ReportsPage.tsx`, and `src/components/common/Modal.tsx`.
3. Absolute project imports via `@/` for cross-directory dependencies: `@/components/...`, `@/hooks/...`, `@/services/...`, `@/types/...`, and `@/data/...` in `src/pages/TasksPage.tsx` and `src/pages/DashboardPage.tsx`.
4. Relative imports are used for same-folder component dependencies: `./TaskCard` in `src/components/tasks/TaskList.tsx`, `./Mascot` in `src/components/mascot/MascotMessage.tsx`, and `./Sidebar` in `src/components/layout/AppLayout.tsx`.
5. Stylesheet imports are entry-point only: `import './index.css'` in `src/main.tsx`.

**Path Aliases:**
- Use `@/*` for `src/*`; it is configured in `tsconfig.json` and `vite.config.ts`.
- Use absolute `@/` imports when crossing feature or layer boundaries, such as `src/pages/DashboardPage.tsx` importing `src/components/tasks/TaskCard.tsx` and `src/hooks/useTasks.ts`.
- Use local relative imports only inside the same folder or tightly coupled sibling folders, as in `src/components/tasks/TaskList.tsx` and `src/components/layout/AppLayout.tsx`.

## Error Handling

**Patterns:**
- Hooks keep `error: Error | null` state and set it inside `catch` blocks: `src/hooks/useTasks.ts` and `src/hooks/useProjects.ts`.
- Mutating hook methods rethrow after setting error state so callers can handle UI feedback: `createTask`, `updateTask`, and `deleteTask` in `src/hooks/useTasks.ts`; `createProject`, `updateProject`, and `deleteProject` in `src/hooks/useProjects.ts`.
- Context misuse fails fast with a thrown error: `useTheme` in `src/contexts/ThemeContext.tsx` throws when called outside `ThemeProvider`.
- Form submit handlers use `try/catch/finally` with local loading state and browser alerts: `src/components/tasks/CreateTaskModal.tsx`, `src/components/tasks/EditTaskModal.tsx`, and `src/components/projects/CreateProjectModal.tsx`.
- Service methods return `undefined` or `false` for missing records instead of throwing: `src/services/tasksService.ts` and `src/services/projectsService.ts`.
- New async UI code should follow the hook pattern from `src/hooks/useTasks.ts`: set loading before awaiting, clear or set error explicitly, and reset loading in `finally`.

## Logging

**Framework:** `console`

**Patterns:**
- Error logging is limited to form submission failures using `console.error(error)` in `src/components/tasks/CreateTaskModal.tsx`, `src/components/tasks/EditTaskModal.tsx`, and `src/components/projects/CreateProjectModal.tsx`.
- User-visible failures use `alert(...)` in form components and placeholder interactions: `src/components/tasks/CreateTaskModal.tsx`, `src/components/tasks/EditTaskModal.tsx`, `src/components/projects/CreateProjectModal.tsx`, `src/pages/ProjectsPage.tsx`, and `src/pages/DashboardPage.tsx`.
- No centralized logger, toast system, or error boundary is detected in `src/`; new code should keep logging minimal and prefer local error state until a shared notification pattern exists.

## Comments

**When to Comment:**
- Use short JSX section comments to structure large render trees: `src/pages/DashboardPage.tsx`, `src/pages/TasksPage.tsx`, `src/components/tasks/CreateTaskModal.tsx`, and `src/components/common/Modal.tsx`.
- Use comments for visible UI sections such as `Header`, `Stats`, `Filters`, `Actions`, and modal regions, matching `src/pages/TasksPage.tsx` and `src/components/tasks/CreateTaskModal.tsx`.
- Avoid comments for self-explanatory handlers and state. Existing comments are mostly section dividers rather than implementation explanations.
- TODO comments are rare; the only detected implementation TODO is in `src/pages/ProjectsPage.tsx` for the edit modal.

**JSDoc/TSDoc:**
- Not used in current source files. `src/utils/date.ts`, `src/hooks/useTasks.ts`, and `src/services/tasksService.ts` rely on TypeScript signatures rather than docblocks.

## Function Design

**Size:** Keep components and hooks focused around one screen, UI primitive, or data concern. Current larger files are screen/component implementations such as `src/pages/DashboardPage.tsx`, `src/pages/ReportsPage.tsx`, `src/components/tasks/EditTaskModal.tsx`, and `src/components/tasks/CreateTaskModal.tsx`.

**Parameters:** Prefer typed object props for components and explicit primitive/domain parameters for services and utilities. Examples: `TaskCardProps` in `src/components/tasks/TaskCard.tsx`, `CreateTaskModalProps` in `src/components/tasks/CreateTaskModal.tsx`, `updateTask(id: string, updates: Partial<Task>)` in `src/services/tasksService.ts`, and `formatDate(dateString: string)` in `src/utils/date.ts`.

**Return Values:** Components return JSX, hooks return plain objects of state plus actions, services return `Promise<T>` wrappers around in-memory data, and utility functions return primitive formatted values. Examples: `useTasks` in `src/hooks/useTasks.ts`, `projectsService` in `src/services/projectsService.ts`, and date helpers in `src/utils/date.ts`.

## Module Design

**Exports:** Use named exports for reusable components, hooks, services, data, and utilities: `Button` in `src/components/common/Button.tsx`, `useProjects` in `src/hooks/useProjects.ts`, `tasksService` in `src/services/tasksService.ts`, and `mockTasks` in `src/data/mockTasks.ts`. Use default exports for page-level route components and the root app: `src/pages/DashboardPage.tsx`, `src/pages/TasksPage.tsx`, `src/pages/ProjectsPage.tsx`, and `src/App.tsx`.

**Barrel Files:** Barrel files are not used. Import modules directly from their concrete path, such as `@/components/common/Button`, `@/hooks/useTasks`, and `@/types/task`.

---

*Convention analysis: 2026-06-12*
