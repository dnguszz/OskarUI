import { createGlobalStyle } from "styled-components";
import NotoSansMedium from "./fonts/NotoSansKR-Medium.otf";

const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'Noto sans';
  src: url(${NotoSansMedium});
}
`;

export default FontStyles;
