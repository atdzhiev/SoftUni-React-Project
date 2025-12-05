import { requestFactory } from "./request.js";

const url = '/users'

const request = requestFactory();

export const login = (userData) => request.post(`${url}/login`, userData);
export const register = (userData) => request.post(`${url}/register`, userData);
export const logout = () => request.get(`${url}/logout`);