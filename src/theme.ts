import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    background: {
      default: "#F0F0F0",
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
