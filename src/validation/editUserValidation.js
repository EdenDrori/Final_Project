import Joi from "joi";
import validation from "./validation";

const editUserSchema = Joi.object({
  first: Joi.string().required().min(2).max(256),
  middle: Joi.string().min(2).max(256).allow(""),
  last: Joi.string().required().min(2).max(256),
  phone: Joi.string().required().min(9).max(11),
  url: Joi.string().min(14).allow(""),
  alt: Joi.string().min(2).max(256).allow(""),

  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(2).max(256).required(),
  // zip: Joi.number().min(2).allow(""),
});

const validateEditUser = (inputToCheck) =>
  validation(editUserSchema, inputToCheck);

export { validateEditUser };
