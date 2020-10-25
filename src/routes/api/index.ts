import PromiseRouter from 'express-promise-router';
import places, { route as placesRoute } from './controllers/places';
import users, { route as usersRoute } from './controllers/users';

const router = PromiseRouter();

router.use(placesRoute, places);
router.use(usersRoute, users);

export default router;
