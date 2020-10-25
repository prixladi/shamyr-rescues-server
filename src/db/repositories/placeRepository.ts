import { Place } from '..';
import { NewPlaceEntity, PlaceEntity, PlaceEntityPreviewInclude, PlaceEntityPreviews } from '../entities/places';

type Query = {
  offset: number;
  limit: number;
  userId?: string;
};

const createOne = async (entity: NewPlaceEntity): Promise<PlaceEntity> => {
  const result = await Place.create(entity);

  return result.get({ clone: true });
};

const getMany = async (query: Query): Promise<PlaceEntityPreviews> => {
  const { offset, limit, ...where } = query;
  const whereQuery = { removed: false, ...where };

  const result = await Place.findAll({ where: whereQuery, offset, limit, attributes: PlaceEntityPreviewInclude });
  const count = await Place.count({ where: whereQuery });

  return {
    count,
    places: result.map((x) => x.get({ clone: true })),
  };
};

const getOne = async (id: number): Promise<PlaceEntity | null> => {
  const query = { where: { id, removed: false } };
  const result = await Place.findOne(query);
  if (result === null) return null;

  return result.get({ clone: true });
};

const updateOne = async (id: number, update: Partial<PlaceEntity>): Promise<boolean> => {
  const query = { where: { id, removed: false } };
  const result = await Place.update(update, query);

  return result[0] > 0;
};

const markOneRemoved = async (id: number): Promise<boolean> => {
  const query = { where: { id, removed: false } };
  const result = await Place.update({ removed: true }, query);

  return result[0] > 0;
};

export { createOne, getMany, updateOne, getOne, markOneRemoved };
