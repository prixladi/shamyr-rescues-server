import qs from 'qs';
import { ParamsDictionary } from '../models';

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

type PlaceDetailModel = PlacePreviewModel & {
  address?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  imageUrl?: string;
  quote?: string;
};

type PlaceQueryModel = qs.ParsedQs & {
  offset: number;
  limit: number;
  userId?: string;
};

type PlacesModel = {
  count: number;
  places: PlacePreviewModel[];
};

type PlaceIdParmasModel = ParamsDictionary & {
  placeId: number;
};

export { CreatePlaceModel, UpdatePlaceModel, PlacePreviewModel, PlacesModel, PlaceDetailModel, PlaceQueryModel, PlaceIdParmasModel };
