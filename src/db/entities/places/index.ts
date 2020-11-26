import { BOOLEAN } from 'sequelize';
import { Sequelize, TEXT, STRING, INTEGER, ModelDefined, ModelAttributes, Model } from 'sequelize';
import { NewPlaceEntity, PlaceEntity } from './models';
import { nameof } from 'ts-simple-nameof';

type PlaceModel = ModelDefined<PlaceEntity, NewPlaceEntity>;

const attributes: ModelAttributes<Model<PlaceEntity, NewPlaceEntity>> = {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: STRING(80), allowNull: false },
  shortDescription: { type: TEXT, allowNull: false },
  countryCode: { type: STRING(2), allowNull: false },
  userId: STRING(24),
  removed: { type: BOOLEAN, defaultValue: false },
  description1: TEXT,
  description2: TEXT,
  description3: TEXT,
  address: TEXT,
  websiteUrl: STRING(1200),
  imageUrl: STRING(1200),
  quote: TEXT,
};

const indexes = [{ name: 'IX_countryCode', fields: [nameof<PlaceEntity>((e) => e.countryCode)] }];

const options = { tableName: 'places', indexes };

const define = (sequelize: Sequelize): PlaceModel => sequelize.define('Place', attributes, options);

export { define, PlaceModel };
export * from './models';
