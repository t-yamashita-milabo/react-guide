import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import yup from "utils/yup.ja";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  active: yup.boolean().required().label("アクティブ"),
});

export type FormInput = yup.InferType<typeof schema>;

const RadioFormYup = () => {
  const toast = useToast();

  const { control, formState, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      active: true,
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
      <FormControl isInvalid={!!formState.errors.active}>
        <FormLabel>アクティブ</FormLabel>
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={`${field.value}`}
              onChange={(nextValue) => {
                field.onChange(nextValue === "true");
              }}
            >
              <Radio value="true">true</Radio>
              <Radio value="false">false</Radio>
            </RadioGroup>
          )}
        />
        <FormErrorMessage>{formState.errors.active?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit">保存</Button>
    </form>
  );
};

export default RadioFormYup;
