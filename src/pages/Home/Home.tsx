import {
  Button,
  Stack,
  Typography,
  Grid,
  CardContent,
  Divider,
  Card,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { EmptyStateComponent } from "src/components";
import { SlideMenu } from "./components/Menu";

export const Home = () => {
  const navigate = useNavigate();
  const slides = useAppSelector((store) => store.slides.slides);

  return (
    <Stack rowGap={3}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate("/add")}
      >
        Add new slide
      </Button>
      <Card variant="outlined">
        <CardContent>
          <Stack rowGap={3}>
            <Typography variant="h5" component="h5">
              Your slides
            </Typography>
            <Divider />
            <Grid container spacing={2}>
              {slides.length > 0 ? (
                slides.map((slide) => (
                  <Grid key={slide.id} item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Stack direction="row" spacing={2}>
                            <TextSnippetIcon />
                            <Typography>{slide.name}</Typography>
                          </Stack>
                          <SlideMenu slide={slide} />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <EmptyStateComponent text="You have not created any slide yet" />
              )}
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
