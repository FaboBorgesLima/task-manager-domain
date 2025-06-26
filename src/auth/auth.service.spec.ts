import { AuthService } from './auth.service';
import { AuthMemoryRepository } from './mocks/auth.memory.repository';
import { AuthRepositoryInterface } from './auth.repository.interface';
import { EmailValidationServiceInterface } from './email-validation.service.interface';
import { MockEmailValidationService } from './mocks/mock-email-alidation.service';

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: AuthRepositoryInterface;
  let emailValidationService: EmailValidationServiceInterface;

  beforeEach(() => {
    authRepository = new AuthMemoryRepository();
    emailValidationService = new MockEmailValidationService();
    authService = new AuthService(authRepository, emailValidationService);
  });

  // Add your tests here
  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
