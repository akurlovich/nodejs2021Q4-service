import express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from'yamljs';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/board/board.router';
import taskRouter from './resources/task/task.router';

const app = express();
const __dirname = path.resolve(path.dirname(''));
const swaggerDocument = YAML.load(path.join(__dirname, './doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

export default app;
