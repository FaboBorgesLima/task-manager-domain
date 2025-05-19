import { User } from '../user';
import { AuthCredentials } from './types';

export interface AuthValidateInterface {
  login(validate: AuthCredentials): Promise<{ token: string; user: User }>;
  register(
    user: User,
    validate: AuthCredentials,
  ): Promise<{ token: string; user: User }>;
}

export const AuthValidateInterface = Symbol('AuthValidateInterface');
