import { Request } from 'express';
import morgan, { StreamOptions } from 'morgan';
import Logger from './log';

morgan.token('body', (req: Request) =>
  JSON.stringify(req.body).replace(/,("password":").+"/, '$1***"')
);
morgan.token('query', (req: Request) => JSON.stringify(req.params));

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};


const morganHandler = morgan(
  ':method :status :url Query params :query Body :body size :res[content-length] - :response-time ms',

  { stream }
);

export { morganHandler };
