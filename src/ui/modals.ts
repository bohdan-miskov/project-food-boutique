export const openModal = (modalBackdrop: HTMLElement) => {
  modalBackdrop.classList.add('is-open');
  const closeBtn = modalBackdrop.querySelector(
    '.modal-close-btn'
  ) as HTMLButtonElement;
  const handleCloseClick = () => closeModal(modalBackdrop, handleCloseClick);
  closeBtn.addEventListener('click', handleCloseClick);
};

export const closeModal = (modalBackdrop: HTMLElement, handler: () => void) => {
  modalBackdrop.classList.remove('is-open');
  const closeBtn = modalBackdrop.querySelector(
    '.modal-close-btn'
  ) as HTMLButtonElement;
  closeBtn.removeEventListener('click', handler);
};
