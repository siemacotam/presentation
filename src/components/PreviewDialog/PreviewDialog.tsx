import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  CardContent,
  Grid,
  Card,
  Typography,
} from "@mui/material";
import { Slide, getGridWidth } from "src/global";
import CloseIcon from "@mui/icons-material/Close";
import { SlideElement } from "../SlideElement";
import { EmptyStateComponent } from "../EmptyStateComponent";

interface PreviewDialogProps {
  slide: Slide;
  handleClose: () => void;
}

export const PreviewDialog = ({
  slide,
  handleClose,
}: PreviewDialogProps): JSX.Element => (
  <Dialog fullScreen open={Boolean(slide)} onClose={handleClose} scroll="paper">
    <AppBar sx={{ position: "relative" }}>
      <Toolbar>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Preview
        </Typography>
        <IconButton color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <DialogContent>
      <Grid item xs={12} mx="auto" width="100%" maxWidth="1200px">
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              {slide.elements.length > 0 ? (
                slide.elements.map((el) => (
                  <Grid
                    key={el.id}
                    item
                    xs={12}
                    md={getGridWidth(slide.settings.perRow)}
                  >
                    <SlideElement element={el} />
                  </Grid>
                ))
              ) : (
                <EmptyStateComponent text="There are no elements to show. Please add some" />
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </DialogContent>
  </Dialog>
);
