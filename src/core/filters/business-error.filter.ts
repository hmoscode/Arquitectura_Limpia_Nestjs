/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { BusinessError } from '../domain/errors/business.error';

@Catch(BusinessError)
export class BusinessErrorFilter implements ExceptionFilter {
  catch(error: BusinessError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const httpStatusMap = {
      USER_NOT_FOUND: 404,
      USER_ALREADY_EXISTS: 409,
      INCORRECT_PASSWORD: 401,
    };
    const statusCode = httpStatusMap[error.code] || 400;
    response.status(statusCode).json({
      statusCode,
      error: error.code,
      message: error.message,
    });
  }
}
