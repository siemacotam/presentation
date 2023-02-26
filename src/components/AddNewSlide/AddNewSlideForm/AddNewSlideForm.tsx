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
import { PreviewDialog } from "src/components/PreviewDialog";
import { initialElement, Slide } from "src/global";
import { AddElement } from "./AddElement";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { EmptyStateComponent } from "src/components/EmptyStateComponent";

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
    <Stack rowGap={2} mt={2}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Slide name"
                value={name}
                name="name"
                onChange={handleChange}
              />
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

      <Grid container rowGap={1}>
        {elements.length > 0 ? (
          elements.map((el) => <AddElement key={el.id} id={el.id} />)
        ) : (
          <EmptyStateComponent text="There are no elements yet" />
        )}
      </Grid>
      {openPreview && (
        <PreviewDialog
          slide={values}
          handleClose={() => setOpenPreview(false)}
        />
      )}
    </Stack>
  );
};
