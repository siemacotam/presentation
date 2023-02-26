import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Stack, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

interface ElementActionsPanelProps {
  isFirst: boolean;
  isLast: boolean;
  changeOrder: (up: boolean) => void;
  deleteElement: () => void;
  openModal: () => void;
}

export const ElementActionsPanel = ({
  isFirst,
  isLast,
  changeOrder,
  deleteElement,
  openModal,
}: ElementActionsPanelProps) => (
  <Stack direction="row" spacing={1}>
    <IconButton onClick={openModal}>
      <ZoomInIcon sx={{ fontSize: "16px" }} />
    </IconButton>
    <IconButton onClick={deleteElement}>
      <DeleteIcon sx={{ fontSize: "16px" }} />
    </IconButton>
    {!isFirst && (
      <IconButton onClick={() => changeOrder(true)}>
        <ArrowUpwardIcon sx={{ fontSize: "16px" }} />
      </IconButton>
    )}
    {!isLast && (
      <IconButton onClick={() => changeOrder(false)}>
        <ArrowDownwardIcon sx={{ fontSize: "16px" }} />
      </IconButton>
    )}
  </Stack>
);
