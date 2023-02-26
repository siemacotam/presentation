import {
  Page,
  Text,
  View,
  Font,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { Slide } from "src/global";

interface PdfProps {
  slide: Slide;
}

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});
Font.register({
  family: "Material Icons",
  src: "https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/4.0.0/font/MaterialIcons-Regular.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: "40px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: {
    fontFamily: "Material Icons",
  },
});

const getElementWidth = (number: number) => {
  switch (number) {
    case 1:
      return "100%";
    case 2:
      return "50%";
    case 3:
      return "33.3%";
    case 4:
      return "25%";
    default:
      return "100%";
  }
};

export const SlidePdf = ({ slide: { elements, settings } }: PdfProps) => {
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={styles.container}>
          {elements.map((el) => (
            <View style={{ width: getElementWidth(settings.perRow) }}>
              <Text
                style={{
                  fontFamily: "Material Icons",
                  fontSize: `${el.icon.size}`,
                  textAlign: "center",
                }}
              >
                {el.icon.value}
              </Text>
              <Text
                style={{
                  fontSize: `${el.title.size}`,
                  textAlign: "center",
                }}
              >
                {el.title.value}
              </Text>
              <Text
                style={{
                  fontSize: `${el.subtitle.size}`,
                  textAlign: "center",
                }}
              >
                {el.subtitle.value}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
