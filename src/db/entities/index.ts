import { Sequelize } from 'sequelize';
import { define as definePlaces, PlaceEntity } from './places';
import { define as defineUsers } from './users';
import { nameof } from 'ts-simple-nameof';

export default (sequelize: Sequelize) => {
  const Place = definePlaces(sequelize);
  const User = defineUsers(sequelize);

  User.hasMany(Place, { foreignKey: { name: nameof<PlaceEntity>((e) => e.userId), allowNull: false } });

  return {
    Place,
    User,
  };
};
