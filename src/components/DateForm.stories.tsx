import { ComponentStory, ComponentMeta } from "@storybook/react";

import DateForm from "./DateForm";

export default {
  title: "components / DateForm",
  component: DateForm,
} as ComponentMeta<typeof DateForm>;

const Template: ComponentStory<typeof DateForm> = () => <DateForm />;

export const Default = Template.bind({});
