import PromiseRouter from 'express-promise-router';
import { createPlaceModelValidator, placeQueryModelValidator, routeIdValidator } from './models';
import { validate } from 'express-validation';
import { Place } from '../../db';
import { OK, CREATED, NOT_FOUND } from 'http-codes';

const router = PromiseRouter();

router.post('/', validate(createPlaceModelValidator), async (req, res) => {
  const place = {
    name: req.body.name,
    description: req.body.description,
  }
  const result = await Place.create(place);

  return res.status(CREATED).send(result.get({ clone: true }));
});

router.get('/', validate(placeQueryModelValidator), async (req, res) => {
  const query = {
    offset: Number(req.query.offset),
    limit: Number(req.query.limit),
  };
  const result = await Place.findAll(query);

  return res.status(OK).json(result.map((entity) => entity.get({ clone: true })));
});

router.get('/:placeId', validate(routeIdValidator), async (req, res) => {
  const query = { where: { id: req.params.id } };
  const result = await Place.findOne(query);
  if(result === null)
    return res.sendStatus(NOT_FOUND);

  return res.status(OK).json(result.get({ clone: true }));
});

export { router };
