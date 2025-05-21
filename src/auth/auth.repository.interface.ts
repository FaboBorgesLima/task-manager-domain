import { User } from '../user';
import { Auth } from './auth';
import { AuthCredentials } from './types';

export interface AuthRepositoryInterface {
  fromToken(token: string): Promise<Auth>;
  fromUser(user: User): Promise<Auth>;
  login(credentials: AuthCredentials): Promise<Auth>;
  register(user: User, credentials: AuthCredentials): Promise<Auth>;
}
export const AuthRepositoryInterface = Symbol('AuthRepositoryInterface');
