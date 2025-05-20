import { UserUpdateProps } from './types/user-update-props';
import { User } from './user';

export interface UserHttpAdapter {
  findOne(id: string, authorization: string): Promise<User | null>;
  update(
    userId: string,
    userUpdateProps: UserUpdateProps,
    authorization: string,
  ): Promise<{ user: User; token: string }>;
  delete(id: string, authorization: string): Promise<void>;
}
