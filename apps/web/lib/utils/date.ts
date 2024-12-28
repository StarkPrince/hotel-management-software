export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};

export const isValidDate = (date: string | Date): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};