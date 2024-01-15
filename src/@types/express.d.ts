import { Request } from "express";
import { IUser } from "./user";
import { IItem } from "./item";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      item?: IItem;
    }
  }
}
