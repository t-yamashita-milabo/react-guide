import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Item } from "models/item";
import yup from "utils/yup.ja";
import { yupResolver } from "@hookform/resolvers/yup";

export const createItem = async (params: {
  itemName: string;
  price: number;
}): Promise<Item> => {
  // create item via API
  return { ...params, id: 0 };
};

const schema = yup.object({
  itemName: yup.string().required().label("アイテム名"),
  price: yup.number().required().label("価格"),
});

export type CreateItemFormInput = yup.InferType<typeof schema>;

const CreateItemFormYup = () => {
  const toast = useToast();

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
      toast({
        title: "Success!",
        status: "success",
        duration: 10_000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error!",
        status: "error",
        duration: null,
        isClosable: true,
        position: "top",
      });
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

export default CreateItemFormYup;
