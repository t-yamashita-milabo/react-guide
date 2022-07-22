import { ComponentStory, ComponentMeta } from "@storybook/react";

import SelectFormYup from "./SelectFormYup";

export default {
  title: "components / SelectFormYup",
  component: SelectFormYup,
} as ComponentMeta<typeof SelectFormYup>;

const Template: ComponentStory<typeof SelectFormYup> = () => <SelectFormYup />;

export const Default = Template.bind({});
