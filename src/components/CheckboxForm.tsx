import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CheckboxGroup,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Button,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

const colors = ["blue", "red", "green"] as const;

type Color = typeof colors[number];

export type FormInput = {
  colors: Color[];
};

const CheckboxForm = () => {
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

  const { control, formState, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      colors: ["blue", "red"],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formState.errors.colors}>
        <FormLabel>カラー</FormLabel>
        <Controller
          name="colors"
          control={control}
          render={({ field }) => (
            <CheckboxGroup value={field.value} onChange={field.onChange}>
              {colors.map((value) => (
                <Checkbox key={value} value={value}>
                  {value}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )}
        />
        <FormErrorMessage>{formState.errors.colors?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit">保存</Button>
    </form>
  );
};

export default CheckboxForm;
