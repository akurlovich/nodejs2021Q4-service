import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { CustomError } from '../utils/index';

const forbiddenerr = (_req: Request, _res: Response, next: NextFunction) =>
  next(
    new CustomError(
      StatusCodes.FORBIDDEN,
      getReasonPhrase(StatusCodes.FORBIDDEN)
    )
  );

const notfounderr = (_req: Request, _res: Response, next: NextFunction) =>
  next(
    new CustomError(
      StatusCodes.NOT_FOUND,
      getReasonPhrase(StatusCodes.NOT_FOUND)
    )
  );

export { forbiddenerr, notfounderr };
