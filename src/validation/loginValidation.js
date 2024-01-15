import Joi from "joi";
import validation from "./validation";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .messages({
      "string.pattern.base": "Wrong Password",
      "string.empty": "Password is not allowed to be empty",
    })
    .min(2)
    .max(20)
    .required(),
});

const validateLogin = (inputToCheck) => validation(loginSchema, inputToCheck);

export { validateLogin };
