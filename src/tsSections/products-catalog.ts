import { getProductsByFilter } from '../api/productsApi';
import { createOptions } from '../utils/optionsBuilder';
import { renderCatalogProducts } from '../ui/catalogRenderer';
import {
  renderProductsPagination,
  setPaginNavButtons,
} from '../pagination/pagination';
import {
  calculateMaxPaginCount,
  calculatePerPageProductsCatalog,
} from '../utils/parametersByWidthCalculator';

let query = '';
let category = 'all';
let sort = 'popularity';
const limit = calculatePerPageProductsCatalog();
const maxPaginCount = calculateMaxPaginCount();

const handleSubmitSearch = async (e: Event) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const data = new FormData(form);
  const currentPage = 1;
  query = data.get('searchQueryInput')?.toString().trim() ?? '';
  category = data.get('categoriesSelect')?.toString() ?? 'all';
  sort = data.get('sortSelect')?.toString() ?? 'popularity';

  await searchProducts(currentPage);
};

const searchProducts = async (currentPage: number) => {
  const options = createOptions(query, category, sort, currentPage, limit);
  const response = await getProductsByFilter(options);
  const products = response.results;
  const totalPages = response.totalPages;

  renderCatalogProducts(products);
  renderProductsPagination(
    currentPage,
    totalPages,
    maxPaginCount,
    searchProducts
  );
};

document.addEventListener('DOMContentLoaded', async () => {
  const productForm = document.querySelector(
    '.filters-form'
  ) as HTMLFormElement;
  if (!productForm) return;
  productForm.addEventListener('submit', handleSubmitSearch);
  setPaginNavButtons(searchProducts);
  const data = new FormData(productForm);

  const currentPage = 1;
  query = data.get('searchQueryInput')?.toString().trim() ?? '';
  category = data.get('categoriesSelect')?.toString() ?? 'all';
  sort = data.get('sortSelect')?.toString() ?? 'popularity';

  await searchProducts(currentPage);
});
