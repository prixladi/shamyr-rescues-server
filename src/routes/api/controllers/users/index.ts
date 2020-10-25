import PromiseRouter from 'express-promise-router';
import { handleAuth } from '../../../../auth/handlers';

const route = '/users';
const router = PromiseRouter();

router.post('/', handleAuth);

export default router;
export { route };
