
import { requestFactory } from "./request.js";

const url = '/data/products';

const request = requestFactory();

export const getAll = async () => {
  const result = await request.get(url);
  return Object.values(result);
};


export const getAllByPage = async (page) =>  {
    const take = 12;
    const skip = take * (page - 1);
    const result = await request.get(`${url}?offset=${skip}&pageSize=${take}`);

    return Object.values(result);
};

export const getOne = async (productId) => {
    const result = await request.get(`${url}/${productId}`);

    return result;
};

export const create = async (productData) => {
    const result = await request.post(url, productData);

    return result;
}

export const edit = (productId, data) => request.put(`${url}/${productId}`, data);

export const deleteProduct = (productId) => request.delete(`${url}/${productId}`);

export const sort = async (page, criteria, order) => {
    const take = 12;
    const skip = take * (page - 1);

    if (order === "asc") {
        order = '';
    }
    const result = await request.get(`${url}?sortBy=${criteria}%20${order}&offset=${skip}&pageSize=${take}`);

    return result;
};

export const filter = async (page, criteria, match) => {
    const take = 12;
    const skip = take * (page - 1);

    const result = await request.get(`${url}?where=${criteria}%3D%22${match}%22&offset=${skip}&pageSize=${take}`);
    return result;
};