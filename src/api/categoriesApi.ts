import axios from 'axios';

export const getCategories = async () => {
  const response = await axios.get<string[]>(
    'https://food-boutique.b.goit.study/api/products/categories'
  );
  return response.data;
};
