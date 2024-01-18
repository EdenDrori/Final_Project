import Joi from "joi";
import validation from "./validation";

const itemSchema = Joi.object({
  title: Joi.string().min(1).max(50).required(),
  brand: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(1).max(200).required(),
  size: Joi.string().max(10).allow(""),
  price: Joi.number().min(1).max(999999).required(),
  country: Joi.string().min(2).max(50).required(),
  city: Joi.string().min(2).max(50).required(),
  street: Joi.string().min(2).max(100).required(),
  houseNumber: Joi.number().min(0).max(999999).required(),
  url: Joi.string().max(200).allow(""),
  alt: Joi.string().max(200).allow(""),
  phone: Joi.string()
    .min(9)
    .max(15)
    .required()
    .pattern(new RegExp(/^((\+972|0)([23489]|5[02468]|77)-?[1-9]\d{6})$/)),
  status: Joi.string().default("available").allow(""),
});

const validateItem = (inputToCheck) => validation(itemSchema, inputToCheck);

export { validateItem };
