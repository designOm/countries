import { createGlobalStyle } from "styled-components";
import { colorVariants } from "./types";

const GlobalStyleSheet = createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
:root{
  ${(props) =>
    Object.keys(props.theme.colors).map(
      (colorName) =>
        `--${colorName}:${props.theme.colors[colorName as colorVariants]};`
    )}
}
body{
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--primary);
  color:var(--textColor);
}
`;

export default GlobalStyleSheet;
