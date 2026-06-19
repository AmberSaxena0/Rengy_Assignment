import axios from 'axios';
import { BASE_URL, ENDPOINTS } from './api.config';
import { Product, ProductResponse } from '../types';

export const LIMIT = 10;

export const getCategories = async (): Promise<string[] | []> => {
  const API_URL = BASE_URL + ENDPOINTS.CategoriesList;
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.log('getCategories-err-->>', error);
    return [];
  }
};

export const getAllProducts = async (
  skip: number,
  searchText: string,
): Promise<ProductResponse> => {
  const API_URL = `${BASE_URL}${ENDPOINTS.Products}/search?q=${searchText}&limit=${LIMIT}&skip=${skip}`;
  console.log(API_URL, 'API_URLAPI_URLAPI_URL');
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.log('getAllProducts-err-->>', error);
    return {} as ProductResponse;
  }
};

export const getProductsByCategory = async (
  category: string,
): Promise<ProductResponse> => {
  const API_URL = BASE_URL + ENDPOINTS.Category + category;
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.log('getProductsByCategory-err-->>', error);
    return {} as ProductResponse;
  }
};

export const getProductDetail = async (id: number): Promise<Product> => {
  const API_URL = `${BASE_URL}${ENDPOINTS.Products}/${id}`;
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.log('getProductsByCategory-err-->>', error);
    return {} as Product;
  }
};
