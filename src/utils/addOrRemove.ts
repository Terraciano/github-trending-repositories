export const addOrRemove = (
  shouldRemove: boolean,
  item: number,
  arr: Array<number>
): Array<number> => {
  return shouldRemove ? arr.filter((val) => val !== item) : arr.concat(item);
};
