import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { serializeTask, TaskResponse } from './tasks.serializer';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TaskResponse[]> {
    const tasks = await this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return tasks.map(serializeTask);
  }

  async findOne(id: string): Promise<TaskResponse> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarefa ${id} não encontrada.`);
    }
    return serializeTask(task);
  }

  async create(dto: CreateTaskDto): Promise<TaskResponse> {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        status: dto.status ?? 'pending',
        projectId: dto.projectId,
        dueDate: dto.dueDate,
        completedAt: dto.status === 'completed' ? new Date() : null,
      },
    });
    return serializeTask(task);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<TaskResponse> {
    await this.ensureExists(id);

    // Keep completedAt in sync with status transitions.
    let completedAt: Date | null | undefined;
    if (dto.status === 'completed') {
      completedAt = new Date();
    } else if (dto.status) {
      completedAt = null;
    }

    const task = await this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        status: dto.status,
        projectId: dto.projectId,
        dueDate: dto.dueDate,
        ...(completedAt !== undefined ? { completedAt } : {}),
      },
    });
    return serializeTask(task);
  }

  async complete(id: string): Promise<TaskResponse> {
    await this.ensureExists(id);
    const task = await this.prisma.task.update({
      where: { id },
      data: { status: 'completed', completedAt: new Date() },
    });
    return serializeTask(task);
  }

  async remove(id: string): Promise<void> {
    await this.ensureExists(id);
    await this.prisma.task.delete({ where: { id } });
  }

  private async ensureExists(id: string): Promise<void> {
    const count = await this.prisma.task.count({ where: { id } });
    if (count === 0) {
      throw new NotFoundException(`Tarefa ${id} não encontrada.`);
    }
  }
}
