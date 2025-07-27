export const calculateMaxPaginCount = (): number => {
  const container = document.querySelector('.container') as HTMLElement;
  const width = container.getBoundingClientRect().width;

  if (width >= 768) {
    return 5;
  }
  return 3;
};

export const calculatePerPageProductsCatalog = (): number => {
  const container = document.querySelector('.container') as HTMLElement;
  const width = container.getBoundingClientRect().width;

  if (width >= 1440) {
    return 9;
  }
  if (width >= 768) {
    return 8;
  }
  return 6;
};
