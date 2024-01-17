import Joi from "joi";
import validation from "./validation";

const addressSchema = Joi.object({
  first: Joi.string().required().min(2).max(256),
  last: Joi.string().required().min(2).max(256),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(2).max(256).required(),
});

const validateAddress = (inputToCheck) =>
  validation(addressSchema, inputToCheck);

export { validateAddress };
