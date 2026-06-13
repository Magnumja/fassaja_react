import { Injectable, NotFoundException } from '@nestjs/common';
import { Project as PrismaProject } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

export interface ProjectResponse {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt: string;
}

function serializeProject(project: PrismaProject): ProjectResponse {
  return {
    id: project.id,
    name: project.name,
    color: project.color,
    description: project.description ?? undefined,
    createdAt: project.createdAt.toISOString(),
  };
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProjectResponse[]> {
    const projects = await this.prisma.project.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return projects.map(serializeProject);
  }

  async findOne(id: string): Promise<ProjectResponse> {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Projeto ${id} não encontrado.`);
    }
    return serializeProject(project);
  }

  async create(dto: CreateProjectDto): Promise<ProjectResponse> {
    const project = await this.prisma.project.create({ data: dto });
    return serializeProject(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<ProjectResponse> {
    await this.ensureExists(id);
    const project = await this.prisma.project.update({
      where: { id },
      data: dto,
    });
    return serializeProject(project);
  }

  async remove(id: string): Promise<void> {
    await this.ensureExists(id);
    await this.prisma.project.delete({ where: { id } });
  }

  private async ensureExists(id: string): Promise<void> {
    const count = await this.prisma.project.count({ where: { id } });
    if (count === 0) {
      throw new NotFoundException(`Projeto ${id} não encontrado.`);
    }
  }
}
