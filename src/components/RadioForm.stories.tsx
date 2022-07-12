import { ComponentStory, ComponentMeta } from "@storybook/react";

import RadioForm from "./RadioForm";

export default {
  title: "components / RadioForm",
  component: RadioForm,
} as ComponentMeta<typeof RadioForm>;

const Template: ComponentStory<typeof RadioForm> = () => <RadioForm />;

export const Default = Template.bind({});
