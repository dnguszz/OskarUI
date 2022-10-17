import React, { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import FontStyles from "../common/style";

export interface IToolTips {
  children: React.ReactElement;
  message: string;
  position?: Position; //기본값 top
  trigger?: Trigger; //기본값 hover
  theme?: Theme; //기본값 primary
  size?: Size; //기본값 md
}

interface PropsType {
  position: string;
  theme: string;
  size: string;
}

type Position = "top" | "bottom" | "left" | "right";
type Trigger = "hover" | "click";
type Theme = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

function ToolTips({
  children,
  message,
  position = "top",
  trigger = "hover",
  theme = "primary",
  size = "md",
}: IToolTips) {
  const [child, setChild] = useState<React.ReactElement>();
  const [visible, setVisible] = useState<boolean>(false);

  const targetRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    let clonedChild;
    if (trigger === "click") {
      clonedChild = React.cloneElement(children, {
        ref: targetRef,
      });
      //click이벤트 등록
    } else {
      clonedChild = React.cloneElement(children, {
        onMouseOver: () => setVisible(true),
        onMouseLeave: () => setVisible(false),
      });
    }
    setChild(clonedChild);
  }, []); //트리거 종류에따라 visible 변하는 함수 내용 변경

  useEffect(() => {
    if (trigger !== "click") return;
    const handleClickOutside = (e: MouseEvent) => {
      //이 조건에서 클릭이 내부인지 확인
      if (targetRef.current.contains(e.target as Node)) {
        //툴팁을 띄울 타겟을 클릭했을때
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [targetRef, trigger]);

  return (
    <>
      <FontStyles />
      <TooltipsWrapper>
        {child}
        {visible && (
          <MessageWrapper position={position} theme={theme} size={size}>
            {message}
          </MessageWrapper>
        )}
      </TooltipsWrapper>
    </>
  );
}

export default ToolTips;

const getPosition = (position: string) => {
  switch (position) {
    case "top":
      return css`
        top: 0;
        left: 50%;
        transform: translate(-50%, calc(-100% - 12px));
      `;

    case "bottom":
      return css`
        top: 100%;
        left: 50%;
        transform: translate(-50%, 12px);
      `;

    case "left":
      return css`
        top: 50%;
        left: 0;
        transform: translate(calc(-100% - 12px), -50%);
      `;

    case "right":
      return css`
        top: 50%;
        left: 100%;
        transform: translate(12px, -50%);
      `;

    default:
      return null;
  }
};

const getTheme = (theme: string) => {
  switch (theme) {
    case "primary":
      return css`
        background-color: #f2f2f2;
        color: #424242;
      `;

    case "secondary":
      return css`
        background-color: rgba(0, 0, 0, 0.4);
        color: #f2f2f2;
      `;
    default:
      return null;
  }
};

const getSize = (size: string) => {
  switch (size) {
    case "sm":
      return css`
        font-size: 12px;
      `;
    case "md":
      return css`
        font-size: 16px;
      `;
    case "lg":
      return css`
        font-size: 22px;
      `;
    default:
      return null;
  }
};

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const TooltipsWrapper = styled.div`
  font-family: "Noto sansB";
  width: fit-content;
  height: fit-content;
  position: relative;
  border: 1px solid red;
`;

const MessageWrapper = styled.div<PropsType>`
  padding: 16px;
  position: absolute;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-family: "Noto sans";
  cursor: default;
  animation: ${fadeIn} 0.15s linear;
  ${(props) => getPosition(props.position)}
  ${(props) => getTheme(props.theme)}
  ${(props) => getSize(props.size)}
`;
