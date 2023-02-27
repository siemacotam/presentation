import {
  Button,
  Grid,
  Slider,
  Stack,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { useFormikContext } from "formik";
import { useState } from "react";
import { initialElement, Slide } from "src/global";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ErrorMessage, PreviewDialog } from "src/components";

export const AddNewSlideForm = () => {
  const [openPreview, setOpenPreview] = useState(false);
  const { values, setFieldValue, handleChange } = useFormikContext<Slide>();

  const {
    elements,
    name,
    settings: { perRow },
  } = values;

  const handleChangePerRow = (_: Event, newValue: number | number[]) => {
    setFieldValue("settings.perRow", newValue as number);
  };

  const addNewElement = () =>
    setFieldValue("elements", [
      ...elements,
      { ...initialElement, id: nanoid() },
    ]);

  return (
    <Stack rowGap={2} my={3}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography component="span" variant="h5">
                Main settings
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Slide name"
                value={name}
                name="name"
                onChange={handleChange}
              />
              <ErrorMessage name="name" />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Elements per row </Typography>
              <Stack direction="row" spacing={2}>
                <Typography>{perRow}</Typography>
                <Slider
                  value={perRow}
                  step={1}
                  marks
                  min={1}
                  max={4}
                  onChange={handleChangePerRow}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={addNewElement}
                >
                  Add element
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ZoomInIcon />}
                  onClick={() => setOpenPreview(true)}
                >
                  Open preview
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {openPreview && (
        <PreviewDialog
          slide={values}
          handleClose={() => setOpenPreview(false)}
        />
      )}
    </Stack>
  );
};
