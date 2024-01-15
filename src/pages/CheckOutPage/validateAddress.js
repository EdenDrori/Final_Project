import Joi from "joi";
import validation from "../../validation/validation";

const addressSchema = Joi.object({
  first: Joi.string().required().min(2).max(256),
  last: Joi.string().required().min(2).max(256),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(2).max(256).required(),
  zip: Joi.number().min(2).allow(""),
});

const validateAddress = (inputToCheck) =>
  validation(addressSchema, inputToCheck);

export { validateAddress };
