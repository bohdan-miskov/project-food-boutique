import {
  handlerDeleteProductFromCart,
  handlerSetCountOfProductToCart,
} from '../storage/cartStorage';
import { ProductCartInfo } from '../types/products';
import { debounceFunction } from '../utils/debounce';

const hideCart = () => {
  const productsContainer = document.querySelector('.cart-products-container');
  if (productsContainer) {
    productsContainer.classList.add('hidden');
  }
  const orderContainer = document.querySelector<HTMLElement>('.order');
  if (orderContainer) {
    orderContainer.classList.add('hidden');
  }
  const epmtyContainer = document.querySelector<HTMLElement>(
    '.cart-products-empty-container'
  );
  if (epmtyContainer) {
    epmtyContainer.classList.remove('hidden');
  }
};

const showCart = () => {
  const epmtyContainer = document.querySelector<HTMLElement>(
    '.cart-products-empty-container'
  );
  if (epmtyContainer) {
    epmtyContainer.classList.add('hidden');
  }
  const productsContainer = document.querySelector('.cart-products-container');
  if (productsContainer) {
    productsContainer.classList.remove('hidden');
  }
  const orderContainer = document.querySelector<HTMLElement>('.order');
  if (orderContainer) {
    orderContainer.classList.remove('hidden');
  }
};

export const populateCartProductsList = async (
  cartProducts: ProductCartInfo[]
) => {
  const cartProductsList = document.querySelector(
    '.cart-products-list'
  ) as HTMLElement;
  cartProductsList.innerHTML = '';

  if (cartProducts.length == 0) {
    hideCart();
    return;
  }

  showCart();

  cartProducts.forEach(cartProduct =>
    cartProductsList.appendChild(createCartProductsItem(cartProduct))
  );
};

const createCartProductsItem = ({
  _id,
  name,
  category,
  size,
  img,
  price,
  count,
}: ProductCartInfo): DocumentFragment => {
  const template = document.getElementById(
    'cart-product-card-template'
  ) as HTMLTemplateElement;

  const clone = template.content.cloneNode(true) as DocumentFragment;

  const imageEl = clone.querySelector(
    '.cart-products-item-image'
  ) as HTMLImageElement;
  imageEl.src = img;
  imageEl.alt = name + ' image';

  const titleEl = clone.querySelector('.cart-products-subtitle') as HTMLElement;
  titleEl.textContent = name;

  const valuesEls = clone.querySelectorAll(
    '.cart-products-item-descr-item-value'
  ) as NodeListOf<HTMLElement>;
  valuesEls[0].textContent = category.split('_').join(' ');
  valuesEls[1].textContent = size;

  const priceEl = clone.querySelector(
    '.cart-products-item-price'
  ) as HTMLElement;
  priceEl.textContent = `$` + price.toString();

  const deleteBtn = clone.querySelector(
    '.cart-products-item-delete-btn'
  ) as HTMLButtonElement;
  deleteBtn.addEventListener('click', () => handlerDeleteProductFromCart(_id));

  initQtySelector(clone);

  const input = clone.querySelector<HTMLInputElement>(
    '.cart-products-item-qty-input'
  );
  if (!input) {
    throw new Error('Quantity input is not found');
  }
  const debounceHandlerCountChange = debounceFunction(
    handlerSetCountOfProductToCart,
    350
  );

  input.addEventListener('change', (e: Event) =>
    debounceHandlerCountChange(e, _id)
  );
  input.value = count.toString();
  return clone;
};

function initQtySelector(clone: DocumentFragment) {
  const container = clone.querySelector<HTMLDivElement>(
    '.cart-products-item-qty-container'
  );
  if (!container) return;

  const input = container.querySelector<HTMLInputElement>(
    '.cart-products-item-qty-input'
  );
  const btnIncrease = container.querySelector(
    '.cart-products-item-qty-btn.increase'
  ) as HTMLButtonElement;
  const btnDecrease = container.querySelector(
    '.cart-products-item-qty-btn.decrease'
  ) as HTMLButtonElement;

  if (!input || !btnIncrease || !btnDecrease) return;

  const min = Number(input.min) || 1;
  const max = Number(input.max) || 99;

  function updateButtons(value: number) {
    btnDecrease.disabled = value <= min;
    btnIncrease.disabled = value >= max;
  }

  btnIncrease.addEventListener('click', () => {
    let currentValue = Number(input.value) || min;
    if (currentValue < max) {
      input.value = String(currentValue + 1);
      updateButtons(currentValue + 1);
      input.dispatchEvent(new Event('change'));
    }
  });

  btnDecrease.addEventListener('click', () => {
    let currentValue = Number(input.value) || min;
    if (currentValue > min) {
      input.value = String(currentValue - 1);
      updateButtons(currentValue - 1);
      input.dispatchEvent(new Event('change'));
    }
  });

  input.addEventListener('input', () => {
    let value = Number(input.value);
    if (isNaN(value) || value < min) {
      input.value = String(min);
      value = min;
    } else if (value > max) {
      input.value = String(max);
      value = max;
    }
    updateButtons(value);
  });

  updateButtons(Number(input.value));
}

export const updateCartProductsCountCart = (count: number) => {
  const valueEl = document.querySelector(
    '.cart-product-count-value'
  ) as HTMLElement;
  valueEl.textContent = count.toString();
};
