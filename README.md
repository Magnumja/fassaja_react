# Fassaja

Plataforma de gerenciamento de tarefas com foco em produtividade diária.
Monorepo com front-end React e back-end NestJS.

## Estrutura

```
fassaja_react/
  frontend/   React + Vite + TypeScript + Tailwind (UI)
  backend/    NestJS + Prisma + SQLite (API REST)
```

## Pré-requisitos

- Node.js 20+ (testado em 22)
- npm

## Back-end (API)

```bash
cd backend
npm install
npx prisma migrate dev      # cria o banco SQLite (backend/prisma/dev.db) e roda o seed
npm run dev                 # sobe a API em http://localhost:3333/api (watch mode)
```

Outros comandos úteis:

```bash
npm run prisma:seed         # repopula o banco com dados de exemplo
npm run db:reset            # apaga e recria o banco do zero (+ seed)
npm run build && npm run start:prod   # build de produção
```

### Endpoints

| Método | Rota                       | Descrição                  |
|--------|----------------------------|----------------------------|
| GET    | `/api/tasks`               | Lista tarefas              |
| GET    | `/api/tasks/:id`           | Detalha uma tarefa         |
| POST   | `/api/tasks`               | Cria tarefa                |
| PATCH  | `/api/tasks/:id`           | Atualiza tarefa            |
| PATCH  | `/api/tasks/:id/complete`  | Conclui tarefa             |
| DELETE | `/api/tasks/:id`           | Remove tarefa              |
| GET    | `/api/projects`            | Lista projetos             |
| POST   | `/api/projects`            | Cria projeto               |
| PATCH  | `/api/projects/:id`        | Atualiza projeto           |
| DELETE | `/api/projects/:id`        | Remove projeto             |
| GET    | `/api/stats/dashboard`     | Estatísticas do dashboard  |

Regra de negócio: tarefas com `dueDate` no passado e não concluídas são
retornadas com status `overdue` (calculado na leitura, não persistido).

## Front-end (UI)

```bash
cd frontend
npm install
npm run dev                 # http://localhost:5173
```

O front lê a URL da API de `VITE_API_URL` (veja `frontend/.env`),
padrão `http://localhost:3333/api`. Suba o back-end antes para ver os dados.

```bash
npm run build               # build de produção (dist/)
```

## Configuração

- `backend/.env` — `DATABASE_URL`, `PORT` (3333), `CORS_ORIGIN` (origem do front).
- `frontend/.env` — `VITE_API_URL`.
