export const toggleArrayParam = <T extends string>(
  current: T[] | undefined,
  value: T,
): T[] => {
  const arr = current ?? [];
  return arr.includes(value) ? arr.filter((c) => c !== value) : [...arr, value];
};
