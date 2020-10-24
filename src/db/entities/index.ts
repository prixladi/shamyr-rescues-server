import { Sequelize } from 'sequelize';
import { define as definePlaces } from './places';
import { define as defineUsers } from './users';

export default (sequelize: Sequelize) => {
  const Place = definePlaces(sequelize);
  const User = defineUsers(sequelize);

  User.hasMany(Place, { foreignKey: { name: 'userId', allowNull: false } });

  return {
    Place,
    User,
  };
};
