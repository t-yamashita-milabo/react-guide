import { SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  FormControl,
  FormErrorMessage,
  Button,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

const colors = ["blue", "red", "green"] as const;

type Color = typeof colors[number];

export type FormInput = {
  color: Color;
};

const SelectForm = () => {
  const toast = useToast();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log({ data });
    toast({
      title: "Success!",
      status: "success",
      duration: 10_000,
      isClosable: true,
      position: "top",
    });
  };

  const { register, formState, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      color: "blue",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formState.errors.color}>
        <FormLabel>タイプ</FormLabel>
        <Select {...register("color")}>
          {colors.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{formState.errors.color?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit">保存</Button>
    </form>
  );
};

export default SelectForm;
