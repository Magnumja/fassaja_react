# Testing Patterns

**Analysis Date:** 2026-06-12

## Test Framework

**Runner:**
- No active test runner is configured in scripts. `package.json` has `dev`, `build`, `preview`, and `lint`, but no `test`, `test:watch`, or `coverage` command.
- `@playwright/test` `^1.60.0` is listed in `package.json`, but no `playwright.config.*` file and no Playwright spec files are detected.
- Jest, Vitest, React Testing Library, and Cypress are not detected in `package.json`, `package-lock.json`, or committed test files.
- Config: Not detected. There is no `jest.config.*`, `vitest.config.*`, or `playwright.config.*` at the repository root.

**Assertion Library:**
- Not detected. There are no committed usages of `expect(...)`, `describe(...)`, `it(...)`, `test(...)`, `screen.*`, or Playwright `page.*` outside application code.

**Run Commands:**
```bash
# Not detected: package.json has no test script.
npm run build          # Type-check with tsc and build with Vite.
npm run lint           # Declared lint command; eslint package/config is not wired in package.json.
# Not detected: no coverage command exists.
```

## Test File Organization

**Location:**
- No test files are detected under the repository root. Searches found no `*.test.*`, `*.spec.*`, `__tests__/`, `tests/`, or `playwright` test directories.
- Source files are organized by runtime concern under `src/`, so future tests should be co-located with the code they cover or placed in matching feature folders: components in `src/components/...`, hooks in `src/hooks/`, services in `src/services/`, and utilities in `src/utils/`.

**Naming:**
- No established naming pattern exists because no tests are committed.
- Recommended naming should mirror the implementation path until a runner is configured: `src/utils/date.test.ts` for `src/utils/date.ts`, `src/hooks/useTasks.test.ts` for `src/hooks/useTasks.ts`, and `src/components/tasks/TaskCard.test.tsx` for `src/components/tasks/TaskCard.tsx`.

**Structure:**
```text
Current state:
src/
  components/
  hooks/
  services/
  utils/
  pages/

No committed test directories or test files detected.
```

## Test Structure

**Suite Organization:**
```typescript
// No suite pattern exists in the codebase yet.
// A future unit test should name the unit by exported API path:
// describe('formatDate', () => { ... }) for src/utils/date.ts
// describe('tasksService', () => { ... }) for src/services/tasksService.ts
// describe('TaskCard', () => { ... }) for src/components/tasks/TaskCard.tsx
```

**Patterns:**
- Setup pattern: Not detected. No `beforeEach`, `afterEach`, fixtures, or render helpers are committed.
- Teardown pattern: Not detected. In-memory service modules `src/services/tasksService.ts` and `src/services/projectsService.ts` keep module-level arrays, so future tests need reset isolation before each test.
- Assertion pattern: Not detected. No assertion library is in use.
- Async pattern: Runtime async code exists in `src/hooks/useTasks.ts`, `src/hooks/useProjects.ts`, `src/services/tasksService.ts`, and `src/services/projectsService.ts`, but no async tests are committed.

## Mocking

**Framework:** Not detected

**Patterns:**
```typescript
// No mocking framework or mock factory pattern is committed.
// Runtime mock data currently lives in application modules:
// - src/data/mockTasks.ts
// - src/data/mockProjects.ts
// - src/data/mockUser.ts
```

**What to Mock:**
- For future component tests, mock service boundaries from `src/services/tasksService.ts` and `src/services/projectsService.ts` when testing pages or hooks that call them.
- For future hook tests, isolate module-level service state in `src/services/tasksService.ts` and `src/services/projectsService.ts`; both services mutate arrays initialized from `src/data/mockTasks.ts` and `src/data/mockProjects.ts`.
- For future context tests, wrap consumers with `ThemeProvider` from `src/contexts/ThemeContext.tsx` because `useTheme` throws outside the provider.
- For future date-sensitive tests, control `Date` when testing `src/utils/date.ts`, `src/hooks/useDashboardStats.ts`, `src/data/mockTasks.ts`, and calendar behavior in `src/components/calendar/CalendarMonth.tsx`.

