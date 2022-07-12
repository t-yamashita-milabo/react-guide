import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useToast, Spinner } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";

import { Permission, User, UserType } from "models/user";
import UserForm, { UserFormInput } from "presentations/UserForm";

export const fetchUser = async () =>
  await (
    await axios.get("http://localhost/user")
  ).data;

export const useUser = () => {
  const { data, error } = useSWR("/users", fetchUser);

  return {
    data,
    error,
    loading: !data && !error,
  };
};

export const updateUser = async (params: {
  username: string;
  password: string;
  active: boolean;
  type: UserType;
  permissions: Permission[];
}): Promise<User> =>
  await (
    await axios.put("http://localhost/user", params)
  ).data;

const UpdateUserForm = () => {
  const { data: user, error, loading } = useUser();
  const [resetValues, setResetValues] = useState<Partial<UserFormInput>>();
  const toast = useToast();

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    console.log(data);
    try {
      const res = await updateUser(data);
      console.log(res);
      toast({
        title: "ユーザーを更新しました",
        status: "success",
        duration: 10_000,
        isClosable: true,
        position: "top",
      });
      setResetValues({ ...res, password: "" });
    } catch (err) {
      console.log(err);
      toast({
        title: "ユーザーを更新できませんでした",
        status: "error",
        duration: null,
        isClosable: true,
        position: "top",
      });
      setResetValues(undefined);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <p>Oops! Something wrong</p>;
  }

  return (
    <UserForm
      defaultValues={user}
      onSubmit={onSubmit}
      resetValues={resetValues}
    />
  );
};

export default UpdateUserForm;
