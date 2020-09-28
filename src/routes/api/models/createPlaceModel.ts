import { Joi } from 'express-validation';

type CreatePlaceModel = {
  name: string;
  description: string;
};

const createPlaceModelValidator = {
  body: Joi.object({
    name: Joi.string().min(5).max(100).required(),
    description: Joi.string().required(),
  }),
};

export { CreatePlaceModel, createPlaceModelValidator };
