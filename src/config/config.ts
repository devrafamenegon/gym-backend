import { version, description } from '../../package.json';
const stringToBoolean = (value: string) => value === 'true';
const generateValidOrigin = (envOrigin: string): boolean | RegExp => {
  envOrigin = envOrigin || 'true';
  const isOriginBoolean = envOrigin === 'true' || envOrigin === 'false';
  return isOriginBoolean ? stringToBoolean(envOrigin) : new RegExp(envOrigin);
};

const {
  PORT,
  NODE_ENV,
  DB_URI,
  DB_NAME,
  APPLICATION_PREFIX,
  APPLICATION_NAME,
  CORS_ORIGIN,
  CORS_CREDENTIALS,
} = process.env;

export default () => ({
  NODE_ENV: NODE_ENV || 'development',
  port: parseInt(PORT, 10) || 3000,
  dbConfig: {
    dbUri: DB_URI || 'mongodb://127.0.0.1',
    dbName: parseInt(DB_NAME, 10) || 'dev-db',
  },
  app: {
    version,
    prefix: APPLICATION_PREFIX || '/',
    name: APPLICATION_NAME,
    description,
    contextApplication: APPLICATION_NAME,
  },
  cors: {
    origin: generateValidOrigin(CORS_ORIGIN),
    credentials: stringToBoolean(CORS_CREDENTIALS || 'true'),
  },
});
