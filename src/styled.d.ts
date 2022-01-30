// import original module declarations
import "styled-components";
import { Breakpoints, colorVariants, mediaBreakpoints, Mode } from "./types";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [key in colorVariants]: string;
    };
    mode: Mode;
    breakPoints: {
      [key in Breakpoints]: number;
    };
    mediaFor: (type: "min" | "max"| "bw", breakPoints: mediaBreakpoints) => string;
    changeMode: (mode: Mode) => void;
  }
}
