export const setSumOrder = (sum: number) => {
  const valueEl = document.querySelector<HTMLElement>('.order-price-sum-value');
  if (!valueEl) {
    throw new Error('Order price element is not found');
  }

  valueEl.textContent = '$' + sum.toFixed(2);
};
