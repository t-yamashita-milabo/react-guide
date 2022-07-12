import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateItemForm from "./CreateItemForm";

export default {
  title: "containers / CreateItemForm",
  component: CreateItemForm,
} as ComponentMeta<typeof CreateItemForm>;

const Template: ComponentStory<typeof CreateItemForm> = () => (
  <CreateItemForm />
);

export const Default = Template.bind({});
