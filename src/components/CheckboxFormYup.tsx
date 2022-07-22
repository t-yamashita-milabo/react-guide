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
import yup from "utils/yup.ja";
import { yupResolver } from "@hookform/resolvers/yup";

const colors = ["blue", "red", "green"] as const;

type Color = typeof colors[number];

const schema = yup.object({
  colors: yup
    .array()
    // Argument of type 'readonly ["blue", "red", "green"]' is not assignable to parameter of type '(Reference<unknown> | Maybe<string | undefined>)[]'.
    //   The type 'readonly ["blue", "red", "green"]' is 'readonly' and cannot be assigned to the mutable type '(Reference<unknown> | Maybe<string | undefined>)[]'.ts(2345)
    // .of(yup.string().oneOf(colors).required())
    .of(
      yup
        .string()
        .oneOf([...colors])
        .required()
    )
    .required()
    .label("カラー"),
});

// yup cannot infer string literals.
// export type FormInput = yup.InferType<typeof schema>;
// type FormInput = { color: string[]; }

export type FormInput = {
  colors: Color[];
};

const CheckboxFormYup = () => {
  const toast = useToast();

  const { control, formState, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      colors: ["blue", "red"],
    },
    resolver: yupResolver(schema),
  });

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

export default CheckboxFormYup;
