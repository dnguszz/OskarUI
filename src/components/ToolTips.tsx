import React, { useState, useEffect, useRef } from "react";
import "./ToolTips.css";

export interface IToolTips {
  children: React.ReactElement;
  message: string;
  position?: Position; //기본값 top
  trigger?: Trigger; //기본값 hover
  theme?: Theme; //기본값 primary
  size?: Size; //기본값 md
}

type Position = "top" | "bottom" | "left" | "right";
type Trigger = "hover" | "click";
type Theme = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

export function ToolTips({
  children,
  message,
  position = "bottom",
  trigger = "hover",
  theme = "primary",
  size = "md",
}: IToolTips) {
  const [child, setChild] = useState<React.ReactElement>();
  const [key, setKey] = useState<string>("");

  const targetRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const uniqueKey = Math.floor(Math.random() * 100000).toString();
    setKey("OUI-".concat(uniqueKey));
  }, []);

  useEffect(() => {
    if (key === "") return;
    let clonedChild;
    if (trigger === "click") {
      clonedChild = React.cloneElement(children, {
        ref: targetRef,
      });
      //click이벤트 등록
    } else {
      clonedChild = React.cloneElement(children, {
        onMouseOver: () => openHandler(),
        onMouseLeave: () => closeHandler(),
        ref: targetRef,
      });
    }
    setChild(clonedChild);
  }, [key]); //트리거 종류에따라 visible 변하는 함수 내용 변경

  useEffect(() => {
    if (key === "" || trigger !== "click") return;
    const handleClickOutside = (e: MouseEvent) => {
      //이 조건에서 클릭이 내부인지 확인
      if (targetRef.current.contains(e.target as Node)) {
        //툴팁을 띄울 타겟을 클릭했을때
        openHandler();
      } else {
        closeHandler();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [targetRef, trigger, key]);

  const openHandler = () => {
    let ToolTipComponent = document.createElement("div");
    ToolTipComponent.classList.add("OskarTooltip", `${key}`);
    ToolTipComponent.textContent = message;
    document.body.appendChild(ToolTipComponent);

    getTheme(ToolTipComponent, theme);
    getSize(ToolTipComponent, size);
    getPosition(ToolTipComponent, position);

    //body에 툴팁 추가
  };

  const closeHandler = () => {
    //body에 툴팁 제거
    document.querySelectorAll(`.${key}`).forEach((el) => el.remove());
  };

  const getTheme = (el: HTMLDivElement, theme: string) => {
    let backgroundColor = "#f2f2f2";
    let color = "#424242"; //default is primary
    switch (theme) {
      case "primary":
        backgroundColor = "#f2f2f2";
        color = "#424242";
        break;

      case "secondary":
        backgroundColor = "rgba(0, 0, 0, 0.4)";
        color = "#f2f2f2";
        break;
      default:
        return null;
    }

    el.style.backgroundColor = backgroundColor;
    el.style.color = color;
  };

  const getSize = (el: HTMLDivElement, size: string) => {
    let fontSize = "16px"; //default is md
    switch (size) {
      case "sm":
        fontSize = "12px";
        break;
      case "md":
        fontSize = "16px";
        break;
      case "lg":
        fontSize = "22px";
        break;
      default:
        return null;
    }

    el.style.fontSize = fontSize;
  };

  const getPosition = (el: HTMLDivElement, position: string) => {
    const padding = 12;
    const rect = targetRef.current.getBoundingClientRect();

    let correctionX;
    let correctionY;

    switch (position) {
      case "top":
        correctionX = rect.width / 2 - el.clientWidth / 2;
        correctionY = -el.clientHeight - padding;
        break;
      case "bottom":
        correctionX = rect.width / 2 - el.clientWidth / 2;
        correctionY = rect.height + padding;
        break;
      case "left":
        correctionX = -el.clientWidth - padding;
        correctionY = rect.height / 2 - el.clientHeight / 2;
        break;
      case "right":
        correctionX = rect.width + padding;
        correctionY = rect.height / 2 - el.clientHeight / 2;
        break;
      default:
        return null;
    }

    el.style.transform = `translate(${rect.left + correctionX}px, ${
      rect.top + correctionY
    }px)`;
  };
  return <>{child}</>;
}

export default ToolTips;
