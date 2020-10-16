import express from 'express';
import router from './routes';
import { syncDb } from './db';
import { notFoundHandler, corsHandler, errorHandler, jsonParserHandler } from './utils/handlers';
import { initCountries } from './data/countries';
import { httpLogger } from './logging';

const app: express.Application = express()
  .use(express.urlencoded({ extended: true }))
  .use(corsHandler)
  .use(jsonParserHandler)
  .use(httpLogger)
  .use(router)
  .use(errorHandler)
  .use(notFoundHandler);

syncDb(true);
initCountries();

const port = process.env.PORT || '8000';
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
