import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    background: {
      default: "#F0F0F0",
    },
    primary: {
      light: "#F0FFFF",
      main: "#0096FF",
      dark: "#0047AB",
      contrastText: "#fffbf8",
    },
    secondary: {
      light: "#fffbf8",
      main: "#fff4eb",
      dark: "#fdd9bc",
      contrastText: "#FA8220",
    },
  },
  typography: {
    fontFamily:
      '"Oswald","Roboto", "Helvetica", "Arial", sans-serif !important',
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingBottom: "16px !important",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
