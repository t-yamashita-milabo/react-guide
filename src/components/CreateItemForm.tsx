import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import { Item } from "models/item";

export const createItem = async (params: Item): Promise<Item> => {
  // create item via API
  return params;
};

export type CreateItemFormInput = {
  itemName: string;
  price: number;
};

const CreateItemForm = () => {
  const { register, formState, handleSubmit } = useForm<CreateItemFormInput>({
    defaultValues: {
      itemName: "",
      price: 0,
    },
  });

  const onSubmit: SubmitHandler<CreateItemFormInput> = async (data) => {
    try {
      console.log(data);
      await createItem(data);
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
          {formState.errors.itemName && formState.errors.itemName.message}
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
        <FormErrorMessage>
          {formState.errors.price && formState.errors.price.message}
        </FormErrorMessage>
      </FormControl>

      <Button type="submit">保存</Button>
    </form>
  );
};

export default CreateItemForm;
