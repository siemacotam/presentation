export interface Slide {
  id: string;
  name: string;
  elements: Element[];
  settings: Settings;
}

export interface Element {
  id: string;
  icon: Details;
  title: Details;
  subtitle: Details;
}

export interface Details {
  value: string;
  size: number;
}

export interface Settings {
  perRow: 1 | 2 | 3 | 4;
}
