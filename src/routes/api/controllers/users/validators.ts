import { Joi } from 'express-validation';
import { UserTokenModel } from './models';

const userTokenModelValidator = {
  body: Joi.object<UserTokenModel>({
    token: Joi.string()
      .regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      .required(),
  }),
};

export { userTokenModelValidator };
