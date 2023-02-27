import {
  Button,
  Grid,
  Slider,
  TextField,
  Stack,
  CardContent,
  Card,
  Box,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";
import { ErrorMessage, IconsDialog } from "src/components/";
import { PreviewModal } from "src/components/PreviewModal/PreviewModal";
import { Slide } from "src/global";
import { AddElementProps } from "../AddNewSlide.types";
import { ElementActionsPanel } from "./ElementActionsPanel";

export const AddElement = ({ id }: AddElementProps) => {
  const [iconsDialog, setIconsDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {
    values: { elements },
    handleChange,
    setFieldValue,
  } = useFormikContext<Slide>();

  const index = elements.findIndex((el) => el.id === id);

  const handleIconPick = (value: string, size: number) =>
    setFieldValue(`elements[${index}].icon`, { value, size });

  const handleChangeTitleSize = (_: Event, newValue: number | number[]) => {
    setFieldValue(`elements[${index}].title.size`, newValue as number);
  };

  const handleChangeSubtitleSize = (_: Event, newValue: number | number[]) => {
    setFieldValue(`elements[${index}].subtitle.size`, newValue as number);
  };

  const changeOrder = (up: boolean) => {
    const array = [...elements];
    array.splice(up ? index - 1 : index + 1, 0, array.splice(index, 1)[0]);
    setFieldValue("elements", array);
  };

  const deleteElement = () => {
    setFieldValue(
      "elements",
      elements.filter((el) => el.id !== id)
    );
  };

  const activeElement = elements[index];

  return (
    <Grid item xs={12} container>
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Stack rowGap={2}>
                <Button
                  variant="contained"
                  onClick={() => setIconsDialog(true)}
                >
                  Pick icon
                </Button>
                <ErrorMessage name={`elements[${index}].icon.value`} />
                {activeElement.icon.value ? (
                  <Box
                    component="span"
                    fontSize={activeElement.icon.size}
                    className="material-icons"
                  >
                    {activeElement.icon.value}
                  </Box>
                ) : (
                  <Typography>Not selected</Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack rowGap={2}>
                <TextField
                  size="small"
                  fullWidth
                  label="Title"
                  value={activeElement.title.value}
                  name={`elements[${index}].title.value`}
                  onChange={handleChange}
                />
                <ErrorMessage name={`elements[${index}].title.value`} />
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="caption">
                    {activeElement.title.size}px
                  </Typography>
                  <Slider
                    value={activeElement.title.size}
                    step={1}
                    marks
                    min={16}
                    max={30}
                    onChange={handleChangeTitleSize}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack rowGap={2}>
                <TextField
                  size="small"
                  fullWidth
                  label="Subtitle"
                  value={activeElement.subtitle.value}
                  name={`elements[${index}].subtitle.value`}
                  onChange={handleChange}
                />
                <ErrorMessage name={`elements[${index}].subtitle.value`} />
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="caption">
                    {activeElement.subtitle.size}px
                  </Typography>
                  <Slider
                    value={activeElement.subtitle.size}
                    step={1}
                    marks
                    min={10}
                    max={20}
                    onChange={handleChangeSubtitleSize}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Stack alignItems="center" width="100%">
                <ElementActionsPanel
                  isFirst={index === 0}
                  changeOrder={changeOrder}
                  isLast={index === elements.length - 1}
                  deleteElement={deleteElement}
                  openModal={() => setOpenModal(true)}
                />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {iconsDialog && (
        <IconsDialog
          open={iconsDialog}
          handleClose={() => setIconsDialog(false)}
          handleIconPick={handleIconPick}
          initialValues={activeElement.icon}
        />
      )}
      {openModal && (
        <PreviewModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          element={activeElement}
        />
      )}
    </Grid>
  );
};
