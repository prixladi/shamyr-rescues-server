import { Sequelize } from 'sequelize';
import { define as definePlaces, PlaceEntity, PlaceModel } from './places';
import { define as defineUsers, UserModel } from './users';
import { nameof } from 'ts-simple-nameof';

type Db = {
  Place: PlaceModel;
  User: UserModel;
};

export default (sequelize: Sequelize): Db => {
  const Place = definePlaces(sequelize);
  const User = defineUsers(sequelize);

  User.hasMany(Place, { foreignKey: { name: nameof<PlaceEntity>((e) => e.userId), allowNull: false } });

  return {
    Place,
    User,
  };
};
