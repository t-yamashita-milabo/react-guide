import { ComponentStory, ComponentMeta } from "@storybook/react";

import CheckboxFormYup from "./CheckboxFormYup";

export default {
  title: "components / CheckboxFormYup",
  component: CheckboxFormYup,
} as ComponentMeta<typeof CheckboxFormYup>;

const Template: ComponentStory<typeof CheckboxFormYup> = () => (
  <CheckboxFormYup />
);

export const Default = Template.bind({});
