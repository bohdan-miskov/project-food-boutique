import { AxiosError } from 'axios';
import { subscribe } from '../api/subscriptionApi';
import { openModal } from '../ui/modals';

const handleSubmitSubscribing = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);
  try {
    const response = await subscribe(data.get('userEmail') as string);
    const backdrop = document.querySelector(
      '.subscribing-thank-modal-backdrop'
    ) as HTMLElement;
    openModal(backdrop);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response?.status === 409) {
      const backdrop = document.querySelector(
        '.subscribing-error-modal-backdrop'
      ) as HTMLElement;
      openModal(backdrop);
    }
  } finally {
    form.reset();
  }
};

const subscribingForm = document.querySelector(
  '.footer-form'
) as HTMLFormElement;

subscribingForm.addEventListener('submit', handleSubmitSubscribing);
