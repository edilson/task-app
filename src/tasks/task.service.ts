import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { UpdateTaskDTO } from './dtos/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async create(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const taskCreated = await this.prismaService.task.create({
      data: createTaskDTO,
    });

    return taskCreated;
  }

  async findAll(page: number, offset: number): Promise<Task[]> {
    const defaultOffset = offset || 10;
    const defaultPage = page ? page - 1 : 0;

    const tasksCreated = await this.prismaService.task.findMany({
      take: defaultOffset,
      skip: defaultPage,
    });

    return tasksCreated;
  }

  async findById(taskId: string): Promise<Task> {
    const taskFound = await this.prismaService.task.findFirst({
      where: { id: taskId },
    });

    if (!taskFound) {
      throw new Error('Task not found');
    }

    return taskFound;
  }

  async update(taskId: string, updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    const taskUpdated = await this.prismaService.task.update({
      where: { id: taskId },
      data: updateTaskDTO,
    });

    return taskUpdated;
  }

  async delete(taskId: string): Promise<void> {
    await this.prismaService.task.delete({ where: { id: taskId } });
  }
}