**What NOT to Mock:**
- Do not mock pure utilities in `src/utils/date.ts`; test their outputs directly.
- Do not mock small presentational components such as `src/components/common/Button.tsx`, `src/components/common/Input.tsx`, `src/components/common/Card.tsx`, and `src/components/common/Badge.tsx` when testing their own props and rendered states.
- Do not mock domain types from `src/types/task.ts`, `src/types/project.ts`, and `src/types/user.ts`; import the types directly.

## Fixtures and Factories

**Test Data:**
```typescript
// Existing runtime fixture shape from src/data/mockTasks.ts:
export const mockTasks: Task[] = [
  {
    id: '1',
    title: '...',
    status: 'pending',
    priority: 'high',
    projectId: 'proj-1',
    dueDate: today.toISOString().split('T')[0],
    createdAt: new Date(today.getTime() - 86400000).toISOString(),
  },
];
```

**Location:**
- Runtime fixture data is stored in `src/data/mockTasks.ts`, `src/data/mockProjects.ts`, and `src/data/mockUser.ts`.
- Domain shapes for fixtures live in `src/types/task.ts`, `src/types/project.ts`, and `src/types/user.ts`.
- No test-only fixtures or factories are detected.

## Coverage

**Requirements:** None enforced. No coverage tool, threshold, output directory, or coverage script is configured in `package.json`.

**View Coverage:**
```bash
# Not detected: no coverage command exists.
```

## Test Types

**Unit Tests:**
- Not present. Strong candidates for first unit coverage are pure helpers in `src/utils/date.ts`, derived stats in `src/hooks/useDashboardStats.ts`, service methods in `src/services/tasksService.ts`, and `src/services/projectsService.ts`.

**Integration Tests:**
- Not present. Candidate integration surfaces are hook-service flows in `src/hooks/useTasks.ts` and `src/hooks/useProjects.ts`, plus page composition in `src/pages/TasksPage.tsx`, `src/pages/ProjectsPage.tsx`, and `src/pages/DashboardPage.tsx`.

**E2E Tests:**
- Not present. `@playwright/test` exists in `package.json`, but no Playwright config or specs exist. Candidate E2E flows are routing through `src/routes/AppRoutes.tsx`, task creation through `src/components/tasks/CreateTaskModal.tsx`, project creation through `src/components/projects/CreateProjectModal.tsx`, and theme toggling through `src/contexts/ThemeContext.tsx`.

## Common Patterns

**Async Testing:**
```typescript
// Runtime async pattern to cover when tests are added:
const newTask = await tasksService.createTask(task);
setTasks(prev => [...prev, newTask]);
```
- The async service and hook pattern appears in `src/hooks/useTasks.ts`, `src/hooks/useProjects.ts`, `src/services/tasksService.ts`, and `src/services/projectsService.ts`.
- Future async tests should assert both returned values and mutated state because services mutate module-level arrays.

**Error Testing:**
```typescript
// Runtime error-state pattern to cover when tests are added:
try {
  const updated = await tasksService.updateTask(id, updates);
  return updated;
} catch (err) {
  setError(err as Error);
  throw err;
}
```
- Error state and rethrow behavior exists in `src/hooks/useTasks.ts` and `src/hooks/useProjects.ts`.
- Provider misuse should be tested by calling `useTheme` outside `ThemeProvider` from `src/contexts/ThemeContext.tsx` and expecting the configured error.
- Form validation currently uses browser dialogs in `src/components/tasks/CreateTaskModal.tsx`, `src/components/tasks/EditTaskModal.tsx`, and `src/components/projects/CreateProjectModal.tsx`; future tests need to account for `alert(...)` and `window.confirm(...)` usages in these files and `src/pages/ProjectsPage.tsx`.

---

*Testing analysis: 2026-06-12*
