import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tooltip, { ITooltip } from "./Tooltip";
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

const Template: ComponentStory<typeof Tooltip> = (args: ITooltip) => (
  <StoryWrapper>
    <Storycontainer>
      <h1>hover</h1>
      <Tooltip {...args}>
        <StyledDiv>div</StyledDiv>
      </Tooltip>
      <Tooltip {...args}>
        <img
          src="https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img-300x196.jpg"
          alt="test img"
        />
      </Tooltip>
      <Tooltip {...args}>
        <SearchIcon sx={{ fontSize: 40 }} />
      </Tooltip>
      <Tooltip {...args}>
        <Button variant="contained">ToolTip Button</Button>
      </Tooltip>
    </Storycontainer>

    <Storycontainer>
      <h1>click</h1>
      <Tooltip {...args} trigger="click">
        <StyledDiv>div</StyledDiv>
      </Tooltip>
      <Tooltip {...args} trigger="click">
        <img
          src="https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img-300x196.jpg"
          alt="test img"
        />
      </Tooltip>
      <Tooltip {...args} trigger="click">
        <SearchIcon sx={{ fontSize: 40 }} />
      </Tooltip>
      <Tooltip {...args} trigger="click">
        <Button variant="contained">ToolTip Button</Button>
      </Tooltip>
    </Storycontainer>
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
      <Tooltip {...args} size="sm">
        <Button variant="contained">SMALL</Button>
      </Tooltip>
      <Tooltip {...args} size="md">
        <Button variant="contained">MEDIUM</Button>
      </Tooltip>
      <Tooltip {...args} size="lg">
        <Button variant="contained">LARGE</Button>
      </Tooltip>
    </StoryWrapper>
  );
};

export const Position: ComponentStory<typeof Tooltip> = (args: ITooltip) => {
  return (
    <StoryWrapper>
      <Tooltip {...args} position="top">
        <Button variant="contained">TOP</Button>
      </Tooltip>
      <Tooltip {...args} position="bottom">
        <Button variant="contained">BOTTOM</Button>
      </Tooltip>
      <Tooltip {...args} position="left">
        <Button variant="contained">LEFT</Button>
      </Tooltip>
      <Tooltip {...args} position="right">
        <Button variant="contained">RIGHT</Button>
      </Tooltip>
    </StoryWrapper>
  );
};

export const AbsolutePosition: ComponentStory<typeof Tooltip> = (
  args: ITooltip
) => {
  return (
    <>
      <RelativeWrapper>
        <Tooltip {...args} position="bottom" trigger="click">
          <AbsoluteWrapper>it should be on the right</AbsoluteWrapper>
        </Tooltip>
        <Tooltip {...args} position="bottom">
          <StyledIcon sx={{ fontSize: 40 }} />
        </Tooltip>
      </RelativeWrapper>
    </>
  );
};

const StyledIcon = styled(SearchIcon)`
  position: absolute;
  top: 30px;
  left: 30px;
`;

const StoryWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
`;

const Storycontainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDiv = styled.div`
  width: fit-content;
  background-color: grey;
  margin: 50px;
`;

const RelativeWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 100px;
  background-color: grey;
`;

const AbsoluteWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: blue;
  width: 100px;
  height: 100px;
`;
