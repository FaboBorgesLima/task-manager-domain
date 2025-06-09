import { Task } from './task';

export interface TaskRepositoryInterface {
  save(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | void>;
  findByUser(userId: string, size: number, page: number): Promise<Task[]>;
  findByUserAndDate(
    userId: string,
    startDate: Date,
    endDate: Date,
    size: number,
    page: number,
  ): Promise<Task[]>;
  delete(id: string): Promise<void>;
}

export const TaskRepositoryInterface = Symbol('TaskRepositoryInterface');
