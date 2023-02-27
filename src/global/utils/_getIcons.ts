export const getIconsNames = async (
  setIconsList: (icons: string[]) => void
) => {
  const icons = await fetch(
    "https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints"
  ).then((response) => response.text());

  const iconNames = icons.split("\n").map((line) => line.split(" ")[0]);
  setIconsList(iconNames);
};
