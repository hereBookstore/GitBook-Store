export default {
  MONGO_DB: process.env.MONGO_DB || 'gitbook',
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PWD: process.env.MONGO_PWD,
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
};
