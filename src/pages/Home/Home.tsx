import { useState, MouseEvent } from "react";
import {
  Button,
  Stack,
  Typography,
  Grid,
  IconButton,
  Box,
  CardContent,
  Divider,
  MenuItem,
  Menu,
  Card,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Slide } from "src/global";
import { EmptyStateComponent, PreviewDialog, SlidePdf } from "src/components";
import { deleteSlide } from "src/store/reducers/slidesReducer/slidesReducer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import * as S from "./Home.styled";
import { exportSlideElement } from "./Home.helpers";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const Home = () => {
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
  const slides = useAppSelector((store) => store.slides.slides);
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
    <Stack rowGap={3}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate("/add")}
      >
        Add new slide
      </Button>
      <Card variant="outlined">
        <CardContent>
          <Stack rowGap={3}>
            <Typography variant="h5" component="h5">
              Your slides
            </Typography>
            <Divider />
            <Grid container spacing={2}>
              {slides.length > 0 ? (
                slides.map((slide) => (
                  <Grid key={slide.id} item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Stack direction="row" spacing={2}>
                            <TextSnippetIcon />
                            <Typography>{slide.name}</Typography>
                          </Stack>
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
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              {menuOptions(slide).map(
                                ({ label, action, icon }) => (
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
                                )
                              )}

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
                                    "Ładuje dokument..."
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
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <EmptyStateComponent text="You have not created any slide yet" />
              )}
            </Grid>
          </Stack>
        </CardContent>
      </Card>
      {preview && (
        <PreviewDialog slide={preview} handleClose={() => setPreview(null)} />
      )}
    </Stack>
  );
};
