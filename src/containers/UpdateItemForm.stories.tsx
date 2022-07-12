import { ComponentStory, ComponentMeta } from "@storybook/react";

import UpdateItemForm from "./UpdateItemForm";

export default {
  title: "containers / UpdateItemForm",
  component: UpdateItemForm,
} as ComponentMeta<typeof UpdateItemForm>;

const Template: ComponentStory<typeof UpdateItemForm> = () => (
  <UpdateItemForm />
);

export const Default = Template.bind({});
