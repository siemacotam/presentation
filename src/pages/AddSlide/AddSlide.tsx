import { Card, CardContent } from "@mui/material";
import { AddNewSlide } from "src/components";

interface AddSlideProps {
  edit?: boolean;
}

export const AddSlide = ({ edit }: AddSlideProps): JSX.Element => (
  <Card variant="outlined">
    <CardContent>
      <AddNewSlide edit={edit} />
    </CardContent>
  </Card>
);
