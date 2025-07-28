import { getProductById } from '../api/productsApi';
import { handlerAddProductToCart } from '../storage/cartStorage';
import { ProductDetails } from '../types/products';
import { openModal } from './modals';

export const renderProductModal = async (id: string) => {
  const product = await getProductById(id);
  const modalBackdrop = document.querySelector(
    '.product-modal-backdrop'
  ) as HTMLElement;
  modalBackdrop.innerHTML = '';
  modalBackdrop.appendChild(createProductModal(product));
  openModal(modalBackdrop);
};

const createProductModal = ({
  _id,
  img,
  name,
  category,
  desc,
  size,
  price,
  popularity,
  is10PercentOff,
}: ProductDetails) => {
  const template = document.getElementById(
    'product-modal-template'
  ) as HTMLTemplateElement;

  const clone = template.content.cloneNode(true) as DocumentFragment;

  if (is10PercentOff) {
    const itemEl = clone.querySelector('.product-modal-window') as HTMLElement;
    itemEl.classList.add('is-discount');
  }

  const imageEl = clone.querySelector(
    '.product-modal-image'
  ) as HTMLImageElement;

  imageEl.src = img;
  imageEl.alt = name + ' image';

  const titleEl = clone.querySelector('.product-modal-title') as HTMLElement;
  titleEl.textContent = name;

  const valuesEl = clone.querySelectorAll(
    '.product-modal-descr-item-value'
  ) as NodeListOf<HTMLElement>;
  valuesEl[0].textContent = category.split('_').join(' ');
  valuesEl[1].textContent = size;
  valuesEl[2].textContent = popularity.toString();

  const descEl = clone.querySelector(
    '.product-modal-descr-text'
  ) as HTMLElement;
  descEl.textContent = desc;

  const priceEl = clone.querySelector('.product-modal-price') as HTMLElement;
  priceEl.textContent = '$' + price;

  const buyBtnEl = clone.querySelector(
    '.product-modal-btn'
  ) as HTMLButtonElement;
  buyBtnEl.addEventListener(
    'click',
    async (e: MouseEvent) => await handlerAddProductToCart(e, _id)
  );

  return clone;
};
