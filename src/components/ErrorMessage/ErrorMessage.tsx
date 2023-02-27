import { Typography } from '@mui/material';
import { ErrorMessage as FormikErrorMessage } from 'formik';

interface ErrorMesageProps {
  name: string;
}

export const ErrorMessage = ({ name }: ErrorMesageProps): JSX.Element => (
  <FormikErrorMessage name={name}>
    {(msg) => (
      <Typography display="block" variant="caption" color="red" mx="14px">
        {msg}
      </Typography>
    )}
  </FormikErrorMessage>
);
