import { User } from '../user/user';
import { AuthCredentials } from './types/auth-credentials';

export interface AuthHttpAdapter {
  login(props: AuthCredentials): Promise<{ user: User; token: string }>;
  me(authorization: string): Promise<User>;
}
