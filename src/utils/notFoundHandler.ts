import { Request, Response } from 'express';
import { NOT_FOUND } from 'http-codes';

export const notFoundHandler = (_: Request, res: Response): void => {
  res.sendStatus(NOT_FOUND);
};
