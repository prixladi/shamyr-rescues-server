import { Place } from '..';
import { NewPlaceEntity, PlaceEntity, PlaceEntityPreviewInclude, PlaceEntityPreviews } from '../entities/places';

const createOne = async (entity: NewPlaceEntity): Promise<PlaceEntity> => {
  const result = await Place.create(entity);

  return result.get({ clone: true });
};

type Query = {
  offset: number;
  limit: number;
  userId?: string;
};
const getMany = async (query: Query): Promise<PlaceEntityPreviews> => {
  const { offset, limit, ...where } = query;

  const result = await Place.findAll({ where, offset, limit, attributes: PlaceEntityPreviewInclude });
  const count = await Place.count({ where });

  return {
    count,
    places: result.map((x) => x.get({ clone: true })),
  };
};

const getOne = async (id: number): Promise<PlaceEntity | null> => {
  const query = { where: { id } };
  const result = await Place.findOne(query);
  if (result === null) return null;

  return result.get({ clone: true });
};

const updateOne = async (id: number, update: Partial<PlaceEntity>): Promise<boolean> => {
  const query = { where: { id } };
  const result = await Place.update(update, query);

  return result[0] > 0;
};

export { createOne, getMany, updateOne, getOne };
