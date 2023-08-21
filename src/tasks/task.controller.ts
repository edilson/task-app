import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { Task } from '@prisma/client';
import { UpdateTaskDTO } from './dtos/updateTask.dto';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskService.create(createTaskDTO);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('offset') offset?: number,
  ): Promise<Task[]> {
    return this.taskService.findAll(page, offset);
  }

  @Get()
  findById(@Param() taskId: string): Promise<Task> {
    return this.taskService.findById(taskId);
  }

  @Put('/:taskId')
  async update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Promise<Task> {
    return await this.taskService.update(taskId, updateTaskDTO);
  }

  @Delete('/:taskId')
  delete(@Param('taskId') taskId: string): Promise<void> {
    return this.taskService.delete(taskId);
  }
}
