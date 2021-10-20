import dotenv from 'dotenv';
dotenv.config();

export default {
  server: {
    PORT: process.env.PORT
  },
  database: {
    DB_HOST: 'mongodb://localhost:27017',
    DB_NAME: 'dbname',
    DB_USER: 'user',
    DB_PASSWORD: 'password'
  },
  auth: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    TOKEN_EXPIRATION: 72
  }
}