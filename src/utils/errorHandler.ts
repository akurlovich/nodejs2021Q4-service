import { Request, NextFunction, Response } from 'express';

class CustomError extends Error {
  statusNum: number;

  message: string;

  constructor(statusNum: number, message: string) {
    super();
    this.statusNum = statusNum;
    this.message = message;
  }
}

const handleError = (
  err: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { statusNum, message } = err;

  if (err.statusNum) {
    res.status(statusNum).json({
      status: 'error',
      statusNum,
      message,
    });
  }

  next();
};

export { CustomError, handleError };
