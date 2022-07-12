import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CheckboxGroup,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Button,
  FormLabel,
} from "@chakra-ui/react";

const colors = ["blue", "red", "green"] as const;

type Color = typeof colors[number];

export type FormInput = {
  color: Color[];
};

const CheckboxForm = () => {
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
  };

  const { control, formState, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      color: ["blue", "red"],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formState.errors.color}>
        <FormLabel>カラー</FormLabel>
        <Controller
          name="color"
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
        <FormErrorMessage>{formState.errors.color?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit">保存</Button>
    </form>
  );
};

export default CheckboxForm;
