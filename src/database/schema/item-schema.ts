import { Schema } from "mongoose";
import { IItem } from "../../@types/item";
import { addressSchema } from "./address-schema";
import { imageSchema } from "./image-schema";
import { priceSchema } from "./price-schema";
import { required } from "joi";

const itemSchema = new Schema<IItem>({
  address: addressSchema,
  image: {
    type: imageSchema,
    required: false,
    default: {
      url: "https://images.pexels.com/photos/326576/pexels-photo-326576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "",
    },
  },
  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 15,
  },

  title: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  brand: {
    required: false,
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  size: {
    required: false,
    type: String,
    minlength: 1,
    maxlength: 10,
  },
  price: {
    required: true,
    type: priceSchema,
  },
  description: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 200,
  },
  itemNumber: {
    required: false,
    type: Number,
    default: () => Math.round(Math.random() * 1_000_000),
    minlength: 5,
    maxlength: 999999999999999,
    unique: true,
  },
  userId: {
    required: false,
    type: String,
    minlength: 20,
    maxlength: 30,
  },
  likes: [
    {
      required: false,
      type: String,
      default: [],
    },
  ],
  createdAt: {
    required: false,
    type: Date,
    default: new Date(),
  },
  status:{
    required:false,
    type:String,
    enum:["sold","available"]
  }
});

export { itemSchema };
