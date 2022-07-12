import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

export type FormInput = {
  active: boolean;
};

const RadioForm = () => {
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
  };

  const { control, formState, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      active: true,
    },
  });

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
        <FormErrorMessage>
          {formState.errors.active && formState.errors.active.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit">保存</Button>
    </form>
  );
};

export default RadioForm;
