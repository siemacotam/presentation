import { Element } from "src/global";
import { SlideElement } from "../SlideElement";
import { Modal, Box } from "@mui/material";

interface PreviewModalProps {
  open: boolean;
  handleClose: () => void;
  element: Element;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 0,
  p: 4,
};

export const PreviewModal = ({
  open,
  handleClose,
  element,
}: PreviewModalProps): JSX.Element => (
  <Modal open={open} onClose={handleClose}>
    <Box sx={style}>
      <SlideElement element={element} />
    </Box>
  </Modal>
);
