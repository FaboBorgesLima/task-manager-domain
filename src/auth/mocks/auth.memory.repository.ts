import { User } from '../../user';
import { Auth } from '../auth';
import { AuthRepositoryInterface } from '../auth.repository.interface';
import { AuthCredentials } from '../types';

export class AuthMemoryRepository implements AuthRepositoryInterface {
  private auths: Auth[] = [];
  fromToken(token: string): Promise<Auth> {
    const auth = this.auths.find((auth) => auth.token === token);

    if (!auth) {
      throw new Error('Invalid token');
    }

    return Promise.resolve(auth);
  }

  fromUser(user: User): Promise<Auth> {
    const auth = this.auths.find((auth) => auth.user.id === user.id);

    if (!auth) {
      throw new Error('User not authenticated');
    }

    return Promise.resolve(auth);
  }

  login(credentials: AuthCredentials): Promise<Auth> {
    const auth = this.auths.find(
      (auth) => auth.user.email === credentials.email,
    );

    if (!auth) {
      throw new Error('Invalid credentials');
    }
    return Promise.resolve(auth);
  }

  register(user: User): Promise<Auth> {
    const existingAuth = this.auths.find(
      (auth) => auth.user.email === user.email,
    );

    if (existingAuth) {
      throw new Error('User already registered');
    }

    const newAuth: Auth = {
      user,
      token: `token-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}`,
    };

    this.auths.push(newAuth);
    return Promise.resolve(newAuth);
  }
}
