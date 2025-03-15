"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Màu chính
    },
    secondary: {
      main: "#FFC107", // Màu phụ
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Font mặc định
  },
});

export const CustomThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
