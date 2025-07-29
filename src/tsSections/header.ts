import { getCartFromStorage } from '../storage/cartStorage';
import { updateCartProductsCountHeader } from '../ui/headerRenderer';

const initializeCartProductsCountHeader = () => {
  const productArray = getCartFromStorage();
  updateCartProductsCountHeader(productArray.length);
};

document.addEventListener(
  'DOMContentLoaded',
  initializeCartProductsCountHeader
);
