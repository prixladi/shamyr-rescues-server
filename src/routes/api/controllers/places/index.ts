import PromiseRouter from 'express-promise-router';
import { createPlaceModelValidator, updatePlaceModelValidator, placeQueryModelValidator, routeIdValidator } from './validators';
import { validate } from 'express-validation';
import { OK, CREATED, NOT_FOUND, NO_CONTENT } from 'http-codes';
import * as PlaceRepository from '../../../../db/repositories/placeRepository';
import { CreatePlaceModel, PlaceDetailModel, PlacesModel, UpdatePlaceModel } from './models';

const router = PromiseRouter();

const route = '/places';

router.post<any, PlaceDetailModel, CreatePlaceModel, any>('/', validate(createPlaceModelValidator), async (req, res) => {
  const resultPlace = await PlaceRepository.createOne(req.body);
  return res.location(`${route}/${resultPlace.id}`).sendStatus(CREATED);
});

router.get<any, PlacesModel, void, any>('/', validate(placeQueryModelValidator), async (req, res) => {
  const result = await PlaceRepository.getMany(Number(req.query.offset), Number(req.query.limit));
  return res.status(OK).json(result);
});

router.get('/:placeId', validate(routeIdValidator), async (req, res) => {
  const result = await PlaceRepository.getOne(Number(req.params.placeId));
  if (result === null) return res.sendStatus(NOT_FOUND);
  return res.status(OK).json(result);
});

router.put<any, void, UpdatePlaceModel, any>(
  '/:placeId',
  validate(routeIdValidator),
  validate(updatePlaceModelValidator),
  async (req, res) => {
    const result = PlaceRepository.updateOne(Number(req.params.placeId), req.body);
    if (!result) return res.sendStatus(NOT_FOUND);
    return res.sendStatus(NO_CONTENT);
  }
);

export default router;
export { route };
