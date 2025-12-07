import { requestFactory } from "./request";

const url = "/data/cart";  
const request = requestFactory();


export const getOwnCart = async (userId) => {
  try {
    const result = await request.get(
      `${url}?where=_ownerId%3D%22${userId}%22`
    );
    return Object.values(result);
  } catch (err) {
    if (err.message && err.message.includes("Collection does not exist")) {
      return [];
    }
    throw err;
  }
};

export const create = async (cartData, userId) => {
  let currentCart = [];
  try {
    currentCart = await getOwnCart(userId);
  } catch {
    currentCart = [];
  }
  
  const existing = currentCart.find((x) =>
    x.productId === cartData.productId &&
      JSON.stringify(x.options || {}) === JSON.stringify(cartData.options || {})
  );

  if (existing) {
    const updatedItem = {
      ...existing,
      quantity: existing.quantity + cartData.quantity,
    };
    return await request.put(`${url}/${existing._id}`, updatedItem);
  }

 
  return await request.post(url, cartData);
};


export const remove = (cartItemId) => request.delete(`${url}/${cartItemId}`);


export const edit = async (cartItemId, quantity) => {
  return await request.put(`${url}/${cartItemId}`, { quantity });
};