import { Spinner } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import useSWR from "swr";

import { Item } from "models/item";
import ItemForm, { ItemFormInput } from "presentations/ItemForm";

export const fetchItem = async (): Promise<Item> => ({
  id: 0,
  itemName: "item0",
  price: 100,
});

export const useItem = () => {
  const { data, error } = useSWR("/item", fetchItem);

  return {
    data,
    error,
    loading: !data && !error,
  };
};

export const updateItem = async (params: Item): Promise<Item> => {
  // update item via API
  return params;
};

const UpdateItemForm = () => {
  const { data: item, loading } = useItem();

  if (loading) {
    return <Spinner />;
  }

  if (!item) {
    return <p>Oops! Something wrong</p>;
  }

  const onSubmit: SubmitHandler<ItemFormInput> = async (data) => {
    try {
      console.log(data);
      await updateItem({ ...data, id: item.id });
    } catch (err) {
      console.log(err);
    }
  };

  return <ItemForm onSubmit={onSubmit} defaultValues={item} />;
};

export default UpdateItemForm;
