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
import Modal from "@mui/material/Modal";
import { useFormikContext } from "formik";
import { useState } from "react";
import { IconsDialog } from "src/components/IconsDialog";
import { SlideElement } from "src/components/SlideElement";
import { Slide } from "src/global";
import { ElementActionsPanel } from "./ElementActionsPanel";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface AddElementProps {
  id: string;
}

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
                <Typography>
                  {elements[index].icon.value
                    ? `${elements[index].icon.value}(${elements[index].icon.size}
                  px)`
                    : "Not selected"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack rowGap={2}>
                <TextField
                  size="small"
                  fullWidth
                  label="Title"
                  value={elements[index].title.value}
                  name={`elements[${index}].title.value`}
                  onChange={handleChange}
                />

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="caption">
                    {elements[index].title.size}px
                  </Typography>
                  <Slider
                    value={elements[index].title.size}
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
                  value={elements[index].subtitle.value}
                  name={`elements[${index}].subtitle.value`}
                  onChange={handleChange}
                />

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="caption">
                    {elements[index].subtitle.size}px
                  </Typography>
                  <Slider
                    value={elements[index].subtitle.size}
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
          initialValues={elements[index].icon}
        />
      )}
      {openModal && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={style}>
            <SlideElement element={elements[index]} />
          </Box>
        </Modal>
      )}
    </Grid>
  );
};
