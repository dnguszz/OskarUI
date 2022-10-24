import React, { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import WebFont from "webfontloader";

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
  ref: any;
}

type Position = "top" | "bottom" | "left" | "right";
type Trigger = "hover" | "click";
type Theme = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

WebFont.load({
  google: {
    families: ["Noto Sans KR", "sans-serif"],
  },
});

export function ToolTips({
  children,
  message,
  position = "bottom",
  trigger = "hover",
  theme = "primary",
  size = "md",
}: IToolTips) {
  const [child, setChild] = useState<React.ReactElement>();
  const [visible, setVisible] = useState<boolean>(false);

  const targetRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const messageRef = useRef() as React.MutableRefObject<HTMLDivElement>;

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
        ref: targetRef,
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

  useEffect(() => {
    if (!visible) return;

    let correctionX: number = 0;
    let correctionY: number = 0;
    const padding: number = 12;

    let targetLeft = targetRef.current.offsetLeft;
    let targetTop = targetRef.current.offsetTop;

    if (targetRef.current.offsetWidth === undefined) {
      targetLeft = targetRef.current.getBoundingClientRect().left;
      targetTop = targetRef.current.getBoundingClientRect().top;
    }

    switch (position) {
      case "top":
        correctionX =
          targetRef.current.clientWidth / 2 -
          messageRef.current.clientWidth / 2;
        correctionY = -messageRef.current.clientHeight - padding;
        break;
      case "bottom":
        correctionX =
          targetRef.current.clientWidth / 2 -
          messageRef.current.clientWidth / 2;
        correctionY = targetRef.current.clientHeight + padding;
        break;
      case "left":
        correctionX = -messageRef.current.clientWidth - padding;
        correctionY =
          targetRef.current.clientHeight / 2 -
          messageRef.current.clientHeight / 2;
        break;
      case "right":
        correctionX = targetRef.current.clientWidth + padding;
        correctionY =
          targetRef.current.clientHeight / 2 -
          messageRef.current.clientHeight / 2;
        break;
      default:
        break;
    }

    messageRef.current.style.transform = `translate(${
      targetLeft + correctionX
    }px, ${targetTop + correctionY}px)`;
  }, [visible]);

  return (
    <>
      {child}
      {visible && (
        <MessageWrapper
          position={position}
          theme={theme}
          size={size}
          ref={messageRef}
        >
          {message}
        </MessageWrapper>
      )}
    </>
  );
}

export default ToolTips;

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

const MessageWrapper = styled.div<PropsType>`
  padding: 16px;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-family: "Noto Sans KR";
  cursor: default;
  animation: ${fadeIn} 0.15s linear;
  z-index: 100;
  ${(props) => getTheme(props.theme)}
  ${(props) => getSize(props.size)}
`;
