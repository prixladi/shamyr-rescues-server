import { Sequelize } from 'sequelize';
import { dbConfig } from '../configs';
import { define as definePlaces } from './entities/places';

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const Place = definePlaces(sequelize);

const syncDb = async (force: boolean): Promise<void> => {
  await sequelize.sync({ force: force });
  console.log(`Database & tables created!`);
};

export { syncDb, Place };
