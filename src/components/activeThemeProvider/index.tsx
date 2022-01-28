import {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { defaultTheme } from "../../theme";
import { Mode } from "../../types";

interface activeTheme {
  theme: DefaultTheme;
  changeColorMode: (mode: Mode) => void;
}

type activeThemeProvideProps = {
  theme: DefaultTheme;
  children: React.ReactNode;
};

export const ActiveThemeContext = createContext<activeTheme>({
  theme: defaultTheme,
  changeColorMode: () => {},
});

export const ActiveThemeProvider = ({
  theme: defaultTheme,
  children,
}: activeThemeProvideProps) => {
  const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);

  const changeColorMode = useCallback((mode: Mode) => {
    console.log("recived in context wih mode::::", mode);
    setTheme((prevTheme: DefaultTheme) => {
      prevTheme.changeMode(mode);
      localStorage.setItem("activeTheme", JSON.stringify(prevTheme));
      return { ...prevTheme };
    });
  }, []);

  useEffect(() => {
    const currentTheme = localStorage.getItem("activeTheme");
    if (currentTheme != null) {
      setTheme((prevTheme: DefaultTheme) => ({
        ...prevTheme,
        ...(JSON.parse(currentTheme) as DefaultTheme),
      }));
    }
  }, []);

  return (
    <ActiveThemeContext.Provider value={{ theme, changeColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ActiveThemeContext.Provider>
  );
};

export const useActiveTheme = () => {
  const { theme, changeColorMode } = useContext(ActiveThemeContext);
  return { theme, changeColorMode };
};
