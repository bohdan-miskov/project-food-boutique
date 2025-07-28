import { getProductById } from '../api/productsApi';
import { ProductCartInfo, ProductDetails } from '../types/products';
import { updateCartProductsCountHeader } from '../ui/headerRenderer';

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
  localStorage.setItem(CART_KEY, JSON.stringify(productArray));
};

export const handlerAddProductToCart = async (e: MouseEvent, _id: string) => {
  e.stopPropagation();
  await addProductToCart(_id);
};
