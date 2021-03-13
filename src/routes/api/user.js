import { Router } from 'express';
import { createUser, login, forgotPassword } from '../../controllers/user.controller';
import { validateSignup, validateLogin, validateForgotPassword } from '../../middlewares/authValidation';

const user = Router();

user.post('/', validateSignup, createUser);
user.post('/login', validateLogin, login);
user.post('/forgot-password', validateForgotPassword, forgotPassword);

export default user;
