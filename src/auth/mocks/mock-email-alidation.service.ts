import { EmailValidationServiceInterface } from '../email-validation.service.interface';

export class MockEmailValidationService
  implements EmailValidationServiceInterface
{
  sendValidation(email: string): Promise<void> {
    return new Promise((resolve) => {
      console.log(`Mock validation email sent to ${email}`);
      resolve();
    });
  }
  checkValidation(email: string, validation: string): Promise<boolean> {
    return new Promise((resolve) => {
      console.log(
        `Mock email validation check for ${email} with token ${validation}`,
      );
      resolve(true);
    });
  }
}
