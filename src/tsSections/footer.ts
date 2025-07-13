import { subscribe } from '../api/subscriptionApi';

const handleSubmitSubscribing = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  await subscribe(data.get('userEmail') as string);

  form.reset();
};

const subscribingForm = document.querySelector(
  '.footer-form'
) as HTMLFormElement;

subscribingForm.addEventListener('submit', handleSubmitSubscribing);
