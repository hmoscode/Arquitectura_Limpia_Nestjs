import { BusinessError } from 'src/core/domain/errors/business.error';

export class InvalidCredentialsError extends BusinessError {
  constructor(message = 'Invalid credentials') {
    super('INVALID_CREDENTIALS', message);
  }
}
