import { createGlobalStyle } from "styled-components";
import NotoSansMedium from "src/common/fonts/NotoSansKR-Medium.otf";

const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'Noto sans';
  src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap');
}
`;

export default FontStyles;
