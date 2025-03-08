import Joi from 'joi';

export const configValidationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
});