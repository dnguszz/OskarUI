import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { css, keyframes } from "styled-components";
import WebFont from "webfontloader";

export interface ITooltip {
  children: React.ReactElement;
  message: string;
  position?: Position;
  trigger?: Trigger;
  theme?: Theme;
  size?: Size;
}

interface PropsType {
  position: string;
  theme: string;
  size: string;
  targetRect: DOMRect;
}

export type Position = "top" | "bottom" | "left" | "right";
export type Trigger = "hover" | "click";
export type Theme = "primary" | "secondary";
export type Size = "sm" | "md" | "lg";

WebFont.load({
  google: {
    families: ["Noto Sans KR", "sans-serif"],
  },
});

export function Tooltip({
  children,
  message,
  position = "bottom",
  trigger = "hover",
  theme = "primary",
  size = "md",
}: ITooltip) {
  const [child, setChild] = useState<React.ReactElement>();
  const [visible, setVisible] = useState<boolean>(false);

  const targetRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const clonedChild = React.cloneElement(children!, {
      ref: targetRef,
    });
    setChild(clonedChild);
  }, [children]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      e.stopPropagation();
      setVisible(targetRef.current.contains(e.target as Node));
    };
    const handleHover = (flag: boolean) => {
      setVisible(flag);
    };
    if (trigger === "hover") {
      targetRef.current?.addEventListener("mouseenter", () =>
        handleHover(true)
      );
      targetRef.current?.addEventListener("mouseleave", () =>
        handleHover(false)
      );
      //targetRef => child를 참조하는 요소가 없으므로 이벤트 제거 안함.(보충 팔요)
    } else {
      document.addEventListener("click", handleClickOutside);
      return () => {
        console.log("remove event");
        document.removeEventListener("click", handleClickOutside);
      };
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [child]);

  return (
    <>
      {child}
      {visible &&
        ReactDOM.createPortal(
          <MessageWrapper
            position={position}
            theme={theme}
            size={size}
            targetRect={targetRef.current.getBoundingClientRect()}
          >
            {message}
          </MessageWrapper>,
          document.body
        )}
    </>
  );
}

export default Tooltip;

const getPosition = (position: string, targetRect: DOMRect) => {
  const padding = 12;

  switch (position) {
    case "top":
      return css`
        top: ${targetRect.top}px;
        left: ${targetRect.left}px;
        transform: translate(
          calc(${targetRect.width / 2}px - 50%),
          calc(-100% - ${padding}px)
        );
      `;

    case "bottom":
      return css`
        top: ${targetRect.top}px;
        left: ${targetRect.left}px;
        transform: translate(
          calc(${targetRect.width / 2}px - 50%),
          ${targetRect.height + padding}px
        );
      `;

    case "left":
      return css`
        top: ${targetRect.top}px;
        left: ${targetRect.left}px;
        transform: translate(
          calc(-100% - ${padding}px),
          calc(${targetRect.height / 2}px - 50%)
        );
      `;

    case "right":
      return css`
        top: ${targetRect.top}px;
        left: ${targetRect.left}px;
        transform: translate(
          ${targetRect.width + padding}px,
          calc(${targetRect.height / 2}px - 50%)
        );
      `;

    default:
      return;
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
        background-color: rgba(0, 0, 0, 0.6);
        color: #f2f2f2;
      `;
    default:
      return;
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
      return;
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
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-family: "Noto Sans KR";
  cursor: default;
  animation: ${fadeIn} 0.15s linear;
  z-index: 100;
  ${(props) => getPosition(props.position, props.targetRect)}
  ${(props) => getTheme(props.theme)}
  ${(props) => getSize(props.size)}
`;
