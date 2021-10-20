import Joi from 'joi';

export class Validator{
  static loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required().trim(),
    password: Joi.string().required().trim()
  })

  static registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required().trim(),
    password: Joi.string().alphanum().min(8).max(30).required(),
    repeatPassword: Joi.ref('password'),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().required()
  })
}