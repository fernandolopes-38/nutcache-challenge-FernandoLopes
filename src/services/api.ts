import axios from "axios";

const CRUCRUD_TOKEN = "c8c56c6710184ec3b4a33c26fb4cbcce";

export const api = axios.create({
  baseURL: `https://crudcrud.com/api/${CRUCRUD_TOKEN}`,
});
