import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  author: Joi.string().min(1).required(),
});

export const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
