# External Integrations

**Analysis Date:** 2026-06-12

## APIs & External Services

**External APIs:**
- Not detected.
  - SDK/Client: Not applicable.
  - Auth: Not applicable.
  - Evidence: No `fetch`, `axios`, GraphQL client, Supabase, Firebase, Stripe, AWS, or API base URL usage detected in `src/` or `vite.config.ts`.

**Frontend libraries with runtime service-like behavior:**
- React Router - Browser-local SPA navigation only.
  - SDK/Client: `react-router-dom` in `src/App.tsx`, `src/routes/AppRoutes.tsx`, `src/components/layout/Sidebar.tsx`, and `src/pages/NotFoundPage.tsx`.
  - Auth: None.
- Recharts - Browser-local chart rendering only.
  - SDK/Client: `recharts` in `src/pages/ReportsPage.tsx`.
  - Auth: None.
- Framer Motion - Browser-local animation only.
  - SDK/Client: `framer-motion` in `src/components/mascot/Mascot.tsx`, `src/components/dashboard/ProgressCard.tsx`, `src/components/common/Modal.tsx`, and `src/components/tasks/TaskCard.tsx`.
  - Auth: None.

## Data Storage

**Databases:**
- Not detected.
  - Connection: Not applicable.
  - Client: Not applicable.
- Domain data is held in module-level in-memory arrays:
  - Tasks: `src/services/tasksService.ts` seeds `let tasks = [...mockTasks]` from `src/data/mockTasks.ts`.
  - Projects: `src/services/projectsService.ts` seeds `let projects = [...mockProjects]` from `src/data/mockProjects.ts`.
  - User profile: `src/data/mockUser.ts` exports static mock user data consumed by `src/pages/DashboardPage.tsx` and `src/pages/SettingsPage.tsx`.

**Browser Storage:**
- `localStorage` stores only the theme preference.
  - Implementation: `src/contexts/ThemeContext.tsx` reads `localStorage.getItem('theme')` and writes `localStorage.setItem('theme', theme)`.
  - Stored keys: `theme`.
  - Auth/session data: Not detected.

**File Storage:**
- Local static assets only.
  - Images are committed under `public/`, including `public/logofassaja.png`, `public/bobduvida.png`, `public/boberror404.png`, `public/bobforte.png`, `public/bobjoia.png`, `public/bobparabens.png`, and `public/bobtriste.png`.
  - No upload client, cloud storage SDK, or filesystem API usage detected.

**Caching:**
- None.
  - No TanStack Query, SWR, service worker, Cache API, Redis, or HTTP cache layer detected.

## Authentication & Identity

**Auth Provider:**
- Not detected.
  - Implementation: No login route, auth context, token storage, session refresh, or identity SDK detected.
  - User identity is mocked in `src/data/mockUser.ts`.
  - Routes in `src/routes/AppRoutes.tsx` are public client routes with no guard/wrapper.

## Monitoring & Observability

**Error Tracking:**
- None detected.
  - No Sentry, LogRocket, Datadog, OpenTelemetry, or similar package detected in `package.json`.

**Logs:**
- No structured logging framework detected.
- No application logging calls detected in `src/`.
- User-facing errors are kept in React hook state:
  - `src/hooks/useTasks.ts` stores caught errors in `error` state and rethrows mutating operation errors.
  - `src/hooks/useProjects.ts` stores caught errors in `error` state and rethrows mutating operation errors.

## CI/CD & Deployment

**Hosting:**
- Not detected.
  - No Vercel, Netlify, Docker, GitHub Pages, or cloud hosting configuration files detected.
  - Production artifact is Vite's default static `dist/` from `npm run build` in `package.json`.

**CI Pipeline:**
- None detected.
  - No `.github/workflows/` directory or other CI config detected in the scanned file list.
  - `src/data/mockTasks.ts` contains mock task text mentioning "Configurar CI/CD pipeline"; this is seed data, not a repository CI integration.

## Environment Configuration

**Required env vars:**
- None detected.
  - No `.env*` files present in the repository root.
  - No env variable reads detected in `src/` or `vite.config.ts`.

**Secrets location:**
- Not applicable.
  - No secret files detected.
  - `.gitignore` excludes `*.local`, which is compatible with local-only config files if env vars are introduced later.

## Webhooks & Callbacks

**Incoming:**
- None.
  - This repository has no server routes, API handlers, or webhook endpoints.

**Outgoing:**
- None.
  - No outbound HTTP calls or webhook clients detected in `src/`.

---

*Integration audit: 2026-06-12*
