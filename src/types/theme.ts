export type Breakpoints = "md" | "sm" | "lg" | "xl" | "xxl";
export type Mode = "light" | "dark";

export type colorVariants =
  | "primary"
  | "secondery"
  | "textColor"
  | "success"
  | "warning"
  | "error";

export type Colors = {
  [key in colorVariants]: string;
};