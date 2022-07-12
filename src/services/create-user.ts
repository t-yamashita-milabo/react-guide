import axios from "axios";
import { Permission, User, UserType } from "models/user";

export type CreateUserParams = {
  username: string;
  password: string;
  active: boolean;
  type: UserType;
  permissions: Permission[];
};

export const createUser = async (params: CreateUserParams): Promise<User> =>
  await (
    await axios.post("http://localhost/user", params)
  ).data;
