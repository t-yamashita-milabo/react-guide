import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import z from "utils/zod.ja";

type User = {
  username: string;
  password: string;
};

export const createUser = async (params: User): Promise<User> => params;

const schema = z.object({
  username: z.string().min(1).describe("ユーザー名"),
  password: z.string().min(1),
});

export type CreateUserFormInput = z.infer<typeof schema>;

const CreateUserFormYup = () => {
  const toast = useToast();

  const defaultValues = {
    username: "",
    password: "",
  };

  const { register, formState, handleSubmit, reset } =
    useForm<CreateUserFormInput>({
      defaultValues,
      resolver: zodResolver(schema),
    });

  const onSubmit: SubmitHandler<CreateUserFormInput> = async (data) => {
    try {
      await createUser(data);
      toast({
        title: "ユーザーを作成しました",
        status: "success",
        duration: 10_000,
        isClosable: true,
        position: "top",
      });
      reset(defaultValues);
    } catch (err) {
      toast({
        title: "ユーザーを作成できませんでした",
        status: "error",
        duration: null,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formState.errors.username}>
        <FormLabel>ユーザー名</FormLabel>
        <Input {...register("username")} />
        <FormErrorMessage>
          {formState.errors.username?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formState.errors.password}>
        <FormLabel>パスワード</FormLabel>
        <Input type="password" {...register("password")} />
        <FormErrorMessage>
          {formState.errors.password?.message}
        </FormErrorMessage>
      </FormControl>

      <Button type="submit">保存</Button>
    </form>
  );
};

export default CreateUserFormYup;
