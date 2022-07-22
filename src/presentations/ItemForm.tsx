import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

export type ItemFormInput = {
  itemName: string;
  price: number;
};

type Props = {
  defaultValues?: ItemFormInput;
  onSubmit: SubmitHandler<ItemFormInput>;
};

const ItemForm: FC<Props> = ({
  defaultValues = {
    itemName: "",
    price: 0,
  },
  onSubmit,
}) => {
  const { register, formState, handleSubmit } = useForm<ItemFormInput>({
    defaultValues,
  });

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

export default ItemForm;
