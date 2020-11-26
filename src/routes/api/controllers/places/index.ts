import PromiseRouter from 'express-promise-router';
import { createPlaceModelValidator, updatePlaceModelValidator, placeQueryModelValidator, routeIdValidator } from './validators';
import { validate } from 'express-validation';
import { OK, CREATED, NOT_FOUND, NO_CONTENT } from 'http-codes';
import { placeRepository } from '../../../../db/repositories';
import { CreatePlaceModel, PlaceDetailModel, PlaceIdParmasModel, PlaceQueryModel, PlacesModel, UpdatePlaceModel } from './models';
import { getCurrentUser, handleAuth } from '../../../../auth/handlers';
import { handleCurrentUserResource } from './helpers';
import { ParamsDictionary } from '../models';

const route = '/places';
const router = PromiseRouter();

router.post<ParamsDictionary, PlaceDetailModel, CreatePlaceModel>(
  '/',
  handleAuth,
  validate(createPlaceModelValidator),
  async (req, res) => {
    const user = getCurrentUser(req.app);

    const resultPlace = await placeRepository.createOne({ userId: user.id, ...req.body });
    return res.location(`${route}/${resultPlace.id}`).sendStatus(CREATED);
  }
);

router.get<ParamsDictionary, PlacesModel, void, PlaceQueryModel>('/', validate(placeQueryModelValidator), async (req, res) => {
  const result = await placeRepository.getMany(req.query);
  return res.status(OK).json(result);
});

router.get<ParamsDictionary, PlaceDetailModel>('/:placeId', validate(routeIdValidator), async (req, res) => {
  const result = await placeRepository.getOne(Number(req.params.placeId));
  if (result === null) return res.sendStatus(NOT_FOUND);
  return res.status(OK).json(result);
});

router.put<PlaceIdParmasModel, void, UpdatePlaceModel>(
  '/:placeId',
  handleAuth,
  validate(routeIdValidator),
  validate(updatePlaceModelValidator),
  handleCurrentUserResource,
  async (req, res) => {
    await placeRepository.updateOne(req.params.placeId, req.body);
    return res.sendStatus(NO_CONTENT);
  }
);

router.delete<PlaceIdParmasModel, void, void>(
  '/:placeId',
  handleAuth,
  validate(routeIdValidator),
  handleCurrentUserResource,
  async (req, res) => {
    await placeRepository.markOneRemoved(req.params.placeId);
    return res.sendStatus(NO_CONTENT);
  }
);

export default router;
export { route };
