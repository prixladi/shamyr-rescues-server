import { Request, Response } from 'express';
import { NOT_FOUND } from 'http-codes';

const handler = (_: Request, res: Response): void => {
  res.sendStatus(NOT_FOUND);
};

export default handler;
