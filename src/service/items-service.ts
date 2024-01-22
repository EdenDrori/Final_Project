import { Item } from "../database/model/item";
import { IItemInput } from "../@types/item";
const newItem = async (data: IItemInput, userId: string) => {
  
  const item = new Item(data);

  item.userId = userId;
  //random number that does not exist in the database:
  while (true) {
    const random = Math.floor(Math.random() * 1_000_000);
    const dbRes = await Item.findOne({ itemNumber: random });
    if (!dbRes) {
      item.itemNumber = random;
      break;
    }
  }

  return item.save();
};

export { newItem };
