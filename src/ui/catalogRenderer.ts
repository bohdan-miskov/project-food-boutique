import { Product } from '../types/products';
import { renderProductModal } from './productModalRenderer';

export const renderCatalogProducts = (products: Product[]) => {
  const productList = document.querySelector('.products-list') as HTMLElement;
  productList.innerHTML = '';
  const productEmptyContainerEl = document.querySelector(
    '.products-empty-container'
  ) as HTMLElement;

  if (products.length === 0) {
    productEmptyContainerEl.classList.remove('hidden');
    return;
  }

  productEmptyContainerEl.classList.add('hidden');

  products.forEach(product =>
    productList.appendChild(createCatalogProductsItem(product))
  );
};

const createCatalogProductsItem = ({
  _id,
  img,
  name,
  category,
  size,
  price,
  popularity,
  is10PercentOff,
}: Product) => {
  const template = document.getElementById(
    'products-card-template'
  ) as HTMLTemplateElement;

  const clone = template.content.cloneNode(true) as DocumentFragment;

  const productItemEl = clone.querySelector('.products-item') as HTMLElement;
  productItemEl.addEventListener('click', () => {
    renderProductModal(_id);
  });

  if (is10PercentOff) {
    const itemEl = clone.querySelector('.products-item') as HTMLElement;
    itemEl.classList.add('is-discount');
  }

  const imageEl = clone.querySelector(
    '.products-item-image'
  ) as HTMLImageElement;
  imageEl.src = img;
  imageEl.alt = name + ' image';

  const titleEl = clone.querySelector('.products-subtitle') as HTMLElement;
  titleEl.textContent = name;

  const valuesEl = clone.querySelectorAll(
    '.products-item-descr-item-value'
  ) as NodeListOf<HTMLElement>;
  valuesEl[0].textContent = category.split('_').join(' ');
  valuesEl[1].textContent = size;
  valuesEl[2].textContent = popularity.toString();

  const priceEl = clone.querySelector('.products-item-price') as HTMLElement;
  priceEl.textContent = '$' + price;

  return clone;
};
