import { Sequelize, TEXT, STRING, INTEGER, ModelDefined } from 'sequelize';

export type PlaceEntity = {
  id: number;
  name: string;
  description: string;
};

export type PlaceEntityCeationAttributes = {
  name: string;
  description: string;
};

export default (sequelize: Sequelize): ModelDefined<PlaceEntity, PlaceEntityCeationAttributes> =>
  sequelize.define(
    'Place',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(150),
      description: TEXT,
    },
    { tableName: 'places' }
  );
