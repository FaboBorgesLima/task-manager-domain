export interface EmailValidationServiceInterface {
  sendValidation(email: string): Promise<void>;
  checkValidation(email: string, validation: string): Promise<boolean>;
}

export const EmailValidationServiceInterface = Symbol(
  'EmailValidationServiceInterface',
);
