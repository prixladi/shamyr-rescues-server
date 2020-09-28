export const config = {
  host: process.env.HOST || 'localhost',
  user: process.env.USER || 'admin',
  password: process.env.PASSWORD || 'secret',
  db: process.env.DB || 'postgres',
  dialect: process.env.DIALECT || 'postgres',
  pool: {
    max: Number(process.env.POOL_MAX) || 5,
    min: Number(process.env.POOL_MIN) || 0,
    acquire: Number(process.env.POOL_ACQUIRE) || 30000,
    idle: Number(process.env.POOL_IDLE) || 10000,
  },
};
