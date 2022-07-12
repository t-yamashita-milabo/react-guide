import { SubmitHandler } from "react-hook-form";

import { Item } from "models/item";
import ItemForm, { ItemFormInput } from "presentations/ItemForm";

export const createItem = async (params: {
  itemName: string;
  price: number;
}): Promise<Item> => {
  // create user via API
  return { ...params, id: 0 };
};

const CreateItemForm = () => {
  const onSubmit: SubmitHandler<ItemFormInput> = async (data) => {
    try {
      console.log(data);
      await createItem(data);
    } catch (err) {
      console.log(err);
    }
  };

  return <ItemForm onSubmit={onSubmit} />;
};

export default CreateItemForm;
