import styled from "styled-components";

export const StyledHeader = styled("header")`
  height: 60px;
`;
export const AppContainer = styled("div")`
  max-width: 100%;
  margin: 0 auto;
  ${(props) => props.theme.mediaFor("min", "sm")} {
    max-width: 540px;
  }
  ${(props) => props.theme.mediaFor("min", "md")} {
    max-width: 720px;
  }
  ${(props) => props.theme.mediaFor("min", "lg")} {
    max-width: 960px;
  }
  ${(props) => props.theme.mediaFor("min", "xl")} {
    max-width: 1140px;
  }
  ${(props) => props.theme.mediaFor("min", "xxl")} {
    max-width: 1320px;
  }
`;
