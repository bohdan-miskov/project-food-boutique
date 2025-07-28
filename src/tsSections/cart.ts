import { getCartFromStorage } from '../storage/cartStorage';
import {
  populateCartProductsList,
  updateCartProductsCountCart,
} from '../ui/cartRenderer';

const initializeCartProductsCountCart = () => {
  const productArray = getCartFromStorage();
  updateCartProductsCountCart(productArray.length);
};

initializeCartProductsCountCart();
await populateCartProductsList();
