// import { Request } from 'express';
import morgan, { StreamOptions } from 'morgan';


// morgan.token('reqstatus', (req: Request) => return req.statusCode);


const stream: StreamOptions = {
  write: (message) => console.log(message),
};

const morganHandler = morgan(
  'reqstatus :status',

  { stream }
);

export { morganHandler };
