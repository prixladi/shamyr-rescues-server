import { Sequelize } from 'sequelize';
import { dbConfig, devEnvironment } from '../configs';
import defineEntities from './entities';

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'postgres',
  logging: devEnvironment,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const { Place, User } = defineEntities(sequelize);

const initDb = async (force: boolean): Promise<void> => {
  await sequelize.sync({ force: force });
  console.log('Database initialized!');
  if (force) {
    console.log('Database sync forced!');
  }
};

const closeConnection = async (): Promise<void> => {
  try {
    await sequelize.close();
    console.log('Successfully Closed DB connection');
  } catch (err) {
    console.error('Error while closing DB connection.', err);
  }
};

export { initDb, closeConnection, Place, User };
