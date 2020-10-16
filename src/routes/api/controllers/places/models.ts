type CreatePlaceModel = {
  name: string;
  shortDescription: string;
  countryCode: string;
  address?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  websiteUrl?: string;
  imageUrl?: string;
  quote?: string;
};

type UpdatePlaceModel = {
  name: string;
  shortDescription: string;
  countryCode: string;
  address?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  websiteUrl?: string;
  imageUrl?: string;
  quote?: string;
};

type PlacePreviewModel = {
  id: number;
  name: string;
  shortDescription: string;
  countryCode: string;
  websiteUrl?: string;
};

interface PlaceDetailModel extends PlacePreviewModel {
  address?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  imageUrl?: string;
  quote?: string;
}

type PlaceQueryModel = {
  offset: string;
  limit: string;
};

type PlacesModel = {
  count: number;
  places: PlacePreviewModel[];
};

export { CreatePlaceModel, UpdatePlaceModel, PlacePreviewModel, PlaceDetailModel, PlaceQueryModel, PlacesModel };
