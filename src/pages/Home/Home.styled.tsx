import { styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import HtmlIcon from "@mui/icons-material/Html";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const styles = {
  fontSize: "25px",
  color: "black",
  paddingRight: "10px",
};

export const StyledEditIcon = styled(EditIcon)(styles);
export const StyledDeleteIcon = styled(DeleteIcon)(styles);
export const StyledPreviewIcon = styled(ZoomInIcon)(styles);
export const StyledHTMLIcon = styled(HtmlIcon)(styles);
export const StyledPDFIcon = styled(PictureAsPdfIcon)(styles);
