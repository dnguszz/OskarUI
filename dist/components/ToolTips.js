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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import WebFont from "webfontloader";
WebFont.load({
    google: {
        families: ["Noto Sans KR", "sans-serif"],
    },
});
export function ToolTips(_a) {
    var children = _a.children, message = _a.message, _b = _a.position, position = _b === void 0 ? "bottom" : _b, _c = _a.trigger, trigger = _c === void 0 ? "hover" : _c, _d = _a.theme, theme = _d === void 0 ? "primary" : _d, _e = _a.size, size = _e === void 0 ? "md" : _e;
    var _f = useState(), child = _f[0], setChild = _f[1];
    var _g = useState(false), visible = _g[0], setVisible = _g[1];
    var targetRef = useRef();
    var messageRef = useRef();
    useEffect(function () {
        var clonedChild;
        if (trigger === "click") {
            clonedChild = React.cloneElement(children, {
                ref: targetRef,
            });
            //click이벤트 등록
        }
        else {
            clonedChild = React.cloneElement(children, {
                onMouseOver: function () { return setVisible(true); },
                onMouseLeave: function () { return setVisible(false); },
                ref: targetRef,
            });
        }
        setChild(clonedChild);
    }, []); //트리거 종류에따라 visible 변하는 함수 내용 변경
    useEffect(function () {
        if (trigger !== "click")
            return;
        var handleClickOutside = function (e) {
            //이 조건에서 클릭이 내부인지 확인
            if (targetRef.current.contains(e.target)) {
                //툴팁을 띄울 타겟을 클릭했을때
                setVisible(true);
            }
            else {
                setVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [targetRef, trigger]);
    useEffect(function () {
        if (!visible)
            return;
        var correctionX = 0;
        var correctionY = 0;
        var padding = 12;
        var targetLeft = targetRef.current.offsetLeft;
        var targetTop = targetRef.current.offsetTop;
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
        messageRef.current.style.transform = "translate(".concat(targetLeft + correctionX, "px, ").concat(targetTop + correctionY, "px)");
    }, [visible]);
    return (_jsxs(_Fragment, { children: [child, visible && (_jsx(MessageWrapper, __assign({ position: position, theme: theme, size: size, ref: messageRef }, { children: message })))] }));
}
export default ToolTips;
var getTheme = function (theme) {
    switch (theme) {
        case "primary":
            return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        background-color: #f2f2f2;\n        color: #424242;\n      "], ["\n        background-color: #f2f2f2;\n        color: #424242;\n      "])));
        case "secondary":
            return css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        background-color: rgba(0, 0, 0, 0.4);\n        color: #f2f2f2;\n      "], ["\n        background-color: rgba(0, 0, 0, 0.4);\n        color: #f2f2f2;\n      "])));
        default:
            return null;
    }
};
var getSize = function (size) {
    switch (size) {
        case "sm":
            return css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        font-size: 12px;\n      "], ["\n        font-size: 12px;\n      "])));
        case "md":
            return css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        font-size: 16px;\n      "], ["\n        font-size: 16px;\n      "])));
        case "lg":
            return css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        font-size: 22px;\n      "], ["\n        font-size: 22px;\n      "])));
        default:
            return null;
    }
};
var fadeIn = keyframes(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  from{\n    opacity: 0;\n  }\n  to{\n    opacity: 1;\n  }\n"], ["\n  from{\n    opacity: 0;\n  }\n  to{\n    opacity: 1;\n  }\n"])));
var MessageWrapper = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  padding: 16px;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n  font-family: \"Noto Sans KR\";\n  cursor: default;\n  animation: ", " 0.15s linear;\n  z-index: 100;\n  ", "\n  ", "\n"], ["\n  padding: 16px;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n  font-family: \"Noto Sans KR\";\n  cursor: default;\n  animation: ", " 0.15s linear;\n  z-index: 100;\n  ", "\n  ", "\n"])), fadeIn, function (props) { return getTheme(props.theme); }, function (props) { return getSize(props.size); });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
