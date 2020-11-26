import express, { NextFunction, Request, Response } from 'express';

const handler = (req: Request, res: Response, next: NextFunction): void =>
  express.json()(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    next();
  });

export default handler;
