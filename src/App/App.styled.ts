import { styled } from "@mui/material";
import theme from "src/theme";

export const AppWrapper = styled("div")({});

export const ContentWrapper = styled("div")({
  minHeight: "calc(100vh - 140px)",
  maxWidth: "1200px",
  width: "100%",
  margin: "30px auto",
});

export const StyledHeader = styled("div")({
  background: theme.palette.common.black,
  height: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const HeaderTitle = styled("span")({
  letterSpacing: "3px",
  fontSize: "30px",
  color: theme.palette.common.white,
});
