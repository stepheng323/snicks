import dotenv from 'dotenv';

dotenv.config();

const {
  DEV_DATABASE_URL,
  PROD_DATABASE_URL,
  SALT_ROUND,
  TEST_DATABASE_URL,
  PORT,
  NODE_ENV,
  TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  EMAIL_SENDER,
  EMAIL_SENDER_PASSWORD,
  FRONT_END_BASE_URL,
  AWS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = process.env;

export {
  DEV_DATABASE_URL,
  PROD_DATABASE_URL,
  TEST_DATABASE_URL,
  SALT_ROUND,
  PORT,
  NODE_ENV,
  TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  EMAIL_SENDER,
  EMAIL_SENDER_PASSWORD,
  FRONT_END_BASE_URL,
  AWS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
};
