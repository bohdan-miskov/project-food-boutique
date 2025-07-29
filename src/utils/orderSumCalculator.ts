import { ProductCartInfo } from '../types/products';

export const calculateSumOrder = (products: ProductCartInfo[]) => {
  return products.reduce((sum, { price, count }) => sum + price * count, 0);
};
