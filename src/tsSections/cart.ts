import {
  getCartFromStorage,
  handlerDeleteAllProductsFromCart,
} from '../storage/cartStorage';
import {
  populateCartProductsList,
  updateCartProductsCountCart,
} from '../ui/cartRenderer';
import { setSumOrder } from '../ui/orderRenderer';
import { calculateSumOrder } from '../utils/orderSumCalculator';

const initializeDeleteAllBtn = () => {
  const deleteAllBTn = document.querySelector<HTMLButtonElement>(
    '.cart-products-delete-all-btn'
  );
  if (deleteAllBTn) {
    deleteAllBTn.addEventListener('click', handlerDeleteAllProductsFromCart);
  }
};

const initializeProductsCart = async () => {
  const productArray = getCartFromStorage();
  updateCartProductsCountCart(productArray.length);
  initializeDeleteAllBtn();
  await populateCartProductsList(productArray);
  const sum = calculateSumOrder(productArray);
  setSumOrder(sum);
};

document.addEventListener(
  'DOMContentLoaded',
  async () => await initializeProductsCart()
);
