import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "src/store/hooks";
import theme from "src/theme";
import { IconsDialogProps } from "./IconsDialog.types";

export const IconsDialog = ({
  open,
  handleClose,
  handleIconPick,
  initialValues,
}: IconsDialogProps): JSX.Element => {
  const [search, setSearch] = useState("");
  const [icons, setIcons] = useState<string[]>([]);
  const [size, setSize] = useState(initialValues.size);
  const [picked, setPicked] = useState(initialValues.value);
  const iconsList = useAppSelector((store) => store.slides.icons);

  useEffect(() => {
    if (!search) {
      setIcons(iconsList);
      return;
    }
    setIcons(iconsList.filter((el) => el.includes(search)));
  }, [search, iconsList]);

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
        <Stack rowGap={2}>
          <TextField
            fullWidth
            label="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>{size}px</Typography>
            <Slider
              value={size}
              step={10}
              marks
              min={30}
              max={60}
              onChange={handleChangeSize}
            />
          </Stack>
          <Stack direction="row" flexWrap="wrap">
            {icons.map((el) => (
              <Box
                key={el}
                sx={{
                  background:
                    picked === el
                      ? theme.palette.grey[300]
                      : theme.palette.common.white,
                }}
              >
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
