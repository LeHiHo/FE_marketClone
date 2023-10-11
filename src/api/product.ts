import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:9999/',
});

export const getProducts = async () => {
  const res = await client.get('products/');
  return res.data;
};
