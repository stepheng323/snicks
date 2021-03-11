import { Router } from 'express';
import { createUser, login } from '../../controllers/user.controller';
import { validateSignup, validateLogin } from '../../middlewares/authValidation';

const user = Router();

user.post('/', validateSignup, createUser);
user.post('/login', validateLogin, login);

export default user;
