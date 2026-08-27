export const getAdminPageWindow = (page: number, totalPages: number) => {
  const start = Math.max(1, Math.min(page - 1, Math.max(totalPages - 2, 1)));
  const end = Math.min(totalPages, start + 2);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};
