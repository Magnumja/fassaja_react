# Technology Stack

**Analysis Date:** 2026-06-12

## Languages

**Primary:**
- TypeScript - Application source in `src/**/*.ts` and `src/**/*.tsx`, compiled through `tsc` using `tsconfig.json`.
- TSX/React JSX - UI components and pages in `src/components/**/*.tsx`, `src/pages/**/*.tsx`, `src/App.tsx`, and `src/main.tsx`.

**Secondary:**
- JavaScript ESM - Tool configuration in `tailwind.config.js` and `postcss.config.js`.
- HTML - Vite host document in `index.html`.
- CSS/Tailwind directives - Global styles in `src/index.css`.

## Runtime

**Environment:**
- Browser runtime - `index.html` mounts `src/main.tsx` into `#root`, and `src/App.tsx` uses `BrowserRouter`.
- Node.js v22.20.0 - Observed local runtime for development commands.
- Node version is not pinned - no `.nvmrc`, `.node-version`, or `engines` field detected in `package.json`.

**Package Manager:**
- npm 10.9.3 - Observed local package manager.
- Lockfile: present, npm lockfile v3 in `package-lock.json`.

## Frameworks

**Core:**
- React 18.2.0 - Component framework used throughout `src/components/`, `src/pages/`, `src/App.tsx`, and `src/main.tsx`.
- React DOM 18.2.0 - Browser rendering via `ReactDOM.createRoot` in `src/main.tsx`.
- React Router DOM 6.20.0 - Client-side routing via `BrowserRouter` in `src/App.tsx` and route declarations in `src/routes/AppRoutes.tsx`.
- Vite 5.0.8 - Dev server and production bundler configured in `vite.config.ts`.
- TypeScript 5.2.2 - Type checking configured in `tsconfig.json` and `tsconfig.node.json`.
- Tailwind CSS 3.3.6 - Utility styling configured in `tailwind.config.js` and loaded from `src/index.css`.

**Testing:**
- Playwright 1.60.0 - Listed in `package.json` devDependencies as `@playwright/test`.
- Test configuration: Not detected. No `playwright.config.*`, `vitest.config.*`, `jest.config.*`, `*.test.*`, or `*.spec.*` files detected in the scanned repo.

**Build/Dev:**
- `@vitejs/plugin-react` 4.2.1 - React plugin registered in `vite.config.ts`.
- PostCSS 8.4.32 - CSS processing configured in `postcss.config.js`.
- Autoprefixer 10.4.16 - PostCSS browser prefixing configured in `postcss.config.js`.
- TypeScript compiler - `npm run build` runs `tsc && vite build` from `package.json`.

## Key Dependencies

**Critical:**
- `react` 18.2.0 - Base UI runtime for all React components in `src/`.
- `react-dom` 18.2.0 - DOM renderer used by `src/main.tsx`.
- `react-router-dom` 6.20.0 - SPA navigation used by `src/App.tsx`, `src/routes/AppRoutes.tsx`, `src/components/layout/Sidebar.tsx`, and `src/pages/NotFoundPage.tsx`.
- `framer-motion` 10.16.16 - Animation primitives used in `src/components/mascot/Mascot.tsx`, `src/components/dashboard/ProgressCard.tsx`, `src/components/common/Modal.tsx`, and `src/components/tasks/TaskCard.tsx`.
- `lucide-react` 0.310.0 - Icon set used across pages and layout components such as `src/pages/DashboardPage.tsx`, `src/pages/SettingsPage.tsx`, `src/components/layout/Sidebar.tsx`, and `src/components/layout/Topbar.tsx`.
- `recharts` 2.10.3 - Report charting used in `src/pages/ReportsPage.tsx`.

**Infrastructure:**
- `vite` 5.0.8 - Local dev server, module bundling, and preview command from `package.json`.
- `typescript` 5.2.2 - Static type checking and strict compiler settings in `tsconfig.json`.
- `tailwindcss` 3.3.6 - Theme tokens, dark mode, and utility classes configured in `tailwind.config.js`.
- `postcss` 8.4.32 and `autoprefixer` 10.4.16 - CSS processing configured in `postcss.config.js`.
- `@types/react` 18.2.37 and `@types/react-dom` 18.2.15 - Type declarations for React source files in `src/`.
- `@playwright/test` 1.60.0 - Test runner dependency present in `package.json`, with no local test config detected.

## Configuration

**Environment:**
- No `.env*` files detected in the repository root.
- `.gitignore` excludes `*.local`, so local environment overrides may exist outside git.
- No `import.meta.env`, `process.env`, or client API base URL usage detected in `src/` or `vite.config.ts`.
- Vite dev server port is fixed to `5173` with `open: false` in `vite.config.ts`.

**Build:**
- `package.json` scripts:
  - `npm run dev` runs `vite`.
  - `npm run build` runs `tsc && vite build`.
  - `npm run preview` runs `vite preview`.
  - `npm run lint` runs `eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0`.
- `vite.config.ts` configures React support and the `@/*` alias to `src/*`.
- `tsconfig.json` targets `ES2020`, uses `moduleResolution: "bundler"`, enables strict checks, and maps `@/*` to `src/*`.
- `tsconfig.node.json` type-checks `vite.config.ts`.
- `tailwind.config.js` scans `index.html` and `src/**/*.{js,ts,jsx,tsx}`, enables class-based dark mode, and defines project color/radius/shadow tokens.
- `postcss.config.js` registers `tailwindcss` and `autoprefixer`.
- ESLint config and local `eslint` dependency are not detected, despite the `lint` script in `package.json`.

## Platform Requirements

**Development:**
- Use npm with `package-lock.json`; install dependencies with `npm install`.
- Run the app with `npm run dev`; Vite serves the app on port `5173` from `vite.config.ts`.
- Node must support Vite 5 and ESM config files; no project-pinned Node version is present.

**Production:**
- Deployment target is a static web app generated by `npm run build` into Vite's default `dist/` output.
- Hosting platform is not configured in the repository. No Netlify, Vercel, Docker, CI, or server deployment files were detected.
- Runtime data is local to the browser session/module instance through in-memory services in `src/services/tasksService.ts` and `src/services/projectsService.ts`; production backend integration is not present.

---

*Stack analysis: 2026-06-12*
