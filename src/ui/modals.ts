export const openModal = (modalBackdrop: HTMLElement) => {
  modalBackdrop.classList.add('is-open');
  const closeBtn = modalBackdrop.querySelector(
    '.modal-close-btn'
  ) as HTMLButtonElement;

  const handleCloseClick = (e: MouseEvent) => {
    if (
      e.target === modalBackdrop ||
      e.target === closeBtn ||
      closeBtn.contains(e.target as Node)
    ) {
      closeModal(modalBackdrop, handleCloseClick, handleEscapeKey);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal(modalBackdrop, handleCloseClick, handleEscapeKey);
    }
  };

  modalBackdrop.addEventListener('click', handleCloseClick);
  document.addEventListener('keydown', handleEscapeKey);
};

export const closeModal = (
  modalBackdrop: HTMLElement,
  handlerClick: (e: MouseEvent) => void,
  handlerKey: (e: KeyboardEvent) => void
) => {
  modalBackdrop.classList.remove('is-open');
  modalBackdrop.removeEventListener('click', handlerClick);
  document.removeEventListener('keydown', handlerKey);
};
