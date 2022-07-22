import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import useSWR from "swr";

import { Item } from "models/item";

export const fetchItem = async (): Promise<Item> => {
  // fetch item via API
  return {
    id: "item0",
    itemName: "アイテム0",
    price: 100,
  };
};

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

export type UpdateItemFormInput = {
  itemName: string;
  price: number;
};

const UpdateItemForm = () => {
  const { data: item, error, loading } = useItem();

  const { register, formState, handleSubmit } = useForm<UpdateItemFormInput>({
    defaultValues: item ?? {
      itemName: "",
      price: 0,
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (!item) {
    return <p>Oops! Something wrong</p>;
  }

  const onSubmit: SubmitHandler<UpdateItemFormInput> = async (data) => {
    try {
      console.log(data);
      await updateItem({ ...data, id: item.id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formState.errors.itemName}>
        <FormLabel>アイテム名</FormLabel>
        <Input
          {...register("itemName", {
            required: "アイテム名を入力してください",
          })}
        />
        <FormErrorMessage>
          {formState.errors.itemName?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formState.errors.price}>
        <FormLabel>価格</FormLabel>
        <Input
          type="number"
          {...register("price", {
            required: "価格を入力してください",
            valueAsNumber: true,
          })}
        />
        <FormErrorMessage>{formState.errors.price?.message}</FormErrorMessage>
      </FormControl>

      <Button type="submit">保存</Button>
    </form>
  );
};

export default UpdateItemForm;
