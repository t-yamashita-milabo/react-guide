import { ComponentStory, ComponentMeta } from "@storybook/react";

import GradeForm from "./GradeForm";

export default {
  title: "components / GradeForm",
  component: GradeForm,
} as ComponentMeta<typeof GradeForm>;

const Template: ComponentStory<typeof GradeForm> = () => <GradeForm />;

export const Default = Template.bind({});
