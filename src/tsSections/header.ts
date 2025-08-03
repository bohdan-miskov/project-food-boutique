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

const scrollBtn = <HTMLButtonElement>(
  document.querySelector('.header-scroll-btn')
);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});
