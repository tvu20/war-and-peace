// receives an array of data and returns the minimum and maximum values.
export const findBounds = (arr) => {
  if (!Array.isArray(arr)) return;
  const data = arr.flat();
  if (data.length === 0) return [-0, 0];

  let minValue = data[0][0];
  let maxValue = data[0][1];

  for (const elem of data) {
    if (elem[0] < minValue) minValue = elem[0];
    if (elem[1] > maxValue) maxValue = elem[1];
  }

  return [minValue, maxValue];
};

// receives bar graph data and returns highest value
export const findMaxY = (arr) => {
  if (!Array.isArray(arr)) return;

  let maxValue = 0;
  for (const item of arr) {
    if (item.amount > maxValue) maxValue = item.amount;
  }
  return maxValue;
};
