import winston from 'winston';
import path from 'path';

const LOGS_DIR = path.join(__dirname, '../logs');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env['NODE_ENV'] || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((error) => `${error['timestamp']}: ${error.message}`)
);

const transports = [
  new winston.transports.Console({handleExceptions: true}),
  new winston.transports.File({
    filename: `${LOGS_DIR}/error.log`,
    level: 'error',
    handleExceptions: true,
    format: winston.format.json(),
  }),
  new winston.transports.File({
    filename: `${LOGS_DIR}/all.log`,
    format: winston.format.json(),
  }),
  new winston.transports.File({
    filename: `${LOGS_DIR}/http.log`,
    format: winston.format.json(),
    level: 'http',
  }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  exitOnError: false,
});

export default Logger;
