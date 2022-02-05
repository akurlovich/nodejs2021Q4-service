import { LoggerService } from '@nestjs/common';
// import fs from 'fs';
import path from 'path';
import winston, { Logger } from 'winston';

const LOGS_DIR = path.join(__dirname, '../logs');
console.log(LOGS_DIR)
export class CustomLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({
          filename: `error.log`,
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'combined.log',
          level: 'http',
        }),
      ],
    });

    console.log = (message, params) => {
      this.logger.debug(message, params);
    };
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warning(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
