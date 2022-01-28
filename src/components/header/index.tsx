import React from "react";
import styled from "styled-components";
import DarkModeIcon from "../../assets/Dark_mode_black_36dp";
import LightModeIcon from "../../assets/Light_mode_black_24dp";
import { useActiveTheme } from "../activeThemeProvider";
import { AppContainer, boxShadow } from "../styled-components";

const Header = () => {
  const { theme, changeColorMode } = useActiveTheme();

  const handleColor = () => {
    changeColorMode(theme.mode === "dark" ? "light" : "dark");
  };
  return (
    <StyledHeader>
      <AppContainer>
        <h1>Where in the world?</h1>
        <button onClick={handleColor}>
          {theme.mode === "dark" ? (
            <>
              <LightModeIcon />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <DarkModeIcon />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </AppContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled("header")`
  height: 60px;
  background-color: var(--secondery);
  ${boxShadow}
  & > div {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
  }
  h1{
    font-size: 25px;
  }
  button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 5px 7px;
    border-radius: 3px;
    color: var(--textColor);
    fill: var(--textColor);
    cursor: pointer;
    &:hover {
      background-color: var(--primary);
      background-color: var(--primary);
    }
    svg{
      fill: inherit;
      margin-right: 10px;
    }
  }
`;

export default Header