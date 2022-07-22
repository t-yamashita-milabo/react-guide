import { ComponentStory, ComponentMeta } from "@storybook/react";

import DateFormYup from "./DateFormYup";

export default {
  title: "components / DateFormYup",
  component: DateFormYup,
} as ComponentMeta<typeof DateFormYup>;

const Template: ComponentStory<typeof DateFormYup> = () => <DateFormYup />;

export const Default = Template.bind({});
