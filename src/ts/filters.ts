import axios from 'axios';

const setCategoriesToSelect = async () => {
  const categories = await getCategories();
  const categotiesSelect = document.querySelector(
    "[name='filters-categories-select']"
  );

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categotiesSelect?.appendChild(option);
  });
};

const getCategories = async () => {
  const response = await axios.get<string[]>(
    'https://food-boutique.b.goit.study/api/products/categories'
  );
  return response.data;
};

setCategoriesToSelect();
