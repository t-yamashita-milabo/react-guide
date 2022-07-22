import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateUserFormYup from "./CreateUserFormYup";

export default {
  title: "components / CreateUserFormYup",
  component: CreateUserFormYup,
} as ComponentMeta<typeof CreateUserFormYup>;

const Template: ComponentStory<typeof CreateUserFormYup> = () => (
  <CreateUserFormYup />
);

export const Default = Template.bind({});
