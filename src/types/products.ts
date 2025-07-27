export type Product = {
  _id: string;
  name: string;
  img: string;
  category: string;
  price: number;
  size: string;
  is10PercentOff: boolean;
  popularity: number;
};

export type ProductDetails = {
  _id: string;
  name: string;
  img: string;
  category: string;
  desc: string;
  price: number;
  size: string;
  is10PercentOff: boolean;
  popularity: number;
};

export type ProductsResponse = {
  results: Product[];
  totalPages: number;
};

export type OptionsApi = {
  keyword: string;
  page: number;
  limit: number;
  category?: string;
  byABC?: boolean;
  byPrice?: boolean;
  byPopularity?: boolean;
};
