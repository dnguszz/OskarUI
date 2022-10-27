import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tooltip, {
  ITooltip,
  Position as PositionType,
  Size as SizeType,
  Trigger as TriggerType,
} from "./Tooltip";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

export default {
  title: "Example/Tooltip",
  component: Tooltip,
  args: {
    message: "Lorem Ipsum",
  },
} as ComponentMeta<typeof Tooltip>;

interface ISizeProps {
  props: SizeType;
  text: string;
}

const triggerProps: TriggerType[] = ["hover", "click"];
const sizeProps: ISizeProps[] = [
  { props: "sm", text: "small" },
  { props: "md", text: "medium" },
  { props: "lg", text: "large" },
];
const positionProps: PositionType[] = ["top", "bottom", "left", "right"];

const Template: ComponentStory<typeof Tooltip> = (args: ITooltip) => (
  <StoryWrapper>
    {triggerProps.map((trigger) => {
      return (
        <Storycontainer>
          <h1>{trigger}</h1>
          <Tooltip {...args} trigger={trigger}>
            <StyledDiv>div</StyledDiv>
          </Tooltip>
          <Tooltip {...args} trigger={trigger}>
            <img
              src="https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img-300x196.jpg"
              alt="test img"
            />
          </Tooltip>
          <Tooltip {...args} trigger={trigger}>
            <SearchIcon sx={{ fontSize: 40 }} />
          </Tooltip>
          <Tooltip {...args} trigger={trigger}>
            <Button variant="contained">ToolTip Button</Button>
          </Tooltip>
        </Storycontainer>
      );
    })}
  </StoryWrapper>
);

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  theme: "secondary",
};

export const Size: ComponentStory<typeof Tooltip> = (args: ITooltip) => {
  return (
    <StoryWrapper>
      {sizeProps.map((size) => {
        return (
          <Tooltip {...args} size={size.props}>
            <Button variant="contained">{size.text}</Button>
          </Tooltip>
        );
      })}
    </StoryWrapper>
  );
};

export const Position: ComponentStory<typeof Tooltip> = (args: ITooltip) => {
  return (
    <StoryWrapper>
      {positionProps.map((position) => {
        return (
          <Tooltip {...args} position={position}>
            <Button variant="contained">{position}</Button>
          </Tooltip>
        );
      })}
    </StoryWrapper>
  );
};

export const AbsolutePosition: ComponentStory<typeof Tooltip> = (
  args: ITooltip
) => {
  return (
    <>
      <RelativeWrapper>
        <Tooltip {...args} position="bottom" trigger="hover">
          <AbsoluteWrapper>top:30 / right:30</AbsoluteWrapper>
        </Tooltip>
      </RelativeWrapper>
    </>
  );
};

const StoryWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
`;

const Storycontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const StyledDiv = styled.div`
  width: 100%;
  min-height: 50px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RelativeWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 100px;
  border: 1px solid black;
`;

const AbsoluteWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  border: 1px solid black;
`;
