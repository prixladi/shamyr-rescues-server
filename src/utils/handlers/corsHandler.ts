import { NextFunction, Request, Response } from 'express';

const handler = (_: Request, res: Response, next: NextFunction): void => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Access-Control-Expose-Headers', 'Location');
  next();
};

export default handler;
