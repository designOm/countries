import React from "react";
import { Outlet } from "react-router-dom";
import { useActiveTheme } from "../components/activeThemeProvider";
import { AppContainer, StyledHeader } from "../components/styled-componetns";

const Header = () => {
  const { theme, changeColorMode } = useActiveTheme();

  const handleColor = () => {
    console.log("is Out from component");
    changeColorMode(theme.mode === "dark" ? "light" : "dark");
  };
  return (
    <StyledHeader>
      <AppContainer>Header</AppContainer>
      <button onClick={handleColor}>
        {theme.mode === "dark" ? "Light" : "Dark"}
      </button>
    </StyledHeader>
  );
};

export const AppLayout = () => {
  return (
    <div id="countries-app">
      <Header />
      <Outlet />
    </div>
  );
};
