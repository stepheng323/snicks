import { catchAsync, stripeUserData } from '../utils';
import { respondWithSuccess, respondWithWarning } from '../helpers/reponseHandler';
import { hashPassword, comparePassword } from '../helpers/bcrypt';
import {
  generateTokenAndExpiry, signRefreshToken, verifyRefreshToken, verifyToken
} from '../helpers/jwt';
import Model from '../models/index';
import { sendMail } from '../helpers/nodemailer';
import { generateForgotPasswordEmail } from '../utils/email';

const { User } = Model;

export const createUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    return respondWithWarning(res, 409, 'a user with the email exist', {});
  }
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    role: 'user',
  });

  const { dataValues } = user;
  const userData = stripeUserData(dataValues);
  const tokenAndTokenExpiry = await generateTokenAndExpiry({ ...userData });
  const refreshToken = await signRefreshToken({ ...userData });
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    maxAge: 604800000,
    httpOnly: true,
  });

  return respondWithSuccess(res, 201, 'User created successfully', {
    ...userData,
    ...tokenAndTokenExpiry,
    refreshToken,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return respondWithWarning(
      res,
      401,
      'incorrect email or password combination'
    );
  }
  const {
    dataValues,
    dataValues: { password: hashedPassword },
  } = user;
  const passwordMatch = await comparePassword(password, hashedPassword);
  if (!passwordMatch) {
    return respondWithWarning(
      res,
      401,
      'incorrect email or password combination'
    );
  }
  const userData = stripeUserData(dataValues);
  const tokenAndTokenExpiry = await generateTokenAndExpiry({ ...userData });
  const refreshToken = await signRefreshToken({ ...userData });
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    maxAge: 604800000,
    httpOnly: true,
  });
  return respondWithSuccess(res, 200, 'User logged in successfully', {
    ...userData,
    ...tokenAndTokenExpiry,
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  let token;
  if (user) {
    const result = await generateTokenAndExpiry({ email }, '1h');
    token = result.token;
    const { firstName } = user.dataValues;
    const emailBody = generateForgotPasswordEmail(firstName, token);
    const data = {
      to: email,
      subject: 'Your Snicks Account',
      body: emailBody,
    };
    await sendMail(data);
  }
  return respondWithSuccess(
    res,
    200,
    `If an account exist for ${email}, you will recieve password reset instruction`
  );
});

export const resetForgotPassword = catchAsync(async (req, res, next) => {
  const { resetToken } = req.query;
  const { password } = req.body;
  if (!resetToken) {
    return respondWithWarning(res, 400, 'No token provided');
  }
  const { email } = verifyToken(resetToken);
  const hashedPassword = await hashPassword(password);
  const result = await User.update(
    { password: hashedPassword },
    { where: { email }, returning: true, plain: true }
  );

  const user = result[1].dataValues;
  const userData = stripeUserData(user);
  const tokenAndTokenExpiry = await generateTokenAndExpiry({ ...userData });
  const refreshToken = await signRefreshToken({ ...userData });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 604800000,
    httpOnly: true,
  });

  return respondWithSuccess(res, 200, 'password updated successfully', {
    ...user,
    ...tokenAndTokenExpiry,
  });
});

export const refreshUserToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return respondWithWarning(res, 400, 'No refresh token');
  const user = await User.findOne({ where: { refreshToken } });
  if (!user) return respondWithWarning(res, 404, 'refresh token not found');

  const data = verifyRefreshToken(user.refreshToken);
  if (data) {
    const {
      firstName, lastName, email, id,
    } = data;
    const tokenAndTokenExpiry = await generateTokenAndExpiry({
      firstName, lastName, email, id,
    });
    const userData = stripeUserData(user.dataValues);
    return respondWithSuccess(res, 200, 'token generated successfuly', {
      ...tokenAndTokenExpiry,
      ...userData,
    });
  }
});
