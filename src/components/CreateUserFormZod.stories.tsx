import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateUserFormZod from "./CreateUserFormZod";

export default {
  title: "components / CreateUserFormZod",
  component: CreateUserFormZod,
} as ComponentMeta<typeof CreateUserFormZod>;

const Template: ComponentStory<typeof CreateUserFormZod> = () => (
  <CreateUserFormZod />
);

export const Default = Template.bind({});
