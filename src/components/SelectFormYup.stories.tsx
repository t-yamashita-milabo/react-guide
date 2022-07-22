import { ComponentStory, ComponentMeta } from "@storybook/react";

import SelectForm from "./SelectForm";

export default {
  title: "components / SelectForm",
  component: SelectForm,
} as ComponentMeta<typeof SelectForm>;

const Template: ComponentStory<typeof SelectForm> = () => <SelectForm />;

export const Default = Template.bind({});
