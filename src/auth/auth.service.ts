import { DomainError } from '../error';
import { User } from '../user';
import { Auth } from './auth';
import { AuthRepositoryInterface } from './auth.repository.interface';
import { RegisterValidationInterface } from './register.validation.interface';
import { AuthCredentials } from './types';

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepositoryInterface,
    private readonly registerValidation: RegisterValidationInterface,
  ) {}

  login(credentials: AuthCredentials): Promise<Auth> {
    return this.authRepository.login(credentials);
  }

  async register(
    user: User,
    credentials: AuthCredentials,
    validation: string,
  ): Promise<Auth> {
    const isValid = await this.registerValidation.checkValidation(validation);

    if (!isValid) {
      throw new DomainError('Validation failed');
    }

    return this.authRepository.register(user, credentials);
  }

  async sendValidation(user: User): Promise<boolean> {
    await this.registerValidation.sendValidation(user);

    return true;
  }
}
