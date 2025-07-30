import { BusinessError } from 'src/core/domain/errors/business.error';

export class UserNotFoundError extends BusinessError {
  constructor(message = 'User not found') {
    super('USER_NOT_FOUND', message);
  }
}

export class UserAlreadyExistsError extends BusinessError {
  constructor(message = 'User already exists') {
    super('USER_ALREADY_EXISTS', message);
  }
}
export class IncorrectPasswordError extends BusinessError {
  constructor(message = 'Incorrect password') {
    super('INCORRECT_PASSWORD', message);
  }
}
