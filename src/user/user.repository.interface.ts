import { User } from './user';

export interface UserRepositoryInterface {
  findOne(id: string): Promise<User | void>;
  saveOne(user: User): Promise<User>;
  deleteOne(id: string): Promise<void>;
}

export const UserRepositoryInterface = Symbol('UserRepositoryInterface');
