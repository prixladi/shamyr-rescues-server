import { NextFunction, Request, Response } from 'express';

const handler = (_: Request, res: Response, next: NextFunction): void => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

export default handler;
