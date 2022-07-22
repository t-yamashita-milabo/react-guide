import { ComponentStory, ComponentMeta } from "@storybook/react";

import RadioFormYup from "./RadioFormYup";

export default {
  title: "components / RadioFormYup",
  component: RadioFormYup,
} as ComponentMeta<typeof RadioFormYup>;

const Template: ComponentStory<typeof RadioFormYup> = () => <RadioFormYup />;

export const Default = Template.bind({});
