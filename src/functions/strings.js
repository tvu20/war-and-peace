export const capitalizeFirstLetter = (str) => {
  const string = str.toLowerCase();

  return string.charAt(0).toUpperCase() + string.slice(1);
};
