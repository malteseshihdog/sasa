import { Theme } from "@material-ui/core";

export const StyleUtils = {
  primaryGradient: (theme: Theme) => `linear-gradient(270deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  primaryGradientInversed: (theme: Theme) => `linear-gradient(270deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  primaryGradientHover: (theme: Theme) => `linear-gradient(270deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  warningGradient: "linear-gradient(90deg, #FFA800 0%, #FF5107 100%)",
  purpleGradient: "linear-gradient(90deg, #B6F4FD 45.4%, #943EB7 80.52%, #3D2347 130.74%)",
  boxShadow: (theme: Theme) => `0px 0px 16px ${theme.palette.shadow}`,
};