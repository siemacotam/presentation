import { useState, MouseEvent } from "react";
import { IconButton, Box, MenuItem, Menu } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store/hooks";
import { Slide } from "src/global";
import { PreviewDialog, SlidePdf } from "src/components";
import { deleteSlide } from "src/store/reducers/slidesReducer/slidesReducer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import * as S from "../Home.styled";
import { exportSlideElement } from "../Home.helpers";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface SlideMenuProps {
  slide: Slide;
}

export const SlideMenu = ({ slide }: SlideMenuProps) => {
  const [preview, setPreview] = useState<Slide | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const menuOptions = (slide: Slide) => [
    {
      icon: <S.StyledEditIcon />,
      label: "Edit",
      action: () => navigate(`/edit/${slide.id}`),
    },
    {
      icon: <S.StyledDeleteIcon />,
      label: "Delete",
      action: () => dispatch(deleteSlide(slide.id)),
    },
    {
      icon: <S.StyledPreviewIcon />,
      label: "Preview",
      action: () => setPreview(slide),
    },
    {
      icon: <S.StyledHTMLIcon />,
      label: "Download as HTML",
      action: () => exportSlideElement(slide),
    },
  ];

  return (
    <>
      <Box>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {menuOptions(slide).map(({ label, action, icon }) => (
            <MenuItem
              key={label}
              onClick={() => {
                action();
                handleClose();
              }}
            >
              {icon}
              {label}
            </MenuItem>
          ))}

          <PDFDownloadLink
            document={<SlidePdf slide={slide} />}
            fileName={`${slide.name}.pdf`}
            style={{
              color: "black",
              textDecoration: "none",
              fontSize: "0.8rem",
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading document"
              ) : (
                <MenuItem onClick={() => handleClose()}>
                  <S.StyledPDFIcon />
                  Download as PDF
                </MenuItem>
              )
            }
          </PDFDownloadLink>
        </Menu>
      </Box>
      {preview && (
        <PreviewDialog slide={preview} handleClose={() => setPreview(null)} />
      )}
    </>
  );
};
