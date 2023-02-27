import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Required"),
  elements: yup
    .array(
      yup.object().shape({
        icon: yup.object().shape({
          value: yup.string().required("Required"),
        }),
        title: yup.object().shape({
          value: yup.string().required("Required"),
        }),
        subtitle: yup.object().shape({
          value: yup.string().required("Required"),
        }),
      })
    )
    .min(1, "At least one item needs to be here")
    .required("At least one item needs to be here"),
});
