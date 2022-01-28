import { DefaultTheme } from "styled-components";
import { Breakpoints, colorVariants, Mode } from "./types";

const LightColors: { [key in colorVariants]: string } = {
  primary: "#fff",
  secondery: "#fafafa",
  success: "green",
  textColor:"#111214",
  error: "yellow",
  warning: "red",
};
const darkColors: { [key in colorVariants]: string } = {
  primary: "#202d36",
  secondery: "#2b3743",
  textColor:"#ffffff",
  success: "green",
  error: "yellow",
  warning: "red",
};

export const defaultTheme: DefaultTheme = {
  mode: "light",
  colors: { ...LightColors },
  breakPoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },

  mediaFor: function (type: "min" | "max", breakPoint: Breakpoints): string {
    return `@media (${type}-width: ${
      type === "min"
        ? this.breakPoints[breakPoint]
        : this.breakPoints[breakPoint] - 1
    }px)`;
  },

  changeMode: function (mode: Mode) {
    this.mode = mode;
    if (mode === "dark") {
      this.colors = { ...darkColors };
    } else {
      this.colors = { ...LightColors };
    }
  },
};
