import { Element, Slide } from "../types";

export const initialSlide: Slide = {
  id: "",
  name: "",
  elements: [],
  settings: {
    perRow: 3,
  },
};

export const initialElement: Element = {
  id: "",
  icon: {
    value: "",
    size: 30,
  },
  title: {
    value: "",
    size: 16,
  },
  subtitle: {
    value: "",
    size: 16,
  },
};
