import { Task } from '../task';
import { TaskRepositoryInterface } from '../task.repository.interface';

export class TaskMemoryRepository implements TaskRepositoryInterface {
  private tasks: Task[] = [];

  save(task: Task): Promise<Task> {
    const existingIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (existingIndex !== -1) {
      this.tasks[existingIndex] = task;
    } else {
      this.tasks.push(task);
    }
    task.id =
      task.id ||
      `task-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    return Promise.resolve(task);
  }

  findById(id: string): Promise<Task | void> {
    return Promise.resolve(this.tasks.find((task) => task.id === id));
  }

  findByUser(userId: string, size: number, page: number): Promise<Task[]> {
    const userTasks = this.tasks.filter((task) => task.userId === userId);
    const start = page * size;
    const end = start + size;
    return Promise.resolve(userTasks.slice(start, end));
  }

  findByUserAndDate(
    userId: string,
    startDate: Date,
    endDate: Date,
    size: number,
    page: number,
  ): Promise<Task[]> {
    const userTasks = this.tasks.filter(
      (task) =>
        task.userId === userId ||
        (task.start >= startDate && task.start <= endDate) ||
        (task.end >= startDate && task.end <= endDate) ||
        (task.start <= startDate && task.end >= endDate),
    );
    const start = (page - 1) * size;
    const end = start + size;
    return Promise.resolve(userTasks.slice(start, end));
  }

  delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return Promise.resolve();
  }
}
