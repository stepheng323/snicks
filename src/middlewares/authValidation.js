import Joi from 'joi';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/reponseHandler';

export const validateSignup = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number(),
    password: Joi.string().required(),
  });

  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result);
};

export const validateLogin = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result);
};
