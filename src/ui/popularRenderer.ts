import { getPopularProducts } from '../api/productsApi';
import { handlerAddProductToCart } from '../storage/cartStorage';
import { Product } from '../types/products';
import { renderProductModal } from './productModalRenderer';

export const populatePopularProductsList = async (count = -1) => {
  const products = await getPopularProducts();
  const usedProducts =
    count === -1 ? products.slice(0) : products.slice(0, count);
  const popularProductsList = document.querySelector(
    '.popular-products-list'
  ) as HTMLElement;
  popularProductsList.innerHTML = '';

  usedProducts.forEach(product =>
    popularProductsList.appendChild(createPopularProductsItem(product))
  );
};

const createPopularProductsItem = ({
  _id,
  name,
  category,
  size,
  popularity,
  img,
}: Omit<Product, 'price' | 'is10PercentOff'>): DocumentFragment => {
  const template = document.getElementById(
    'popular-card-template'
  ) as HTMLTemplateElement;

  const clone = template.content.cloneNode(true) as DocumentFragment;

  const productItemEl = clone.querySelector(
    '.popular-products-item'
  ) as HTMLElement;
  productItemEl.addEventListener('click', () => {
    renderProductModal(_id);
  });

  const imageEl = clone.querySelector(
    '.popular-products-item-image'
  ) as HTMLImageElement;
  imageEl.src = img;
  imageEl.alt = name + ' image';

  const titleEl = clone.querySelector(
    '.popular-products-subtitle'
  ) as HTMLElement;
  titleEl.textContent = name;

  const valuesEls = clone.querySelectorAll(
    '.popular-products-item-descr-item-value'
  ) as NodeListOf<HTMLElement>;
  valuesEls[0].textContent = category.split('_').join(' ');
  valuesEls[1].textContent = size;
  valuesEls[2].textContent = String(popularity);

  const buyBtnEl = clone.querySelector(
    '.popular-products-item-btn'
  ) as HTMLButtonElement;
  buyBtnEl.addEventListener(
    'click',
    async (e: MouseEvent) => await handlerAddProductToCart(e, _id)
  );

  return clone;
};
