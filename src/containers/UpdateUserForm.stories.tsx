import { ComponentStory, ComponentMeta } from "@storybook/react";
import { screen, userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { rest } from "msw";

import UpdateUserForm from "./UpdateUserForm";

export default {
  title: "containers / UpdateUserForm",
  component: UpdateUserForm,
} as ComponentMeta<typeof UpdateUserForm>;

const Template: ComponentStory<typeof UpdateUserForm> = () => (
  <UpdateUserForm />
);

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get("http://localhost/user", (req, res, ctx) => {
        return res(
          ctx.json({
            username: "alice",
            active: true,
            type: "Admin",
            permissions: ["read", "write"],
          })
        );
      }),
      rest.put("http://localhost/user", (req, res, ctx) => {
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

  // 既存のユーザーを fetch してくるのを待つ
  await waitFor(() => expect(getUsernameInput()).toBeInTheDocument());

  // Fetch してきた値が入っていることを確認
  await expect(getUsernameInput()).toHaveValue("alice");
  await expect(getPasswordInput()).toHaveValue("");
  await expect(getActiveTrueRadio()).toBeChecked();
  await waitFor(() =>
    expect(
      within(canvas.getByLabelText("タイプ")).getByRole<HTMLOptionElement>(
        "option",
        { name: "Admin" }
      )
    ).toBeVisible()
  );
  await waitFor(() => expect(getPermissionReadCheckbox()).toBeChecked());
  await waitFor(() => expect(getPermissionWriteCheckbox()).toBeChecked());
  await waitFor(() => expect(getPermissionExecuteCheckbox()).not.toBeChecked());

  // Form を入力
  await userEvent.clear(getUsernameInput());
  await userEvent.type(getUsernameInput(), "bob");

  await userEvent.type(getPasswordInput(), "password");

  await userEvent.click(getActiveFalseRadio());

  await userEvent.selectOptions(getUsertypeSelect(), "User");

  await userEvent.click(getPermissionReadCheckbox());
  await userEvent.click(getPermissionWriteCheckbox());
  await userEvent.click(getPermissionExecuteCheckbox());

  // 入力が反映されるのを待つ
  await waitFor(() => expect(getUsernameInput()).toHaveValue("bob"));
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
  await waitFor(() => expect(getPermissionWriteCheckbox()).not.toBeChecked());
  await waitFor(() => expect(getPermissionExecuteCheckbox()).toBeChecked());

  await userEvent.click(canvas.getByRole("button", { name: "保存" }));

  // アラートが出ることを確認
  await expect(
    await screen.findByText(/ユーザーを更新しました/)
  ).toBeInTheDocument();

  // Form の値がパスワード以外リセットされていないことを確認
  await waitFor(() => expect(getUsernameInput()).toHaveValue("bob"));
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
  await waitFor(() => expect(getPermissionWriteCheckbox()).not.toBeChecked());
  await waitFor(() => expect(getPermissionExecuteCheckbox()).toBeChecked());
};
