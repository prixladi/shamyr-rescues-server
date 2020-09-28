import { Joi } from 'express-validation';

type PlaceModel = {
  id: number;
  name: string;
  description: string;
};

const routeIdValidator = {
  params: Joi.object({
    placeId: Joi.number().min(1).required(),
  }),
};

export { PlaceModel, routeIdValidator };
