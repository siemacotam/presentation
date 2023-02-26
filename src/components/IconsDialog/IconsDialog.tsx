import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Details, names } from "src/global";

interface IconsDialogProps {
  open: boolean;
  handleClose: () => void;
  handleIconPick: (value: string, size: number) => void;
  initialValues: Details;
}

export const IconsDialog = ({
  open,
  handleClose,
  handleIconPick,
  initialValues,
}: IconsDialogProps) => {
  const [search, setSearch] = useState("");
  const [icons, setIcons] = useState<string[]>([]);
  const [size, setSize] = useState(initialValues.size);
  const [picked, setPicked] = useState(initialValues.value);

  useEffect(() => {
    if (!search) {
      setIcons(names);
      return;
    }
    setIcons(names.filter((el) => el.includes(search)));
  }, [search]);

  const handleChangeSize = (_: Event, newValue: number | number[]) => {
    setSize(newValue as number);
  };

  const savePick = () => {
    handleIconPick(picked, size);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      PaperProps={{ sx: { height: "70%", width: "80%" } }}
    >
      <DialogTitle>Pick icon</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Slider
          value={size}
          step={10}
          marks
          min={30}
          max={60}
          onChange={handleChangeSize}
        />
        <Stack direction="row" flexWrap="wrap">
          {icons.map((el) => (
            <Box key={el} sx={{ background: picked === el ? "red" : "white" }}>
              <Box
                component="span"
                onClick={() => setPicked(el)}
                fontSize={size}
                className="material-icons"
              >
                {el}
              </Box>
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button variant="contained" onClick={savePick}>
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};
