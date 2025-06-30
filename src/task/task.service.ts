import { UnauthorizedError } from '../error/unauthorized-error';
import { User } from '../user';
import { Task } from './task';
import { TaskRepositoryInterface } from './task.repository.interface';

export class TaskService {
  constructor(
    public readonly taskRepository: TaskRepositoryInterface, // Replace with actual repository type
  ) {}

  public async save(user: User, task: Task): Promise<Task> {
    if (!task.canBeUpdated(user)) {
      throw new UnauthorizedError(
        'update',
        'task',
        `user ${user.id} cannot update task ${task.id}`,
      );
    }

    const savedTask = await this.taskRepository.save(task);

    return savedTask;
  }

  public async delete(user: User, task: Task): Promise<void> {
    if (!task.canBeDeleted(user)) {
      throw new UnauthorizedError(
        'delete',
        'task',
        `user ${user.id} cannot delete task ${task.id}`,
      );
    }

    await this.taskRepository.delete(task.id as string);
  }

  public async findByUser(
    user: User,
    viewer: User,
    size: number,
    page: number,
  ): Promise<Task[]> {
    if (!viewer.canViewTasks(user)) {
      throw new UnauthorizedError(
        'view',
        'task',
        `user ${viewer.id} cannot view tasks of user ${user.id}`,
      );
    }

    return this.taskRepository.findByUser(user.id as string, size, page);
  }

  public async findByUserAndDate(
    user: User,
    viewer: User,
    start: Date,
    end: Date,
    size: number,
    page: number,
  ): Promise<Task[]> {
    if (!viewer.canViewTasks(user)) {
      throw new UnauthorizedError(
        'view',
        'task',
        `user ${viewer.id} cannot view tasks of user ${user.id}`,
      );
    }

    return this.taskRepository.findByUserAndDate(
      user.id as string,
      start,
      end,
      size,
      page,
    );
  }

  public async findById(viewer: User, id: string): Promise<Task | null> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      return null;
    }

    if (!task.canBeViewed(viewer)) {
      throw new UnauthorizedError(
        'view',
        'task',
        `user ${viewer.id} cannot view task ${task.id}`,
      );
    }

    return task;
  }
}
