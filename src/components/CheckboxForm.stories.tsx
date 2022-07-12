import { ComponentStory, ComponentMeta } from "@storybook/react";

import SelectForm from "./CheckboxForm";

export default {
  title: "components / CheckboxForm",
  component: SelectForm,
} as ComponentMeta<typeof SelectForm>;

const Template: ComponentStory<typeof SelectForm> = () => <SelectForm />;

export const Default = Template.bind({});
