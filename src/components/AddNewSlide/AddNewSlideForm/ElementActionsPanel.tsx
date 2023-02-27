import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Stack, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { ElementActionsPanelProps } from "../AddNewSlide.types";

const iconSize = { fontSize: "18px" };

export const ElementActionsPanel = ({
  isFirst,
  isLast,
  changeOrder,
  deleteElement,
  openModal,
}: ElementActionsPanelProps) => (
  <Stack direction="row" spacing={1}>
    <IconButton onClick={openModal}>
      <ZoomInIcon sx={iconSize} />
    </IconButton>
    <IconButton onClick={deleteElement}>
      <DeleteIcon sx={iconSize} />
    </IconButton>
    {!isFirst && (
      <IconButton onClick={() => changeOrder(true)}>
        <ArrowUpwardIcon sx={iconSize} />
      </IconButton>
    )}
    {!isLast && (
      <IconButton onClick={() => changeOrder(false)}>
        <ArrowDownwardIcon sx={iconSize} />
      </IconButton>
    )}
  </Stack>
);
