import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ToolTips, { IToolTips } from "./ToolTips";

export default {
  title: "Example/ToolTips",
  component: ToolTips,
  args: {
    message: "Lorem Ipsum",
    children: <button>Test Button</button>,
  },
} as ComponentMeta<typeof ToolTips>;

const Template: ComponentStory<typeof ToolTips> = (args: IToolTips) => (
  <ToolTips {...args}></ToolTips>
);

export const Primary = Template.bind({});
Primary.args = { trigger: "hover", position: "bottom" };
