import { UnauthorizedError } from '../error/unauthorized-error';
import { User } from '../user';
import { Auth } from './auth';
import { AuthRepositoryInterface } from './auth.repository.interface';
import { EmailValidationServiceInterface } from './email-validation.service.interface';
import { AuthCredentials } from './types';

export class AuthService {
  constructor(
    public readonly authRepository: AuthRepositoryInterface,
    public readonly registerValidation: EmailValidationServiceInterface,
  ) {}

  login(credentials: AuthCredentials): Promise<Auth> {
    return this.authRepository.login(credentials);
  }

  async register(
    user: User,
    credentials: AuthCredentials,
    validation: string,
  ): Promise<Auth> {
    const isValid = await this.registerValidation.checkValidation(
      user.email,
      validation,
    );

    if (!isValid) {
      throw new UnauthorizedError(
        'register',
        user.email,
        'Invalid validation code',
      );
    }

    return this.authRepository.register(user, credentials);
  }

  async sendValidation(email: string): Promise<boolean> {
    await this.registerValidation.sendValidation(email);

    return true;
  }

  async fromToken(token: string): Promise<Auth> {
    return await this.authRepository.fromToken(token);
  }
}
