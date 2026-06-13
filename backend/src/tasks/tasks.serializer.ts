import { Task as PrismaTask } from '@prisma/client';

export interface TaskResponse {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  projectId?: string;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

/**
 * Maps a Prisma Task row to the shape the front-end expects:
 * dates as ISO strings, optionals omitted instead of null, and the
 * "overdue" business rule applied at read time (dueDate in the past and
 * not completed) without persisting it.
 */
export function serializeTask(task: PrismaTask): TaskResponse {
  const today = new Date().toISOString().split('T')[0];

  let status = task.status;
  if (
    status !== 'completed' &&
    task.dueDate &&
    task.dueDate < today
  ) {
    status = 'overdue';
  }

  return {
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    status,
    priority: task.priority,
    projectId: task.projectId ?? undefined,
    dueDate: task.dueDate ?? undefined,
    createdAt: task.createdAt.toISOString(),
    completedAt: task.completedAt?.toISOString(),
  };
}
