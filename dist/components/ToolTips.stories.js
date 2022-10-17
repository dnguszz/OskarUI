var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ToolTips from "./ToolTips";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
export default {
    title: "Example/ToolTips",
    component: ToolTips,
    args: {
        message: "Lorem Ipsum",
    },
};
var Template = function (args) { return (_jsxs(StoryWrapper, { children: [_jsxs("div", { children: [_jsx("h1", { children: "hover" }), _jsx(ToolTips, __assign({}, args, { children: _jsx("div", { children: "div" }) })), _jsx(ToolTips, __assign({}, args, { children: _jsx("img", { src: "https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img-300x196.jpg", alt: "test img" }) })), _jsx(ToolTips, __assign({}, args, { children: _jsx(SearchIcon, { sx: { fontSize: 40 } }) })), _jsx(ToolTips, __assign({}, args, { children: _jsx(Button, __assign({ variant: "contained" }, { children: "ToolTip Button" })) }))] }), _jsxs("div", { children: [_jsx("h1", { children: "click" }), _jsx(ToolTips, __assign({}, args, { trigger: "click" }, { children: _jsx("div", { children: "div" }) })), _jsx(ToolTips, __assign({}, args, { trigger: "click" }, { children: _jsx("img", { src: "https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img-300x196.jpg", alt: "test img" }) })), _jsx(ToolTips, __assign({}, args, { trigger: "click" }, { children: _jsx(SearchIcon, { sx: { fontSize: 40 } }) })), _jsx(ToolTips, __assign({}, args, { trigger: "click" }, { children: _jsx(Button, __assign({ variant: "contained" }, { children: "ToolTip Button" })) }))] })] })); };
export var Primary = Template.bind({});
export var Secondary = Template.bind({});
Secondary.args = {
    theme: "secondary",
};
export var Size = function (args) {
    return (_jsxs(StoryWrapper, { children: [_jsx(ToolTips, __assign({}, args, { size: "sm" }, { children: _jsx(Button, __assign({ variant: "contained" }, { children: "SMALL" })) })), _jsx(ToolTips, __assign({}, args, { size: "md" }, { children: _jsx(Button, __assign({ variant: "contained" }, { children: "MEDIUM" })) })), _jsx(ToolTips, __assign({}, args, { size: "lg" }, { children: _jsx(Button, __assign({ variant: "contained" }, { children: "LARGE" })) }))] }));
};
export var Position = function (args) {
    return (_jsxs(StoryWrapper, { children: [_jsx(ToolTips, __assign({}, args, { position: "top" }, { children: _jsx(Button, __assign({ variant: "contained" }, { children: "TOP" })) })), _jsx(ToolTips, __assign({}, args, { position: "bottom" }, { children: _jsx(Button, __assign({ variant: "contained" }, { children: "BOTTOM" })) })), _jsx(ToolTips, __assign({}, args, { position: "left" }, { children: _jsx(Button, __assign({ variant: "contained" }, { children: "LEFT" })) })), _jsx(ToolTips, __assign({}, args, { position: "right" }, { children: _jsx(Button, __assign({ variant: "contained" }, { children: "RIGHT" })) }))] }));
};
var StoryWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  gap: 12px;\n  padding: 12px;\n"], ["\n  display: flex;\n  gap: 12px;\n  padding: 12px;\n"])));
var templateObject_1;
