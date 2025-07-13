import axios from 'axios';
import { OptionsApi, Product, ProductsResponse } from '../type/products';

export const getDiscountProducts = async () => {
  const response = await axios.get<Product[]>(
    'https://food-boutique.b.goit.study/api/products/discount'
  );

  return response.data;
};

export const getPopularProducts = async () => {
  const response = await axios.get<Product[]>(
    'https://food-boutique.b.goit.study/api/products/popular'
  );

  return response.data;
};

export const getProductsByFilter = async (options: OptionsApi) => {
  const response = await axios.get<ProductsResponse>(
    'https://food-boutique.b.goit.study/api/products',
    { params: options }
  );
  return response.data;
};
