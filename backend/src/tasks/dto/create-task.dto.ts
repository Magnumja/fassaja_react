import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export const TASK_STATUSES = [
  'pending',
  'in_progress',
  'completed',
  'overdue',
] as const;
export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export class CreateTaskDto {
  @IsString()
  @MinLength(1, { message: 'O título é obrigatório.' })
  @MaxLength(200)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsEnum(TASK_PRIORITIES, { message: 'Prioridade inválida.' })
  priority!: TaskPriority;

  @IsOptional()
  @IsEnum(TASK_STATUSES, { message: 'Status inválido.' })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;
}
