const PlaceEntityPreviewInclude = ['id', 'name', 'shortDescription', 'countryCode', 'websiteUrl'];

type PlaceEntityPreview = {
  id: number;
  name: string;
  shortDescription: string;
  countryCode: string;
  websiteUrl?: string;
};

type PlaceEntity = PlaceEntityPreview & {
  userId: string;
  removed: boolean
  address?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  quote?: string;
  imageUrl?: string;
}

type NewPlaceEntity = {
  name: string;
  shortDescription: string;
  countryCode: string;
  userId: string;
  address?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  websiteUrl?: string;
  quote?: string;
  imageUrl?: string;
};

type PlaceEntityPreviews = {
  places: PlaceEntityPreview[];
  count: number;
};

export { PlaceEntityPreview, PlaceEntityPreviewInclude, PlaceEntityPreviews, PlaceEntity, NewPlaceEntity };
