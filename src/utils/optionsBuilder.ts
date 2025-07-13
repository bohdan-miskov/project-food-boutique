import { OptionsApi } from '../type/products';

export const createOptions = (
  query: string,
  category: string,
  sort: string,
  currentPage: number,
  limit: number
): OptionsApi => {
  const options: OptionsApi = {
    keyword: query,
    page: currentPage,
    limit,
  };

  if (category != 'all') {
    options['category'] = category;
  }

  switch (sort) {
    case 'popularity': {
      options.byPopularity = true;
      break;
    }
    case 'alph_asc': {
      options.byABC = true;
      break;
    }
    case 'alph_desc': {
      options.byABC = false;
      break;
    }
    case 'price_asc': {
      options.byPrice = true;
      break;
    }
    case 'price_desc': {
      options.byPrice = false;
      break;
    }
  }

  return options;
};
