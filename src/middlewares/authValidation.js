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

export const validateForgotPassword = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result);
};
export const validateResetForgotPassword = async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required().min(6),
  });
  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result);
};

export const validateAddress = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobileNumber: Joi.string().required(),
    streetAddress: Joi.string().required(),
    city: Joi.string(),
    state: Joi.string().required(),
    lga: Joi.string().required(),
  });
  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result);
};
