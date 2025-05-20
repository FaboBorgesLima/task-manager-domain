import { User } from '../user';

export interface RegisterValidationInterface {
  sendValidation(user: User): Promise<string>;
  checkValidation(validation: string): Promise<boolean>;
}

export const RegisterValidationInterface = Symbol(
  'RegisterValidationInterface',
);
