import ReactDOMServer from "react-dom/server";
import { Grid } from "@mui/material";
import { SlideElement } from "src/components";
import { getGridWidth, Slide } from "src/global";

interface HTMLSlideProps {
  slide: Slide;
}

export const HTMLSlide = ({ slide }: HTMLSlideProps): string => {
  const htmlString = ReactDOMServer.renderToString(
    <Grid container mx="auto" width="100%" maxWidth="1200px" spacing={2}>
      {slide.elements.map((el) => (
        <Grid key={el.id} item xs={12} md={getGridWidth(slide.settings.perRow)}>
          <SlideElement element={el} />
        </Grid>
      ))}
    </Grid>
  );

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
  </head>
  <body>
      ${htmlString}
  </body>
  </html>`;
};
