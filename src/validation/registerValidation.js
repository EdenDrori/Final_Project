import Joi from "joi";
import validation from "./validation";

const registerSchema = Joi.object({
  first: Joi.string().required().min(2).max(256),
  middle: Joi.string().min(2).max(256).allow(""),
  last: Joi.string().required().min(2).max(256),
  phone: Joi.string().required().min(9).max(11),
  url: Joi.string().min(14).allow(""),
  alt: Joi.string().min(2).max(256).allow(""),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(2).max(256).required(),
  zip: Joi.number().min(2).allow(""),
  isBussines: Joi.boolean().allow(""),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .min(5),
  password: Joi.string()
    .min(7)
    .max(20)
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/
      )
    )
    .messages({
      "string.pattern.base":
        "User password must be at least 9 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
      "string.empty": "Password is not allowed to be empty",
    })
    .min(2)
    .max(20)
    .required(),
});

const validateRegister = (inputToCheck) =>
  validation(registerSchema, inputToCheck);

export { validateRegister };
