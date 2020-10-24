import { Joi } from 'express-validation';
import { CreatePlaceModel, PlaceIdParmasModel, PlaceQueryModel, UpdatePlaceModel } from './models';
import { countryCodeValidator } from '../../../../utils/validators';

const createPlaceModelValidator = {
  body: Joi.object<CreatePlaceModel>({
    name: Joi.string().min(5).max(80).required(),
    shortDescription: Joi.string().max(350).required(),
    countryCode: Joi.string().max(2).required().custom(countryCodeValidator),
    address:  Joi.string().max(600),
    description1: Joi.string().max(10000),
    description2: Joi.string().max(10000),
    description3: Joi.string().max(10000),
    websiteUrl: Joi.string().max(1200).uri(),
    imageUrl: Joi.string().max(1200).uri(),
    quote: Joi.string().max(2000),
  }),
};

const updatePlaceModelValidator = {
    body: Joi.object<UpdatePlaceModel>({
    name: Joi.string().min(5).max(80).required(),
    shortDescription: Joi.string().max(350).required(),
    countryCode: Joi.string().max(2).required().custom(countryCodeValidator),
    address:  Joi.string().max(600),
    description1: Joi.string().max(10000),
    description2: Joi.string().max(10000),
    description3: Joi.string().max(10000),
    websiteUrl: Joi.string().max(1200).uri(),
    imageUrl: Joi.string().max(1200).uri(),
    quote: Joi.string().max(2000),
  }),
};

const routeIdValidator = {
  params: Joi.object<PlaceIdParmasModel>({
    placeId: Joi.number().min(1).required(),
  }),
};

const placeQueryModelValidator = {
  query: Joi.object<PlaceQueryModel>({
    offset: Joi.number().min(0).required(),
    limit: Joi.number().min(1).max(200).required(),
    userId: Joi.string().regex(/^[a-f\d]{24}$/),
  }),
};

export { createPlaceModelValidator, updatePlaceModelValidator, routeIdValidator, placeQueryModelValidator };
