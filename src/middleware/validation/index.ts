import { joiItemSchema } from "../../joi/item.joi";
import { joiLoginSchema } from "../../joi/login.joi";
import { joiUserSchema } from "../../joi/user.joi";
import { validateSchema } from "./validate-schema";

export const validateUserRegistration = validateSchema(joiUserSchema);
export const validateUserLogin = validateSchema(joiLoginSchema);
export const validateNewItem = validateSchema(joiItemSchema)
