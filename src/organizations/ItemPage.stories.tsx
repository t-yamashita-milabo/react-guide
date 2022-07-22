import { ComponentStory, ComponentMeta } from "@storybook/react";

import ItemPage from "./ItemPage";

export default {
  title: "organizations / ItemPage",
  component: ItemPage,
} as ComponentMeta<typeof ItemPage>;

const Template: ComponentStory<typeof ItemPage> = () => <ItemPage />;

export const Default = Template.bind({});
