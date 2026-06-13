import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function dateOnly(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 86400000);
}

const projects = [
  { id: 'proj-1', name: 'Trabalho', color: '#2477FF', description: 'Tarefas relacionadas ao trabalho' },
  { id: 'proj-2', name: 'Estudos', color: '#8B5CF6', description: 'Aprendizados e certificações' },
  { id: 'proj-3', name: 'Pessoal', color: '#22C55E', description: 'Tarefas pessoais' },
  { id: 'proj-4', name: 'Saúde', color: '#F43F5E', description: 'Atividades relacionadas à saúde' },
  { id: 'proj-5', name: 'Marketing', color: '#FBBF24', description: 'Campanhas e estratégias' },
];

const tasks = [
  { title: 'Reunião com a equipe de design', description: 'Discutir wireframes do novo dashboard', status: 'pending', priority: 'high', projectId: 'proj-1', dueDate: dateOnly(0), createdAt: daysAgo(1) },
  { title: 'Finalizar protótipo da dashboard', description: 'Completar o design no Figma', status: 'in_progress', priority: 'high', projectId: 'proj-1', dueDate: dateOnly(1), createdAt: daysAgo(2) },
  { title: 'Enviar relatório mensal', status: 'pending', priority: 'medium', projectId: 'proj-2', dueDate: dateOnly(1), createdAt: daysAgo(3) },
  { title: 'Atualizar documentação do projeto', status: 'completed', priority: 'low', projectId: 'proj-1', dueDate: dateOnly(0), createdAt: daysAgo(4), completedAt: new Date() },
  { title: 'Revisar feedback do cliente', status: 'pending', priority: 'high', projectId: 'proj-3', dueDate: dateOnly(-1), createdAt: daysAgo(5) },
  { title: 'Estudar React Query', status: 'completed', priority: 'medium', projectId: 'proj-4', dueDate: dateOnly(0), createdAt: daysAgo(6), completedAt: new Date() },
  { title: 'Planejar sprint da semana', status: 'pending', priority: 'high', projectId: 'proj-1', dueDate: dateOnly(7), createdAt: daysAgo(7) },
  { title: 'Organizar tarefas pessoais', status: 'completed', priority: 'low', dueDate: dateOnly(0), createdAt: daysAgo(1), completedAt: new Date() },
  { title: 'Revisão de código - PR #123', status: 'pending', priority: 'high', projectId: 'proj-1', dueDate: dateOnly(0), createdAt: daysAgo(2) },
  { title: 'Configurar CI/CD pipeline', status: 'pending', priority: 'high', projectId: 'proj-2', dueDate: dateOnly(-1), createdAt: daysAgo(3) },
];

async function main() {
  // Idempotent reseed: clear children first to satisfy FK constraints.
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  for (const task of tasks) {
    await prisma.task.create({ data: task });
  }

  // eslint-disable-next-line no-console
  console.log(`Seed concluído: ${projects.length} projetos, ${tasks.length} tarefas.`);
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
