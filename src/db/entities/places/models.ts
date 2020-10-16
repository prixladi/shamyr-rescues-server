const PlaceEntityPreviewInclude = ['id', 'name', 'shortDescription', 'countryCode', 'websiteUrl'];

type PlaceEntityPreview = {
  id: number;
  name: string;
  shortDescription: string;
  countryCode: string;
  websiteUrl?: string;
};

interface PlaceEntity extends PlaceEntityPreview {
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
