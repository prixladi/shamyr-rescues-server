import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import { INTERNAL_SERVER_ERROR } from 'http-codes';
import { devEnvironment } from '../../configs';

const handler = (err: Error, _: Request, res: Response, __: NextFunction): Response => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  console.log(err);

  if (devEnvironment) {
    return res.status(INTERNAL_SERVER_ERROR).json(err);
  }

  return res.sendStatus(INTERNAL_SERVER_ERROR);
};

export default handler;
