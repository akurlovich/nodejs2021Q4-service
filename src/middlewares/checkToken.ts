/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY, EXCLUDE_ROUTES } from '../common/config';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (EXCLUDE_ROUTES.includes(req.path)) {
    return next();
  }

  try {
    const authHeader = <string>req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'No token' });
    }
    const token = <string>authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET_KEY!);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};
