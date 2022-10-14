import React from "react";
import "./App.css";
import ToolTips from "./components/ToolTips";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <StyledD>
        <ToolTips message="this is message1" position="bottom" trigger="hover">
          <button>바텀오버</button>
        </ToolTips>
        <ToolTips message="this is message1" position="top" trigger="hover">
          <button>탑</button>
        </ToolTips>
        <ToolTips
          message="이것은 &#10;툴팁긴글자긴글자긴글자긴글자긴글자긴글자긴글자긴글자긴글자긴글자긴글자긴글자"
          position="left"
          trigger="hover"
        >
          <button>레프트</button>
        </ToolTips>
        <ToolTips
          message="zzzzzzzzzzzzzzzzzzzzzzzzz&#13;sszzzzzzzzz"
          position="right"
          trigger="hover"
        >
          <button>라이트</button>
        </ToolTips>
      </StyledD>
    </div>
  );
}

export default App;

const StyledD = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
