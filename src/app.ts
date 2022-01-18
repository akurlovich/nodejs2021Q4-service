import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
// import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import * as path from 'path';
import YAML from 'yamljs';
import {
  morganHandler,
  Logger,
  forbiddenerr,
  notfounderr,
} from './middlewares';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/tasks.router';

import { TryDBConnect } from './common/dbConnection';
import { handleError } from './utils/index';

const app: Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
// app.use(cors);

app.use(async (_req: Request, res: Response, next) => {
  await TryDBConnect(() => {
    res.json({
      error: 'Database connection error, please try again later',
    });
  }, next);
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(morganHandler);

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

//  Promise.reject(Error('Oops'));
// throw new Error('Ooops');

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

process.on('unhandledRejection', (reason, promise) => {
  Logger.error(`unhandledRejection, reason: ${reason} ${promise}`);
});

process.on('uncaughtExceptionMonitor', (err: Error, origin: string) => {
  Logger.error(`uncaughtException, reason: ${err} ${origin}`);
});

app.use(forbiddenerr);
app.use(notfounderr);
app.use(handleError);

export default app;
