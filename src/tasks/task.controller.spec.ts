import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma.service';
import { Task } from '@prisma/client';

describe('TaskController', () => {
  let taskController: TaskController;

  let task1: Task;
  let task2: Task;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, PrismaService],
    }).compile();

    taskController = app.get<TaskController>(TaskController);

    task1 = await taskController.create({
      title: 'take the trash out',
      description: 'take the trash out',
    });

    task2 = await taskController.create({
      title: 'make lunch',
      description: 'make lunch for the kids',
    });
  });

  afterEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, PrismaService],
    }).compile();

    const prismaService = app.get<PrismaService>(PrismaService);

    await prismaService.task.deleteMany();
  });

  describe('/tasks', () => {
    it('should create an task with the given data', async () => {
      const taskPayload = {
        title: 'Do the homework',
        description: 'make the homework from today class',
      };

      expect(await taskController.create(taskPayload)).toHaveProperty('id');
    });

    it('should return the list with the tasks created', async () => {
      const tasksRetrieved = await taskController.findAll();

      expect(tasksRetrieved).toHaveLength(2);
      expect(tasksRetrieved[0]).toEqual(task1);
      expect(tasksRetrieved[1]).toEqual(task2);
    });

    it('should return a specific task based on the id', async () => {
      expect(await taskController.findById(task2.id)).toEqual(task2);
    });

    it('should update the task with the given data and id', async () => {
      const dataToUpdate = {
        completed: true,
      };

      const taskUpdated = await taskController.update(task1.id, dataToUpdate);

      expect(taskUpdated.completed).toBe(true);
    });

    it('should delete a task based on the id', async () => {
      await taskController.delete(task2.id);

      await expect(taskController.findById(task2.id)).rejects.toBeInstanceOf(
        Error,
      );
    });
  });
});
