import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

type User = {
  username: string;
  password: string;
};

export const createUser = async (params: User): Promise<User> =>
  await (
    await axios.post("http://localhost/user", params)
  ).data;

export type CreateUserFormInput = {
  username: string;
  password: string;
};

const CreateUserForm = () => {
  const { register, formState, handleSubmit } = useForm<CreateUserFormInput>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<CreateUserFormInput> = async (data) => {
    try {
      await createUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formState.errors.username}>
        <FormLabel>ユーザー名</FormLabel>
        <Input
          {...register("username", {
            required: "ユーザー名を入力してください",
          })}
        />
        <FormErrorMessage>
          {formState.errors.username?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formState.errors.password}>
        <FormLabel>パスワード</FormLabel>
        <Input
          type="password"
          {...register("password", {
            required: "パスワードを入力してください",
          })}
        />
        <FormErrorMessage>
          {formState.errors.password?.message}
        </FormErrorMessage>
      </FormControl>

      <Button type="submit">保存</Button>
    </form>
  );
};

export default CreateUserForm;
