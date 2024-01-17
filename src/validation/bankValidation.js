import Joi from "joi";
import validation from "./validation";

const bankDetailsSchema = Joi.object({
  fullName: Joi.string().required().min(2).max(256),
//   bank: Joi.required()
//     .valid("discount", "hapoalim", "Leumi", "otsarHahayal", "mizrahiTefahot")
//     .messages({
//       required: "Please choose a Bank",
//     }),
  branch: Joi.number().min(1).max(999).required(),
  accountNumber: Joi.string().regex(/^\d+$/).min(5).max(10).required(),
});

const validateBankDetails = (inputToCheck) =>
  validation(bankDetailsSchema, inputToCheck);

export { validateBankDetails };
