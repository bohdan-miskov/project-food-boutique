import { getDiscountProducts } from '../api/productsApi';
import { Product } from '../type/products';

export const populateDiscountProductsList = async (count = -1) => {
  const products = await getDiscountProducts();

  const usedProducts =
    count === -1 ? products.slice(0) : products.slice(0, count);
  const productsList = document.querySelector(
    '.discount-products-list'
  ) as HTMLElement;

  usedProducts.forEach(product =>
    productsList.appendChild(createPopularProductsItem(product))
  );
};

const createPopularProductsItem = ({
  name,
  price,
  img,
}: Pick<Product, 'name' | 'price' | 'img'>): DocumentFragment => {
  const template = document.getElementById(
    'discount-card-template'
  ) as HTMLTemplateElement;

  const clone = template.content.cloneNode(true) as DocumentFragment;

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

  return clone;
};
