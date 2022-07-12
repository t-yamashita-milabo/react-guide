import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateUserForm from "./CreateUserForm";

export default {
  title: "components / CreateUserForm",
  component: CreateUserForm,
} as ComponentMeta<typeof CreateUserForm>;

const Template: ComponentStory<typeof CreateUserForm> = () => (
  <CreateUserForm />
);

export const Default = Template.bind({});
