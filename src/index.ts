import express from 'express';
import router from './routes';
import { initDb, closeConnection as closeDbConnection } from './db';
import { notFoundHandler, corsHandler, errorHandler, jsonParserHandler } from './utils/handlers';
import { initCountries } from './data/countries';
import { httpLogger } from './logging';
import { startTokenFetching } from './auth/tokenService';
import { appPort } from './configs';

const main = async () => {
  const app: express.Application = express()
    .use(express.urlencoded({ extended: true }))
    .use(corsHandler)
    .use(jsonParserHandler)
    .use(httpLogger)
    .use(router)
    .use(errorHandler)
    .use(notFoundHandler);

  await initDb(false);
  initCountries();
  startTokenFetching();

  const shutdown = async () => {
    await closeDbConnection();
    process.exit();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  app.listen(appPort, () => {
    console.log(`Listening to requests on http://localhost:${appPort}`);
  });
};

main().catch((err) => {
  console.error(err);
});
