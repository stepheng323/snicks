import Jwt from 'jsonwebtoken';
import {
  TOKEN_SECRET_KEY,
  TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET_KEY,
} from '../config/contants';

export const generateTokenAndExpiry = async (data, expiresIn) => {
  const token = await Jwt.sign(data, TOKEN_SECRET_KEY, {
    expiresIn: expiresIn || TOKEN_EXPIRATION,
  });
  const { exp: tokenExpiry } = Jwt.decode(token);
  return { token, tokenExpiry };
};

export const signRefreshToken = async (data) => {
  const refreshToken = await Jwt.sign(data, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });
  return refreshToken;
};

export const verifyToken = (token) => Jwt.verify(token, process.env.TOKEN_SECRET_KEY);

export const verifyRefreshToken = (refreshToken) => {
  const refToken = Jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
  return refToken;
};
