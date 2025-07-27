import axios from 'axios';

export const subscribe = async (email: string) => {
  return await axios.post(
    'https://food-boutique.b.goit.study/api/subscription',
    {
      email,
    }
  );
};
