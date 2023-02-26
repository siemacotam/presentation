import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { Form, FormikProvider, useFormik } from "formik";
import { Slide, initialSlide } from "src/global";
import { nanoid } from "@reduxjs/toolkit";
import { AddNewSlideForm } from "./AddNewSlideForm/AddNewSlideForm";
import { Button, Grid, Stack } from "@mui/material";
import {
  addSlide,
  editSlide,
} from "src/store/reducers/slidesReducer/slidesReducer";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

interface AddNewSlideProps {
  edit?: boolean;
}

export const AddNewSlide = ({ edit }: AddNewSlideProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const slides = useAppSelector((store) => store.slides.slides);

  const location = useLocation();
  const id = location.pathname.replace("/edit/", "");
  const elementToEdit = slides.find((el) => el.id === id);

  const formik = useFormik<Slide>({
    initialValues: elementToEdit || { ...initialSlide, id: nanoid() },
    // validationSchema: validationSchema(t),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  if (edit && !elementToEdit) {
    return <Typography>Wrong slide id</Typography>;
  }

  const handleSubmit = (values: Slide) => {
    if (edit) {
      dispatch(editSlide(values));
    } else {
      dispatch(addSlide(values));
    }

    formik.resetForm();
    navigate("/");
  };

  return (
    <Grid item xs={12}>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} id="addBrickForm">
          <AddNewSlideForm />
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" form="addBrickForm">
              {edit ? "Edit" : "Add"}
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </Grid>
  );
};
