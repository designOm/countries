import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface BackdropProps extends HTMLAttributes<HTMLOrSVGElement> {
  transparent?: boolean;
}

export const boxShadow = css`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.24);
`;
export const inputSurface = css`
  background-color: var(--secondery);
  color: var(--textColor);
  font-size: 1rem;
  height: 40px;
  min-width: 120px;
  border-radius: 5px;
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

export const Backdrop = styled("div")<BackdropProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${(props) =>
    props.transparent ? "transparent" : "rgba(0 ,0,0,0.24)"};
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 200ms;
  z-index: 1100;
`;
