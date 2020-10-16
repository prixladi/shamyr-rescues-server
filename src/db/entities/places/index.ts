import { Sequelize, TEXT, STRING, INTEGER, ModelDefined } from 'sequelize';
import { NewPlaceEntity, PlaceEntity } from './models';

type PlaceModel = ModelDefined<PlaceEntity, NewPlaceEntity>;

const attributes = {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: STRING(80), allowNull: false },
  shortDescription: { type: TEXT, allowNull: false },
  countryCode: { type: STRING(2), allowNull: false },
  description1: TEXT,
  description2: TEXT,
  description3: TEXT,
  address: TEXT,
  websiteUrl: STRING(1200),
  imageUrl: STRING(1200),
  quote: TEXT,
};

const indexes = [{ name: 'IX_countryCode', fields: ['countryCode'] }];

const options = { tableName: 'places', indexes };

const define = (sequelize: Sequelize): PlaceModel => sequelize.define('Place', attributes, options);

export { define, PlaceModel };
export * from './models';