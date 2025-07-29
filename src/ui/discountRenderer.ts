import { getDiscountProducts } from '../api/productsApi';
import { handlerAddProductToCart } from '../storage/cartStorage';
import { Product } from '../types/products';
import { renderProductModal } from './productModalRenderer';

export const populateDiscountProductsList = async (count = -1) => {
  const products = await getDiscountProducts();

  const usedProducts =
    count === -1 ? products.slice(0) : products.slice(0, count);
  const productsList = document.querySelector(
    '.discount-products-list'
  ) as HTMLElement;
  productsList.innerHTML = '';

  usedProducts.forEach(product =>
    productsList.appendChild(createPopularProductsItem(product))
  );
};

const createPopularProductsItem = ({
  _id,
  name,
  price,
  img,
}: Pick<Product, '_id' | 'name' | 'price' | 'img'>): DocumentFragment => {
  const template = document.getElementById(
    'discount-card-template'
  ) as HTMLTemplateElement;

  const clone = template.content.cloneNode(true) as DocumentFragment;

  const productItemEl = clone.querySelector(
    '.discount-products-item'
  ) as HTMLElement;
  productItemEl.addEventListener('click', () => {
    renderProductModal(_id);
  });

  const imageEl = clone.querySelector(
    '.discount-products-item-image'
  ) as HTMLImageElement;
  imageEl.src = img;
  imageEl.alt = name + ' image';

  const titleEl = clone.querySelector(
    '.discount-products-subtitle'
  ) as HTMLElement;
  titleEl.textContent = name;

  const priceEl = clone.querySelector(
    '.discount-products-item-price'
  ) as HTMLElement;
  priceEl.textContent = '$' + price;

  const buyBtnEl = clone.querySelector(
    '.discount-products-item-btn'
  ) as HTMLButtonElement;
  buyBtnEl.addEventListener(
    'click',
    async (e: MouseEvent) => await handlerAddProductToCart(e, _id)
  );

  return clone;
};
