import PromiseRouter from 'express-promise-router';
import { createPlaceModelValidator, updatePlaceModelValidator, placeQueryModelValidator, routeIdValidator } from './validators';
import { validate } from 'express-validation';
import { OK, CREATED, NOT_FOUND, NO_CONTENT } from 'http-codes';
import * as PlaceRepository from '../../../../db/repositories/placeRepository';
import { CreatePlaceModel, ParamsDictionary, PlaceDetailModel, PlaceIdParmasModel, PlaceQueryModel, PlacesModel, UpdatePlaceModel } from './models';
import { getCurrentUser, handleAuth } from '../../../../auth/handlers';

const route = '/places';
const router = PromiseRouter();

router.post<ParamsDictionary, PlaceDetailModel, CreatePlaceModel>('/', handleAuth, validate(createPlaceModelValidator), async (req, res) => {
  const user = getCurrentUser(req);

  const resultPlace = await PlaceRepository.createOne({ userId: user.id, ...req.body });
  return res.location(`${route}/${resultPlace.id}`).sendStatus(CREATED);
});

router.get<ParamsDictionary, PlacesModel, void, PlaceQueryModel>('/', validate(placeQueryModelValidator), async (req, res) => {
  const result = await PlaceRepository.getMany(req.query);
  return res.status(OK).json(result);
});

router.get<ParamsDictionary, PlaceDetailModel>('/:placeId', validate(routeIdValidator), async (req, res) => {
  const result = await PlaceRepository.getOne(Number(req.params.placeId));
  if (result === null) return res.sendStatus(NOT_FOUND);
  return res.status(OK).json(result);
});

router.put<PlaceIdParmasModel, void, UpdatePlaceModel>(
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
