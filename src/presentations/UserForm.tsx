import { FC, useEffect } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  RadioGroup,
  Radio,
  Select,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";

import { Permission, UserType, userTypes, permissions } from "models/user";

export type UserFormInput = {
  username: string;
  password: string;
  active: boolean;
  type: UserType;
  permissions: Permission[];
};

type Props = {
  defaultValues?: UserFormInput;
  onSubmit: SubmitHandler<UserFormInput>;
  resetValues?: Partial<UserFormInput>;
};

const UserForm: FC<Props> = ({
  defaultValues = {
    username: "",
    password: "",
    active: true,
    type: "Admin",
    permissions: ["read"],
  },
  onSubmit,
  resetValues,
}) => {
  const { register, control, formState, handleSubmit, reset } =
    useForm<UserFormInput>({
      defaultValues,
    });

  useEffect(() => {
    if (formState.isSubmitSuccessful && resetValues) {
      console.log(resetValues);
      reset(resetValues);
    }
  }, [defaultValues, formState, reset, resetValues]);

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
          {formState.errors.username && formState.errors.username.message}
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
          {formState.errors.password && formState.errors.password.message}
        </FormErrorMessage>
      </FormControl>

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

      <FormControl isInvalid={!!formState.errors.type}>
        <FormLabel>タイプ</FormLabel>
        <Select {...register("type")}>
          {userTypes.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{formState.errors.type?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formState.errors.permissions}>
        <FormLabel>パーミッション</FormLabel>
        <Controller
          name="permissions"
          control={control}
          render={({ field }) => (
            <CheckboxGroup value={field.value} onChange={field.onChange}>
              {permissions.map((value) => (
                <Checkbox key={value} value={value}>
                  {value}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )}
        />
        <FormErrorMessage>
          {formState.errors.permissions?.message}
        </FormErrorMessage>
      </FormControl>

      <Button type="submit">保存</Button>
    </form>
  );
};

export default UserForm;
