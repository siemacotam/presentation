import { Slide } from "src/global";
import { HTMLSlide } from "./HTMLSlide";

export function exportSlideElement(slide: Slide) {
  const fileData = HTMLSlide({ slide });
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "slide.html";
  link.href = url;
  link.click();
}
