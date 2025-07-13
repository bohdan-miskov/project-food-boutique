export const generatePaginationArray = (
  current: number,
  total: number,
  max: number
): number[] => {
  const pages: number[] = [];

  let start = Math.max(1, current - 1);
  let end = start + max - 2;

  if (end > total) {
    end = total;
    start = Math.max(1, end - max + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (pages.length + 1 == total) {
    pages.push(end + 1);
  }

  return pages;
};
