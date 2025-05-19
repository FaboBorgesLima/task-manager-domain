import { User } from '../user';
import { AuthCredentials } from './types';

export interface CreadentialsServiceInterface {
  login(validate: AuthCredentials): Promise<{ token: string; user: User }>;
  register(
    user: User,
    validate: AuthCredentials,
  ): Promise<{ token: string; user: User }>;
}

export const CreadentialsServiceInterface = Symbol(
  'CreadentialsServiceInterface',
);
