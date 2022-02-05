/* eslint-disable*/
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { join } from 'path';
import * as fs from 'fs';

const log_file = fs.createWriteStream(join(__dirname, 'debug.log'), {
  flags: 'a+',
});

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const body = JSON.stringify(req.body);
    const time = Date.now();
    log_file.write(
      `method:${method} url:${url} body:${body} ${time}` + '\n'
    );
    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `method:${method} url:${url} body:${body} ${time}`,
          context.getClass().name
        );
        log_file.write(
          `method:${method} url:${url} body:${body} ${time}` + '\n'
        );
      })
    );
  }
}
