import { createTheme } from "@mui/material/styles";
import lightModeBackground from "../assets/lightModeBackground.webp";
// import darkModeBackground from "../assets/darkModeBackground.png";

// Light theme configuration
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6200EE", // Purple
    },
    secondary: {
      main: "#03DAC6", // Turquoise
    },
    background: {
      default: lightModeBackground, // Light Grey
      paper: "#a9c8d0", // White
    },
    text: {
      primary: "#333333", // Dark Grey
      secondary: "#666666", // Light Grey
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

// Dark theme configuration
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BB86FC", // Lavender
    },
    secondary: {
      main: "#03DAC6", // Turquoise
    },
    background: {
      default: "#121212", // Dark Grey
      paper: "#1E1E1E", // Charcoal
    },
    text: {
      primary: "#FFFFFF", // White
      secondary: "#CCCCCC", // Light Grey
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});
