import PromiseRouter from 'express-promise-router';
import { validate } from 'express-validation';
import { OK, UNAUTHORIZED } from 'http-codes';
import { validateToken } from '../../../../auth/tokenService';
import { userRepository } from '../../../../db/repositories';
import { ParamsDictionary } from '../models';
import { UserTokenModel } from './models';
import { userTokenModelValidator } from './validators';

const route = '/users';
const router = PromiseRouter();

router.post<ParamsDictionary, void, UserTokenModel>('/', validate(userTokenModelValidator), async (req, res) => {
  const payload = validateToken(req.body.token);
  if (!payload) {
    return res.sendStatus(UNAUTHORIZED);
  }

  await userRepository.getOrCreate({ id: payload.name });
  res.sendStatus(OK);
});

export default router;
export { route };
