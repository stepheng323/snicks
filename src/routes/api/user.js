import { Router } from 'express';
import {
  validateSignup,
  validateLogin,
  validateForgotPassword,
  validateResetForgotPassword,
} from '../../middlewares/authValidation';
import {
  createUser,
  login,
  forgotPassword,
  resetForgotPassword,
  refreshUserToken,
} from '../../controllers/user.controller';

const user = Router();

user.post('/', validateSignup, createUser);
user.post('/login', validateLogin, login);
user.post('/forgot-password', validateForgotPassword, forgotPassword);
user.post(
  '/reset-forgot-password',
  validateResetForgotPassword,
  resetForgotPassword
);
user.get('/refresh-token', refreshUserToken);

export default user;
