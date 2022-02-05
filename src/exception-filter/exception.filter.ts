/* eslint-disable */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errRes = {
      statusCode: status,
      times: new Date().toLocaleString(),
      pathUrl: request.url,
      method: request.method,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errRes),
      'ExceptionFilter'
    );

    response.status(status).json(errRes);
  }
}
