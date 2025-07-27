import axios from 'axios';
import {
  OptionsApi,
  Product,
  ProductDetails,
  ProductsResponse,
} from '../types/products';

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

export const getProductById = async (id: string) => {
  const response = await axios.get<ProductDetails>(
    `https://food-boutique.b.goit.study/api/products/${id}`
  );
  return response.data;
};
