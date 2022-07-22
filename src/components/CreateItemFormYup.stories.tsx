import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateItemFormYup from "./CreateItemFormYup";

export default {
  title: "components / CreateItemFormYup",
  component: CreateItemFormYup,
} as ComponentMeta<typeof CreateItemFormYup>;

const Template: ComponentStory<typeof CreateItemFormYup> = () => (
  <CreateItemFormYup />
);

export const Default = Template.bind({});
