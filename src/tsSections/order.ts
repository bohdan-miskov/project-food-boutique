import { checkoutOrder } from '../api/productsApi';
import {
  getCartFromStorage,
  handlerDeleteAllProductsFromCart,
} from '../storage/cartStorage';
import { ProductCartInfo, ProductRequest } from '../types/products';
import { openModal } from '../ui/modals';

const handleOrderSubmit = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);
  const products = getCartFromStorage();
  const reqProducts = createRequestBody(products);
  try {
    const response = await checkoutOrder(
      reqProducts,
      data.get('userOrderEmail') as string
    );
    const backdrop = document.querySelector(
      '.order-success-modal-backdrop'
    ) as HTMLElement;
    handlerDeleteAllProductsFromCart();
    openModal(backdrop);
  } catch {
  } finally {
    form.reset();
  }
};

const createRequestBody = (products: ProductCartInfo[]): ProductRequest[] => {
  return products.map(({ _id, count, price }) => {
    return {
      productId: _id,
      amount: count * price,
    };
  });
};

const orderForm = document.querySelector<HTMLFormElement>('.order-form');
if (!orderForm) {
  throw new Error('Order form is not found.');
}
orderForm.addEventListener('submit', handleOrderSubmit);
