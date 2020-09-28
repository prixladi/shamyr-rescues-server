import PromiseRouter from 'express-promise-router';
import { router as api } from './api';
import swagger from '../swagger/swagger.json';

const router = PromiseRouter();

router.use('/api', api);

router.get('/docs/swagger.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swagger);
});

export { router };
