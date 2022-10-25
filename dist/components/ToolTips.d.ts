import React from "react";
export interface IToolTips {
    children: React.ReactElement;
    message: string;
    position?: Position;
    trigger?: Trigger;
    theme?: Theme;
    size?: Size;
}
declare type Position = "top" | "bottom" | "left" | "right";
declare type Trigger = "hover" | "click";
declare type Theme = "primary" | "secondary";
declare type Size = "sm" | "md" | "lg";
export declare function ToolTips({ children, message, position, trigger, theme, size, }: IToolTips): JSX.Element;
export default ToolTips;
