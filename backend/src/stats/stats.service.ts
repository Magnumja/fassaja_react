import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { serializeTask } from '../tasks/tasks.serializer';

export interface DashboardStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  pending: number;
  completionRate: number;
  thisWeekCompleted: number;
  lastWeekCompleted: number;
  weekComparisonPercent: number;
}

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats(): Promise<DashboardStats> {
    const rows = await this.prisma.task.findMany();
    // Reuse the read-time "overdue" rule so stats match the task list.
    const tasks = rows.map(serializeTask);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(thisWeekStart.getDate() - 7);

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
    const overdue = tasks.filter((t) => t.status === 'overdue').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;

    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    const thisWeekCompleted = tasks.filter((t) => {
      if (t.status !== 'completed' || !t.completedAt) return false;
      const d = new Date(t.completedAt);
      return d >= thisWeekStart && d <= now;
    }).length;

    const lastWeekCompleted = tasks.filter((t) => {
      if (t.status !== 'completed' || !t.completedAt) return false;
      const d = new Date(t.completedAt);
      return d >= lastWeekStart && d < thisWeekStart;
    }).length;

    const weekComparisonPercent =
      lastWeekCompleted > 0
        ? Math.round(
            ((thisWeekCompleted - lastWeekCompleted) / lastWeekCompleted) * 100,
          )
        : thisWeekCompleted > 0
          ? 100
          : 0;

    return {
      total,
      completed,
      inProgress,
      overdue,
      pending,
      completionRate,
      thisWeekCompleted,
      lastWeekCompleted,
      weekComparisonPercent,
    };
  }
}
