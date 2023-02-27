export interface AddNewSlideProps {
  edit?: boolean;
}

export interface ElementActionsPanelProps {
  isFirst: boolean;
  isLast: boolean;
  changeOrder: (up: boolean) => void;
  deleteElement: () => void;
  openModal: () => void;
}

export interface AddElementProps {
  id: string;
}
