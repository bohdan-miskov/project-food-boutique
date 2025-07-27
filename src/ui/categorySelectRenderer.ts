import { getCategories } from '../api/categoriesApi';

export const setCategoriesToSelect = async () => {
  const categories = await getCategories();
  const categotiesSelect = document.querySelector("[name='categoriesSelect']");

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.split('_').join(' ');
    categotiesSelect?.appendChild(option);
  });
};
