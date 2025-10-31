// Global styled-components theme typing
// Keep this file at project root and ensure tsconfig includes **/*.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      bg: string;
      surface: string;
      surfaceAlt: string;
      text: string;
      textSubtle: string;
      success: string;
      warning: string;
      danger: string;
      inputBg: string;
      border: string;
    };
    radii: { xs: string; sm: string; md: string; lg: string; xl: string; };
    spacing: { xs: string; sm: string; md: string; lg: string; xl: string; "2xl": string; };
    shadow: { sm: string; md: string; lg: string; };
    typography: {
      fontFamily: string;
      sizes: {
        xs: string; sm: string; base: string; md: string; lg: string; xl: string; "2xl": string;
      };
    };
  }
}

export {};
