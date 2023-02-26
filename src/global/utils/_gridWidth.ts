export const getGridWidth = (number: 1 | 2 | 3 | 4) => {
  switch (number) {
    case 1:
      return 12;
    case 2:
      return 6;
    case 3:
      return 4;
    case 4:
      return 3;
    default:
      return 12;
  }
};
