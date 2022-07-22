import { ComponentStory, ComponentMeta } from "@storybook/react";

import GradeFormYup from "./GradeFormYup";

export default {
  title: "components / GradeFormYup",
  component: GradeFormYup,
} as ComponentMeta<typeof GradeFormYup>;

const Template: ComponentStory<typeof GradeFormYup> = () => <GradeFormYup />;

export const Default = Template.bind({});
