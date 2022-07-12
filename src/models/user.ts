import { isArrayOf } from "utils/utils";

export const permissions = ["read", "write", "execute"] as const;

export type Permission = typeof permissions[number];

export const isPermission = (arg: unknown): arg is Permission => {
  const x = arg as Permission;

  return permissions.includes(x);
};

export const userTypes = ["Admin", "User"] as const;

export type UserType = typeof userTypes[number];

export type User = {
  id: number;
  username: string;
  password: string;
  active: boolean;
  type: UserType;
  permissions: Permission[];
};

export const isUserType = (arg: unknown): arg is UserType => {
  const x = arg as UserType;

  return userTypes.includes(x);
};

export const isUser = (arg: unknown): arg is User => {
  const x = arg as User;

  return (
    typeof x?.id === "number" &&
    typeof x?.username === "string" &&
    typeof x?.password === "string" &&
    typeof x?.active === "boolean" &&
    isUserType(x?.type) &&
    isArrayOf<Permission>(x?.permissions, isPermission)
  );
};
