import { requestFactory } from "./request.js";

const url = '/data/products';

const request = requestFactory();

export const create = async (productData) => {
    const result = await request.post(url, productData);

    return result;
}

export const getAll = async () => {
  const result = await request.get(url);
  return Object.values(result);
};

export const getOne = async (productId) => {
    console.log(productId)
    const result = await request.get(`${url}/${productId}`);

    return result;
};