import { ComponentStory, ComponentMeta } from "@storybook/react";
import { userEvent, within, waitFor, screen } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { rest } from "msw";

import CreateUserForm from "./CreateUserForm";

export default {
  title: "containers / CreateUserForm",
  component: CreateUserForm,
} as ComponentMeta<typeof CreateUserForm>;

const Template: ComponentStory<typeof CreateUserForm> = () => (
  <CreateUserForm />
);

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.post("http://localhost/user", (req, res, ctx) => {
        return res(
          ctx.json({
            ...(req.body as Record<string, any>),
            password: undefined,
          })
        );
      }),
    ],
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const getUsernameInput = () => canvas.getByLabelText("ユーザー名");
  const getPasswordInput = () => canvas.getByLabelText("パスワード");
  const getActiveTrueRadio = () => canvas.getByLabelText("true");
  const getActiveFalseRadio = () => canvas.getByLabelText("false");
  const getUsertypeSelect = () => canvas.getByLabelText("タイプ");
  const getPermissionReadCheckbox = () => canvas.getByLabelText("read");
  const getPermissionWriteCheckbox = () => canvas.getByLabelText("write");
  const getPermissionExecuteCheckbox = () => canvas.getByLabelText("execute");

  // Form を入力
  await userEvent.clear(getUsernameInput());
  await userEvent.type(getUsernameInput(), "alice");

  await userEvent.type(getPasswordInput(), "password");

  await userEvent.click(getActiveFalseRadio());

  await userEvent.selectOptions(getUsertypeSelect(), "User");

  await userEvent.click(getPermissionReadCheckbox());
  await userEvent.click(getPermissionWriteCheckbox());
  await userEvent.click(getPermissionExecuteCheckbox());

  // 入力が反映されるのを待つ
  await waitFor(() => expect(getUsernameInput()).toHaveValue("alice"));
  await waitFor(() => expect(getPasswordInput()).toHaveValue("password"));
  await waitFor(() => expect(getActiveFalseRadio()).toBeChecked());
  await waitFor(() =>
    expect(
      within(canvas.getByLabelText("タイプ")).getByRole<HTMLOptionElement>(
        "option",
        { name: "User" }
      )
    ).toBeVisible()
  );
  await waitFor(() => expect(getPermissionReadCheckbox()).not.toBeChecked());
  await waitFor(() => expect(getPermissionWriteCheckbox()).toBeChecked());
  await waitFor(() => expect(getPermissionExecuteCheckbox()).toBeChecked());

  await userEvent.click(canvas.getByRole("button", { name: "保存" }));

  // アラートが出ることを確認
  await expect(
    await screen.findByText(/ユーザーを作成しました/)
  ).toBeInTheDocument();

  // Form の値がリセットされていることを確認
  await waitFor(() => expect(getUsernameInput()).toHaveValue(""));
  await waitFor(() => expect(getPasswordInput()).toHaveValue(""));
  await waitFor(() => expect(getActiveTrueRadio()).toBeChecked());
  await waitFor(() =>
    expect(
      within(canvas.getByLabelText("タイプ")).getByRole<HTMLOptionElement>(
        "option",
        { name: "Admin" }
      )
    ).toBeVisible()
  );
  await waitFor(() => expect(getPermissionReadCheckbox()).toBeChecked());
  await waitFor(() => expect(getPermissionWriteCheckbox()).not.toBeChecked());
  await waitFor(() => expect(getPermissionExecuteCheckbox()).not.toBeChecked());
};
