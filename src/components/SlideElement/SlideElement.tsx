import { Box, Stack, Typography } from "@mui/material";
import { Element } from "src/global";

interface SlideElementProps {
  element: Element;
}

export const SlideElement = ({
  element: { icon, title, subtitle },
}: SlideElementProps): JSX.Element => (
  <Stack
    flexWrap="wrap"
    height="100%"
    justifyContent="center"
    alignItems="center"
  >
    <Box component="span" fontSize={icon.size} className="material-icons">
      {icon.value}
    </Box>
    <Typography sx={{ fontSize: title.size, wordBreak: "break-all" }}>
      {title.value}
    </Typography>
    <Typography
      variant="caption"
      sx={{ fontSize: subtitle.size, wordBreak: "break-all" }}
    >
      {subtitle.value}
    </Typography>
  </Stack>
);
