import { Joi } from 'express-validation';

const createPlaceModelValidator = {
  body: Joi.object({
    name: Joi.string().min(5).max(100).required(),
    description: Joi.string().required(),
  }),
};

const updatePlaceModelValidator = {
  body: Joi.object({
    name: Joi.string().min(5).max(100).required(),
    description: Joi.string().required(),
  }),
};

const routeIdValidator = {
  params: Joi.object({
    placeId: Joi.number().min(1).required(),
  }),
};

const placeQueryModelValidator = {
  query: Joi.object({
    offset: Joi.number().min(0).required(),
    limit: Joi.number().min(1).max(200).required(),
  }),
};

export { createPlaceModelValidator, updatePlaceModelValidator, routeIdValidator, placeQueryModelValidator };
