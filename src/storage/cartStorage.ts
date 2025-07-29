import { getProductById } from '../api/productsApi';
import { ProductCartInfo, ProductDetails } from '../types/products';
import {
  populateCartProductsList,
  updateCartProductsCountCart,
} from '../ui/cartRenderer';
import { updateCartProductsCountHeader } from '../ui/headerRenderer';
import { setSumOrder } from '../ui/orderRenderer';
import { calculateSumOrder } from '../utils/orderSumCalculator';

const CART_KEY = 'cart';

const getShortenedProduct = (product: ProductDetails): ProductCartInfo => {
  return {
    _id: product._id,
    name: product.name,
    category: product.category,
    size: product.size,
    is10PercentOff: product.is10PercentOff,
    price: product.price,
    img: product.img,
    count: 1,
  };
};

export const getCartFromStorage = (): ProductCartInfo[] => {
  const rawData = localStorage.getItem(CART_KEY);

  if (!rawData) return [];

  try {
    const parsed = JSON.parse(rawData);
    if (!Array.isArray(parsed)) return [];

    return parsed as ProductCartInfo[];
  } catch {
    localStorage.removeItem(CART_KEY);
    return [];
  }
};

export const setCartToStorage = (cart: ProductCartInfo[]) => {
  if (!cart || !Array.isArray(cart)) cart = [];

  try {
    const stringify = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, stringify);
  } catch {
    const stringify = JSON.stringify([]);
    localStorage.setItem(CART_KEY, stringify);
  }
};

const addProductToCart = async (id: string) => {
  const product = await getProductById(id);
  const productShortInfo = getShortenedProduct(product);
  const productArray = getCartFromStorage();
  const equalProduct = productArray.find(
    ({ _id }) => _id === productShortInfo._id
  );

  if (!equalProduct) {
    updateCartProductsCountHeader(productArray.length + 1);
    productArray.push(productShortInfo);
  } else {
    equalProduct.count++;
  }
  setCartToStorage(productArray);
};

export const handlerAddProductToCart = async (e: MouseEvent, _id: string) => {
  e.stopPropagation();
  await addProductToCart(_id);
};

const deleteProductFromCart = async (deleteId: string) => {
  const productArray = getCartFromStorage();
  const filteredProducts = productArray.filter(({ _id }) => _id !== deleteId);

  if (filteredProducts) {
    updateCartProductsCountHeader(filteredProducts.length);
    updateCartProductsCountCart(filteredProducts.length);
    const total = calculateSumOrder(filteredProducts);
    setSumOrder(total);
    await populateCartProductsList(filteredProducts);
    setCartToStorage(filteredProducts);
  }
};

export const handlerDeleteProductFromCart = async (_id: string) => {
  await deleteProductFromCart(_id);
};

export const deleteAllProductsFromCart = async () => {
  updateCartProductsCountHeader(0);
  updateCartProductsCountCart(0);
  await populateCartProductsList([]);
  setCartToStorage([]);
};

export const handlerDeleteAllProductsFromCart = async () => {
  await deleteAllProductsFromCart();
};

const setCountOfProductToCart = (productId: string, newCount: number) => {
  const productArray = getCartFromStorage();
  productArray.forEach(product => {
    if (product._id === productId) {
      product.count = newCount;
    }
  });

  if (productArray) {
    const total = calculateSumOrder(productArray);
    setSumOrder(total);
    setCartToStorage(productArray);
  }
};

export const handlerSetCountOfProductToCart = (e: Event, _id: string) => {
  const target = e.target as HTMLInputElement | HTMLSelectElement;
  setCountOfProductToCart(_id, parseInt(target.value));
};
