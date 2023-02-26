import { styled } from "@mui/material";
import theme from "src/theme";

export const AppWrapper = styled("div")({
  minHeight: "100vh",
  maxWidth: "1200px",
  width: "100%",
  margin: "0 auto",
});

export const StyledHeader = styled("div")({
  background: theme.palette.common.black,
  height: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  marginBottom: "30px",
});

export const HeaderTitle = styled("span")({
  letterSpacing: "3px",
  fontSize: "30px",
  color: "white",
});
