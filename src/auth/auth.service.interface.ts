import { User } from '../user';
import { AuthCredentials } from './types';

export interface AuthServiceInterface {
  login(validate: AuthCredentials): Promise<{ token: string; user: User }>;
  register(
    user: User,
    validate: AuthCredentials,
  ): Promise<{ token: string; user: User }>;
  fromToken(token: string): Promise<User>;
}

export const AuthServiceInterface = Symbol('AuthServiceInterface');
