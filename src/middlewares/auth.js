import { verifyToken } from '../helpers/jwt';
import { respondWithWarning } from '../helpers/reponseHandler';

export const checkAuth = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    return respondWithWarning(res, 401, 'no token provided');
  }
  try {
    const auth = verifyToken(token);
    req.auth = auth;
    return next();
  } catch (error) {
    if (error.message === 'JsonWebTokenError') return respondWithWarning(res, 401, 'invalid token');
    return respondWithWarning(res, 401, error.message);
  }
};

export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.auth.role)) {
    return respondWithWarning(
      res,
      403,
      'you do not have the permission to perform this action'
    );
  }
  next();

};
