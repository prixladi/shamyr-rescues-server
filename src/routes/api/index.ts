import PromiseRouter from 'express-promise-router';
import places, { route as placesRoute } from './controllers/places';

const router = PromiseRouter();

router.use(placesRoute, places);

export default router;
