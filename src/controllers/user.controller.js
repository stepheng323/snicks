import { catchAsync } from '../utils';
import {
  respondWithSuccess,
  respondWithWarning,
} from '../helpers/reponseHandler';
import { hashPassword, comparePassword } from '../helpers/bcrypt';
import { generateTokenAndExpiry, signRefreshToken } from '../helpers/jwt';

import Model from '../models/index';

const { User } = Model;

export const createUser = catchAsync(async (req, res, next) => {
  const {
    email, password, firstName, lastName
  } = req.body;
  const userExist = await User.findOne({ where: { email } });
  if (userExist) return respondWithWarning(res, 409, 'a user with the email exist', {});
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    role: 'user',
  });
  const { dataValues } = user;
  dataValues.password = undefined;
  dataValues.createdAt = undefined;
  dataValues.updatedAt = undefined;
  const tokenAndTokenExpiry = await generateTokenAndExpiry({ ...dataValues });
  const refreshToken = await signRefreshToken({ ...dataValues });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 604800000,
    httpOnly: true,
  });

  return respondWithSuccess(res, 201, 'User created successfully', {
    ...dataValues,
    ...tokenAndTokenExpiry,
    refreshToken,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return respondWithWarning(res, 404, 'incorrect email or password combination');
  const { dataValues, dataValues: { password: hashedPassword } } = user;
  const passwordMatch = await comparePassword(password, hashedPassword);
  if (!passwordMatch) return respondWithWarning(res, 400, 'incorrect email or password combination2');
  dataValues.password = undefined;
  dataValues.createdAt = undefined;
  dataValues.updatedAt = undefined;
  const tokenAndTokenExpiry = await generateTokenAndExpiry({ ...dataValues });
  const refreshToken = await signRefreshToken({ ...dataValues });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 604800000,
    httpOnly: true,
  });
  return respondWithSuccess(res, 201, 'User created successfully', {
    ...dataValues,
    ...tokenAndTokenExpiry,
  });
});
