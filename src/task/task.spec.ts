import { faker } from '@faker-js/faker';
import { User } from '../user/user';
import { Task } from './task';
import { TaskStatus } from './task-status.enum';

describe('Task', () => {
  it('should be defined', () => {
    expect(
      new Task({
        title: 'Test Task',
        description: 'This is a test task',
        userId: 'user-123',
        status: TaskStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        start: new Date(),
        end: new Date(),
      }),
    ).toBeDefined();
  });

  it('should create a task with default status', () => {
    const user = User.create({
      name: 'Test User',
      email: faker.internet.email(),
    });
    user.id = 'user-123';
    const task = Task.make({
      title: 'Test Task',
      description: 'This is a test task',
      userId: user.id || '',
      start: new Date(),
      end: new Date(),
    });

    expect(task).toBeDefined();
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('This is a test task');
    expect(task.status).toBe(TaskStatus.PENDING);
    expect(task.start).toBeInstanceOf(Date);
    expect(task.end).toBeInstanceOf(Date);
  });

  it('should throw an error if title is empty', () => {
    const user = User.create({
      name: 'Test User',
      email: faker.internet.email(),
    });
    user.id = 'user-123';

    expect(() => {
      Task.make({
        title: '',
        description: 'This is a test task',
        userId: user.id || '',
        status: TaskStatus.PENDING,
        start: new Date(),
        end: new Date(),
      });
    }).toThrow();
  });

  it('can be transformed to entire day', () => {
    const task = Task.make({
      title: 'Test Task',
      description: 'This is a test task',
      userId: 'user-123',
      status: TaskStatus.PENDING,
      start: new Date('2023-10-01T12:00:00Z'),
      end: new Date('2023-10-02T00:00:00Z'),
    });

    task.setTaskToEntireDay();

    expect(task.start.getHours()).toEqual(0);
    expect(task.end.getHours()).toEqual(23);
    expect(task.start.getDate()).toEqual(task.end.getDate());

    expect(task.isEntireDay).toBe(true);
  });
});
