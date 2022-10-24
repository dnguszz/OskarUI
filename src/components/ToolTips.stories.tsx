import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ToolTips, { IToolTips } from "./ToolTips";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

export default {
  title: "Example/ToolTips",
  component: ToolTips,
  args: {
    message: "Lorem Ipsum",
  },
} as ComponentMeta<typeof ToolTips>;

const Template: ComponentStory<typeof ToolTips> = (args: IToolTips) => (
  <StoryWrapper>
    <Storycontainer>
      <h1>hover</h1>
      <ToolTips {...args}>
        <StyledDiv>div</StyledDiv>
      </ToolTips>
      <ToolTips {...args}>
        <img
          src="https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img-300x196.jpg"
          alt="test img"
        />
      </ToolTips>
      <ToolTips {...args}>
        <SearchIcon sx={{ fontSize: 40 }} />
      </ToolTips>
      <ToolTips {...args}>
        <Button variant="contained">ToolTip Button</Button>
      </ToolTips>
    </Storycontainer>

    <Storycontainer>
      <h1>click</h1>
      <ToolTips {...args} trigger="click">
        <StyledDiv>div</StyledDiv>
      </ToolTips>
      <ToolTips {...args} trigger="click">
        <img
          src="https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img-300x196.jpg"
          alt="test img"
        />
      </ToolTips>
      <ToolTips {...args} trigger="click">
        <SearchIcon sx={{ fontSize: 40 }} />
      </ToolTips>
      <ToolTips {...args} trigger="click">
        <Button variant="contained">ToolTip Button</Button>
      </ToolTips>
    </Storycontainer>
  </StoryWrapper>
);

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  theme: "secondary",
};

export const Size: ComponentStory<typeof ToolTips> = (args: IToolTips) => {
  return (
    <StoryWrapper>
      <ToolTips {...args} size="sm">
        <Button variant="contained">SMALL</Button>
      </ToolTips>
      <ToolTips {...args} size="md">
        <Button variant="contained">MEDIUM</Button>
      </ToolTips>
      <ToolTips {...args} size="lg">
        <Button variant="contained">LARGE</Button>
      </ToolTips>
    </StoryWrapper>
  );
};

export const Position: ComponentStory<typeof ToolTips> = (args: IToolTips) => {
  return (
    <StoryWrapper>
      <ToolTips {...args} position="top">
        <Button variant="contained">TOP</Button>
      </ToolTips>
      <ToolTips {...args} position="bottom">
        <Button variant="contained">BOTTOM</Button>
      </ToolTips>
      <ToolTips {...args} position="left">
        <Button variant="contained">LEFT</Button>
      </ToolTips>
      <ToolTips {...args} position="right">
        <Button variant="contained">RIGHT</Button>
      </ToolTips>
    </StoryWrapper>
  );
};

export const AbsolutePosition: ComponentStory<typeof ToolTips> = (
  args: IToolTips
) => {
  return (
    <RelativeWrapper>
      <ToolTips {...args} position="bottom">
        <AbsoluteWrapper>it should be on the right</AbsoluteWrapper>
      </ToolTips>
    </RelativeWrapper>
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
`;

const StyledDiv = styled.div`
  width: fit-content;
  background-color: grey;
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
