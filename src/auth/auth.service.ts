import { User } from '../user';
import { AuthValidateInterface } from './auth.repository.interface';
import { AuthCredentials } from './types';

export class AuthService {
  public constructor(private readonly authRepository: AuthValidateInterface) {}

  public async login(authLoginProps: AuthCredentials) {
    const { token, user } = await this.authRepository.login(authLoginProps);
    return { user, token };
  }

  public async register(user: User, authLoginProps: AuthCredentials) {
    const resgister = await this.authRepository.register(user, authLoginProps);

    return { user: resgister.user, token: resgister.token };
  }
}
