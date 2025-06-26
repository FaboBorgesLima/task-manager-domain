import { TaskRepositoryInterface } from './task.repository.interface';
import { TaskService } from './task.service';
import { TaskMemoryRepository } from './mocks/task-memory.repository';
import { Task } from './task';
import { User } from '../user';
import { faker } from '@faker-js/faker';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: TaskRepositoryInterface;
  const user = User.create({
    name: 'Test User',
    email: faker.internet.email(),
  });
  user.id = 'user-123'; // Mock user ID for testing

  beforeEach(() => {
    taskRepository = new TaskMemoryRepository();
    taskService = new TaskService(taskRepository);
  });

  // Add your tests here
  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should save a task', async () => {
    const task = Task.make({
      title: 'Test Task',
      description: 'This is a test task',
      userId: user.id as string,
      start: new Date(),
      end: new Date(),
    });

    let savedTask = await taskService.save(user, task);

    expect(savedTask).toBeDefined();
    expect(savedTask.id).toBeDefined();
    expect(savedTask.title).toEqual(task.title);
    expect(savedTask.description).toEqual(task.description);
    expect(savedTask.userId).toEqual(task.userId);

    savedTask.title = 'Updated Task';

    savedTask = await taskService.save(user, savedTask);

    expect(savedTask).toBeDefined();
    expect(savedTask.id).toBeDefined();
    expect(savedTask.title).toEqual('Updated Task');
  });

  it('should delete a task', async () => {
    const task = Task.make({
      title: 'Test Task',
      description: 'This is a test task',
      userId: user.id as string,
      start: new Date(),
      end: new Date(),
    });

    const savedTask = await taskService.save(user, task);
    await taskService.delete(user, savedTask);

    const foundTask = await taskService.findById(user, savedTask.id as string);
    expect(foundTask).toBeNull();
  });

  it('cannot delete a task not owned by the user', async () => {
    const anotherUser = User.create({
      name: 'Another User',
      email: faker.internet.email(),
    });
    anotherUser.id = 'another-user-123'; // Mock another user ID for testing
    const task = Task.make({
      title: 'Test Task',
      description: 'This is a test task',
      userId: anotherUser.id as string,
      start: new Date(),
      end: new Date(),
    });
    const savedTask = await taskService.save(anotherUser, task);
    await expect(taskService.delete(user, savedTask)).rejects.toThrow(
      'user user-123 cannot delete task',
    );
  });

  it('should find a task by ID', async () => {
    const task = Task.make({
      title: 'Test Task',
      description: 'This is a test task',
      userId: user.id as string,
      end: new Date(),
      start: new Date(),
    });

    const savedTask = await taskService.save(user, task);

    expect(savedTask).toBeDefined();
    expect(savedTask.id).toBeDefined();
    expect(savedTask.title).toEqual(task.title);
    expect(savedTask.description).toEqual(task.description);
    expect(savedTask.userId).toEqual(task.userId);
  });

  it('should find tasks by user', async () => {
    const task1 = Task.make({
      title: 'Task 1',
      description: 'Description 1',
      userId: user.id as string,
      start: new Date(),
      end: new Date(),
    });

    const task2 = Task.make({
      title: 'Task 2',
      description: 'Description 2',
      userId: user.id as string,
      start: new Date(),
      end: new Date(),
    });

    await taskService.save(user, task1);
    await taskService.save(user, task2);

    const tasks = await taskService.findByUser(user, 10, 0);

    expect(tasks).toBeDefined();
    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toEqual(task1.title);
    expect(tasks[1].title).toEqual(task2.title);
  });
  describe('findById', () => {
    it('should find a task by ID', async () => {
      const task = Task.make({
        title: 'Test Task',
        description: 'This is a test task',
        userId: user.id as string,
        start: new Date(),
        end: new Date(),
      });

      const savedTask = await taskService.save(user, task);
      const foundTask = await taskService.findById(
        user,
        savedTask.id as string,
      );

      expect(foundTask).toBeDefined();
      expect(foundTask?.id).toEqual(savedTask.id);
      expect(foundTask?.title).toEqual(savedTask.title);
    });

    it('should return null if task not found', async () => {
      const foundTask = await taskService.findById(user, 'non-existing-id');
      expect(foundTask).toBeNull();
    });
  });
});
