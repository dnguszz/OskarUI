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
  position: Position;
  theme: Theme;
  size: Size;
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
    if (trigger !== "click") return;
    const handleClickOutside = (e: MouseEvent) => {
      e.stopPropagation();
      setVisible(targetRef.current.contains(e.target as Node));
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [child]);

  useEffect(() => {
    if (trigger !== "hover") return;
    const handleHover = (e: MouseEvent, flag: boolean) => {
      e.stopPropagation();
      setVisible(flag);
    };

    targetRef.current?.addEventListener("mouseover", (e) =>
      handleHover(e, true)
    );
    targetRef.current?.addEventListener("mouseout", (e) =>
      handleHover(e, false)
    );
    return () => {
      targetRef.current?.removeEventListener("mouseover", (e) =>
        handleHover(e, true)
      );
      targetRef.current?.removeEventListener("mouseout", (e) =>
        handleHover(e, false)
      );
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
            className="OuiTooltip"
          >
            {message}
          </MessageWrapper>,
          document.body
        )}
    </>
  );
}

export default Tooltip;

const getPosition = (position: Position, targetRect: DOMRect) => {
  const padding = 12;

  switch (position) {
    case "bottom":
    default:
      return css`
        transform: translate(
          calc(${targetRect.width / 2}px - 50%),
          ${targetRect.height + padding}px
        );
      `;

    case "top":
      return css`
        transform: translate(
          calc(${targetRect.width / 2}px - 50%),
          calc(-100% - ${padding}px)
        );
      `;

    case "left":
      return css`
        transform: translate(
          calc(-100% - ${padding}px),
          calc(${targetRect.height / 2}px - 50%)
        );
      `;

    case "right":
      return css`
        transform: translate(
          ${targetRect.width + padding}px,
          calc(${targetRect.height / 2}px - 50%)
        );
      `;
  }
};

const getTheme = (theme: Theme) => {
  switch (theme) {
    case "primary":
    default:
      return css`
        background-color: #f2f2f2;
        color: #424242;
      `;

    case "secondary":
      return css`
        background-color: rgba(0, 0, 0, 0.6);
        color: #f2f2f2;
      `;
  }
};

const getSize = (size: Size) => {
  switch (size) {
    case "sm":
      return css`
        font-size: 12px;
      `;
    case "md":
    default:
      return css`
        font-size: 16px;
      `;
    case "lg":
      return css`
        font-size: 22px;
      `;
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
  top: ${(props) => `${props.targetRect.top}px`};
  left: ${(props) => `${props.targetRect.left}px`};
  ${(props) => getPosition(props.position, props.targetRect)}
  ${(props) => getTheme(props.theme)}
  ${(props) => getSize(props.size)}
`;
