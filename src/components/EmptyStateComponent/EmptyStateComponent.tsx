import { Grid, Card, CardContent, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface EmptyStateComponentProps {
  text: string;
}

export const EmptyStateComponent = ({
  text,
}: EmptyStateComponentProps): JSX.Element => (
  <Grid item xs={12}>
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <InfoIcon />
          <Typography>{text}</Typography>
        </Stack>
      </CardContent>
    </Card>
  </Grid>
);
