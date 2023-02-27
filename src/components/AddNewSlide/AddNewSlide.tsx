import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { Form, FormikProvider, useFormik } from "formik";
import { Slide, initialSlide } from "src/global";
import { nanoid } from "@reduxjs/toolkit";
import { AddNewSlideForm } from "./AddNewSlideForm/AddNewSlideForm";
import {
  Button,
  Grid,
  Stack,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  addSlide,
  editSlide,
} from "src/store/reducers/slidesReducer/slidesReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { AddElement } from "./AddNewSlideForm/AddElement";
import { EmptyStateComponent, ErrorMessage } from "src/components";
import { validationSchema } from "./AddNewSlide.const";
import { AddNewSlideProps } from "./AddNewSlide.types";

export const AddNewSlide = ({ edit }: AddNewSlideProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const slides = useAppSelector((store) => store.slides.slides);

  const location = useLocation();
  const id = location.pathname.replace("/edit/", "");
  const elementToEdit = slides.find((el) => el.id === id);

  const formik = useFormik<Slide>({
    initialValues: elementToEdit || { ...initialSlide, id: nanoid() },
    validationSchema,
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

  const { elements } = formik.values;

  return (
    <Grid item xs={12}>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} id="addBrickForm">
          <AddNewSlideForm />
          <Card variant="outlined">
            <CardContent>
              <Grid container rowGap={1}>
                {elements.length > 0 ? (
                  elements.map((el) => <AddElement key={el.id} id={el.id} />)
                ) : (
                  <>
                    <EmptyStateComponent text="No slide added yet" />
                    <ErrorMessage name="elements" />
                  </>
                )}
              </Grid>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                mt={3}
              >
                <Button variant="outlined" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" form="addBrickForm">
                  {edit ? "Edit" : "Add"}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Form>
      </FormikProvider>
    </Grid>
  );
};
