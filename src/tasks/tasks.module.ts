import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [TasksModule],
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
})
export class TasksModule {}
