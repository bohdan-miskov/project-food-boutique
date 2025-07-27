import { generatePaginationArray } from '../utils/paginationArrayGenerator';

let btnOnceLeft: HTMLButtonElement;
let btnAllLeft: HTMLButtonElement;

let btnOnceRight: HTMLButtonElement;
let btnAllRight: HTMLButtonElement;

let currentPage: number;
let totalPages: number;

export const renderProductsPagination = (
  startPage: number,
  total: number,
  maxPaginCount: number,
  searchFunction: (page: number) => void
) => {
  currentPage = startPage;
  totalPages = total;

  if (totalPages <= 1) {
    const container = document.querySelector(
      '.products-pagination-container'
    ) as HTMLElement;

    container.classList.add('hidden');
    return;
  }

  const containerCenter = document.querySelector(
    '.products-pagination-center-side'
  ) as HTMLElement;

  containerCenter.innerHTML = '';

  const pages = generatePaginationArray(currentPage, totalPages, maxPaginCount);
  const firstPageInRange = pages[0];
  const lastPageInRange = pages[pages.length - 1];

  // Показуємо ... ЗЛІВА, якщо є сторінки перед
  if (firstPageInRange > 2 && currentPage > Math.floor(totalPages / 2)) {
    addPaginBtn(createPaginDots(), containerCenter);
  }

  pages.forEach(page => {
    addPaginBtn(createPaginBtn(page, searchFunction), containerCenter);
  });

  // Показуємо ... ПРАВОРУЧ, якщо ще є сторінки після
  if (
    lastPageInRange < totalPages - 1 &&
    currentPage < Math.floor(totalPages / 2)
  ) {
    addPaginBtn(createPaginDots(), containerCenter);
  }

  updatePaginationBtns(totalPages);
};

const createPaginDots = (): HTMLButtonElement => {
  const dots = document.createElement('button');
  dots.textContent = '...';
  dots.disabled = true;
  dots.classList.add('products-pagination-btn');
  return dots;
};

const createPaginBtn = (
  page: number,
  searchFunction: (currentPage: number) => void
): HTMLButtonElement => {
  const btn = document.createElement('button');
  btn.classList.add('products-pagination-btn');
  btn.textContent = page.toString();

  if (page === currentPage) {
    btn.classList.add('active');
    btn.disabled = true;
  }

  btn.addEventListener('click', () => {
    currentPage = page;
    searchFunction(page);
  });

  return btn;
};

const addPaginBtn = (
  paginBtn: HTMLButtonElement,
  paginContainer: HTMLElement
) => {
  const listItemDotsRightEl = document.createElement('li') as HTMLElement;
  listItemDotsRightEl.appendChild(paginBtn);
  paginContainer.appendChild(listItemDotsRightEl);
};

const updatePaginationBtns = (totalPages: number) => {
  const leftEnabled = currentPage > 1;
  const rightEnabled = currentPage < totalPages;

  btnOnceLeft.disabled = !leftEnabled;
  btnAllLeft.disabled = !leftEnabled;
  btnOnceRight.disabled = !rightEnabled;
  btnAllRight.disabled = !rightEnabled;
};

export const setPaginNavButtons = (searchFunction: (page: number) => void) => {
  const pagLeftSide = document.querySelector(
    '.products-pagination-left-side'
  ) as HTMLElement;
  const pagRightSide = document.querySelector(
    '.products-pagination-right-side'
  ) as HTMLElement;

  btnOnceLeft = pagLeftSide.querySelector(
    '.product-pagination-nav-btn.once'
  ) as HTMLButtonElement;
  btnAllLeft = pagLeftSide.querySelector(
    '.product-pagination-nav-btn.all'
  ) as HTMLButtonElement;

  btnOnceRight = pagRightSide.querySelector(
    '.product-pagination-nav-btn.once'
  ) as HTMLButtonElement;
  btnAllRight = pagRightSide.querySelector(
    '.product-pagination-nav-btn.all'
  ) as HTMLButtonElement;

  btnOnceLeft.addEventListener('click', () => {
    currentPage--;
    searchFunction(currentPage);
  });

  btnAllLeft.addEventListener('click', () => {
    currentPage = 1;
    searchFunction(currentPage);
  });

  btnOnceRight.addEventListener('click', () => {
    currentPage++;
    searchFunction(currentPage);
  });

  btnAllRight.addEventListener('click', () => {
    currentPage = totalPages;
    searchFunction(currentPage);
  });
};
