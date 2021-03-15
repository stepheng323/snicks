import Joi from 'joi';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/reponseHandler';

export const validateAddProduct = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    specification: Joi.string(),
    price: Joi.number().required(),
    brandId: Joi.number().required(),
    color: Joi.string().required(),
    size: Joi.array().required(),
    images: Joi.array().required(),
  });

  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result);
};
