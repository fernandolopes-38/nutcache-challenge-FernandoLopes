import axios from "axios";

export const api = axios.create({
  baseURL: `https://crudcrud.com/api/${import.meta.env.VITE_API_TOKEN}`,
});
