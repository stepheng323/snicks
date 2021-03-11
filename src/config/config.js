import { DEV_DATABASE_URL, PROD_DATABASE_URL } from './contants';

module.exports = {
  development: {
    use_env_variable: true,
    url: DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: true,
    url: PROD_DATABASE_URL,
    dialect: 'postgres',
  },
};
