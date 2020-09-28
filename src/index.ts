import express from 'express';

import { router } from './routes';
import { syncDb } from './db';
import { notFoundHandler, corsHandler, errorHandler } from './utils';

const app: express.Application = express()
  .use(express.urlencoded({ extended: true }))
  .use(corsHandler)
  .use((req, res, next) => {
    try {
      next();
    } catch (err) {
      console.log('aaa');
      res.sendStatus(500);
    }
  })
  .use(express.json())
  .use(router)
  .use(errorHandler)
  .use(notFoundHandler);

syncDb(true);

const port = process.env.PORT || '8000';
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
