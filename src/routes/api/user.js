import { Router } from 'express';
import {
  validateSignup,
  validateLogin,
  validateForgotPassword,
  validateResetForgotPassword,
  validateAddress
} from '../../middlewares/authValidation';
import {
  createUser,
  login,
  forgotPassword,
  resetForgotPassword,
  refreshUserToken,
  addShippingAddress
} from '../../controllers/user.controller';
import { checkAuth } from '../../middlewares/auth';

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
user.post('/address', checkAuth, validateAddress, addShippingAddress);

export default user;
