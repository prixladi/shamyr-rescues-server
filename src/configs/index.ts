import dbConfig from './dbConfig';
import authConfig from './authConfig';

const appPort = process.env.PORT || '8000';
const devEnvironment = process.env.NODE_ENV === 'development';

export { dbConfig, authConfig };
export { appPort, devEnvironment };
