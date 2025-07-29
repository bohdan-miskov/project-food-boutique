export const updateCartProductsCountHeader = (count: number) => {
  const valueEl = document.querySelector(
    '.header-cart-info-value'
  ) as HTMLElement;
  valueEl.textContent = count.toString();
};
