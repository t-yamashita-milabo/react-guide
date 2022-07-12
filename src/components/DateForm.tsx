import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
} from "@chakra-ui/react";
import { format } from "date-fns";

export type FormInput = {
  startDate: string;
};

const DateForm = () => {
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
  };

  const { register, formState, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      startDate: format(new Date(), "yyyy-MM-dd"), // <input type="date"> のvalue の有効なフォーマットが yyyy-MM-dd なのでそれに合わせて変換する．ここのフォーマットと Input で実際に表示されるフォーマットは違うことに注意
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formState.errors.startDate}>
        <FormLabel>開始日</FormLabel>
        <Input type="date" {...register("startDate")} />
        <FormErrorMessage>
          {formState.errors.startDate?.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit">保存</Button>
    </form>
  );
};

export default DateForm;
