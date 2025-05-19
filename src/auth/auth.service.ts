import { User } from '../user';
import { CreadentialsServiceInterface } from './credentials.service.interface';
import { AuthCredentials } from './types';

export class AuthService {
  public constructor(
    private readonly credentialsService: CreadentialsServiceInterface,
  ) {}

  public async login(authLoginProps: AuthCredentials) {
    const { token, user } = await this.credentialsService.login(authLoginProps);
    return { user, token };
  }

  public async register(user: User, authLoginProps: AuthCredentials) {
    const resgister = await this.credentialsService.register(
      user,
      authLoginProps,
    );

    return { user: resgister.user, token: resgister.token };
  }
}
