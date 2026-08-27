export const toggleArrayParam = <T extends string>(
  current: T[] | undefined,
  value: T,
): T[] | undefined => {
  const arr = current ?? [];
  const result = arr.includes(value)
    ? arr.filter((c) => c !== value)
    : [...arr, value];
  return result.length > 0 ? result : undefined;
};
