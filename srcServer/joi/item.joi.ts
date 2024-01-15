import Joi from "joi";
import { IAddress, IImage } from "../@types/user";
import { expirationDateRegex, phoneRegex } from "./patterns";
import { IItem, IPayment, IPrice } from "../@types/item";

const schema = Joi.object<IItem>({
  title: Joi.string().min(1).max(50).required(),
  brand: Joi.string().min(1).max(50).allow(""),
  description: Joi.string().min(1).max(200).required(),
  size: Joi.string().min(1).max(10).allow(""),
  address: Joi.object<IAddress>({
    state: Joi.string().min(2).max(50).allow(""),
    country: Joi.string().min(2).max(50).required(),
    city: Joi.string().min(2).max(50).required(),
    street: Joi.string().min(2).max(100).required(),
    houseNumber: Joi.number().min(0).max(999999).required(),
   // zip: Joi.string().min(2).max(30).allow(""),
  }),
  price: Joi.object<IPrice>({
    value: Joi.number().min(1).max(999999).required(),
    currency: Joi.string().min(1).max(4).required(),
  }),
  image: Joi.object<IImage>({
    url: Joi.string().min(12).max(200).allow(""),
    alt: Joi.string().min(2).max(200).allow(""),
  }),
  phone: Joi.string().min(9).max(15).required().pattern(phoneRegex),
  status: Joi.string().default("available"),
});

export { schema as joiItemSchema };
