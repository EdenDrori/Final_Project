import Joi from "joi";
import validation from "./validation";

const itemSchema = Joi.object({
  title: Joi.string().min(1).max(50).required(),
  brand: Joi.string().min(1).max(50).allow(""),
  description: Joi.string().min(1).max(200).required(),
  size: Joi.string().min(1).max(10).allow(),
  value: Joi.number().min(1).max(999999).required(),
  currency: Joi.string().min(1).max(4).required(),
  state: Joi.string().min(2).max(50).allow(""),
  country: Joi.string().min(2).max(50).required(),
  city: Joi.string().min(2).max(50).required(),
  street: Joi.string().min(2).max(100).required(),
  houseNumber: Joi.number().min(0).max(999999).required(),
  //zip: Joi.string().min(2).max(30).allow(""),
  url: Joi.string().min(12).max(200).allow(""),
  alt: Joi.string().min(2).max(200).allow(""),
  phone: Joi.string()
    .min(9)
    .max(15)
    .required()
    .pattern(new RegExp(/^((\+972|0)([23489]|5[02468]|77)-?[1-9]\d{6})$/)),
  status: Joi.string().default("available"),
});

const validateItem = (inputToCheck) => validation(itemSchema, inputToCheck);

export { validateItem };
