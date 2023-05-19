export const isEmpty = (val: unknown) => {
  return (
    typeof val === 'undefined' ||
    val === null ||
    (typeof val === 'object' && Object.keys(val).length === 0) ||
    (typeof val === 'string' && val.trim() === '')
  );
};