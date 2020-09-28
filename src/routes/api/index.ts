import PromiseRouter from 'express-promise-router';
import { router as places } from './placesController';

const router = PromiseRouter();

router.use('/places', places);

export { router };
