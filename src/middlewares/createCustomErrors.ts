import morgan, { StreamOptions } from 'morgan';

const stream: StreamOptions = {
  write: (message) => console.log(message),
};

const morganHandler = morgan(
  'reqstatus :status',

  { stream }
);

export { morganHandler };
