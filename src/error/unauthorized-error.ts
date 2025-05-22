import { DomainError } from './domain-error';

export class UnauthorizedError extends DomainError {
  constructor(
    public readonly action: string,
    public readonly resource: string,
    public readonly details?: string,
  ) {
    super(
      `Unauthorized to ${action} ${resource}${details ? ': ' + details : ''}`,
    );
  }
}
