import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

import { Permission, User, UserType } from "models/user";
import UserForm, { UserFormInput } from "presentations/UserForm";

export const createUser = async (params: {
  username: string;
  password: string;
  active: boolean;
  type: UserType;
  permissions: Permission[];
}): Promise<User> =>
  await (
    await axios.post("http://localhost/user", params)
  ).data;

const CreateUserForm = () => {
  const toast = useToast();
  const [resetValues, setResetValues] = useState<Partial<UserFormInput>>();
  const defaultValues: UserFormInput = {
    username: "",
    password: "",
    active: true,
    type: "User",
    permissions: ["read"],
  };

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    console.log(data);
    try {
      const res = await createUser(data);
      console.log(res);
      toast({
        title: "ユーザーを作成しました",
        status: "success",
        duration: 10_000,
        isClosable: true,
        position: "top",
      });
      setResetValues(defaultValues);
    } catch (err) {
      console.log(err);
      toast({
        title: "ユーザーを作成できませんでした",
        status: "error",
        duration: null,
        isClosable: true,
        position: "top",
      });
      setResetValues(undefined);
    }
  };

  return (
    <UserForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      resetValues={resetValues}
    />
  );
};

export default CreateUserForm;
