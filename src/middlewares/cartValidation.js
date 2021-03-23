import Joi from 'joi';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/reponseHandler';

export const validateAddProductToCart = async (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.number().required(),
  });

  const result = await joiValidator(req.params, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result);
};

export const validateUpdateCart = async (req, res, next) => {
  const schema = Joi.object({
    quantity: Joi.number().required(),
  });

  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result);
};
