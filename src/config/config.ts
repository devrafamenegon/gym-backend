import { version, description } from '../../package.json';
const stringToBoolean = (value: string) => value === 'true';
const generateValidOrigin = (envOrigin: string): boolean | RegExp => {
  envOrigin = envOrigin || 'true';
  const isOriginBoolean = envOrigin === 'true' || envOrigin === 'false';
  return isOriginBoolean ? stringToBoolean(envOrigin) : new RegExp(envOrigin);
};

export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  dbConfig: {
    dbUri: process.env.DB_URI || 'mongodb://127.0.0.1',
    dbName: parseInt(process.env.DB_NAME, 10) || 'dev-db',
  },
  app: {
    version,
    prefix: process.env.APPLICATION_PREFIX || '/',
    name: process.env.APPLICATION_NAME || 'gym',
    description,
    contextApplication: process.env.APPLICATION_NAME,
  },
  cors: {
    origin: generateValidOrigin(process.env.CORS_ORIGIN),
    credentials: stringToBoolean(process.env.CORS_CREDENTIALS || 'true'),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES,
  },
});
