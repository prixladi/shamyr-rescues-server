type CreatePlaceModel = {
  name: string;
  description: string;
};

type UpdatePlaceModel = {
  name: string;
  description: string;
};

type PlaceModel = {
  id: number;
  name: string;
  description: string;
};

type PlaceQueryModel = {
  offset: string;
  limit: string;
};

export { CreatePlaceModel, UpdatePlaceModel, PlaceModel, PlaceQueryModel };
