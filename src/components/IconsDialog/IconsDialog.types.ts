import { Details } from "src/global";

export interface IconsDialogProps {
  open: boolean;
  handleClose: () => void;
  handleIconPick: (value: string, size: number) => void;
  initialValues: Details;
}
