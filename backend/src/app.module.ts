import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [PrismaModule, TasksModule, ProjectsModule, StatsModule],
})
export class AppModule {}
