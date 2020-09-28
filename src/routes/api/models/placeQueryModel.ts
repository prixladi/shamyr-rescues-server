import { Joi } from 'express-validation';

type PlaceQueryModel = {
  offset: string;
  limit: string;
};

const placeQueryModelValidator = {
  query: Joi.object({
    offset: Joi.number().min(0).required(),
    limit: Joi.number().min(1).max(200).required(),
  }),
};

export { PlaceQueryModel, placeQueryModelValidator };
