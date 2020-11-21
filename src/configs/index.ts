const appPort = process.env.PORT || '8000';
const devEnvironment = process.env.NODE_ENV === 'development';

export { config as dbConfig } from './dbConfig';
export { config as authConfig } from './authConfig';
export { appPort, devEnvironment };
