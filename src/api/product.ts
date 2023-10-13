import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getProducts = async () => {
  const res = await client.get('/products');
  return res.data;
};
