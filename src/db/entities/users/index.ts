import { Sequelize, STRING, ModelDefined, ModelOptions, ModelAttributes, Model } from 'sequelize';
import { UserEntity, NewUserEntity } from './models';

type UserModel = ModelDefined<UserEntity, NewUserEntity>;

const attributes: ModelAttributes<Model<UserEntity, NewUserEntity>> = {
  id: {
    type: STRING(24),
    primaryKey: true,
  },
};

const options: ModelOptions = { tableName: 'users' };

const define = (sequelize: Sequelize): UserModel => sequelize.define('User', attributes, options);

export { define, UserModel };
export * from './models';
