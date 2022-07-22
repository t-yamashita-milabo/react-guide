import { ComponentStory, ComponentMeta } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import ItemForm, { ItemFormInput } from "./ItemForm";

export default {
  title: "presentations / ItemForm",
  component: ItemForm,
} as ComponentMeta<typeof ItemForm>;

const Template: ComponentStory<typeof ItemForm> = (args) => (
  <ItemForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: async (data: ItemFormInput) => {
    console.log(data);
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: "保存" }));

  await expect(
    await canvas.findByText(/アイテム名を入力してください/)
  ).toBeInTheDocument();
};
