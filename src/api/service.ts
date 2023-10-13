import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getProducts = async () => {
  const res = await client.get('/products');
  return res.data;
};

export const postSignUp = async (
  email: string,
  password: string,
  phone: string,
  nickname: string,
) => {
  const res = await client.post('/signup', {
    email: email,
    password: password,
    phone: phone,
    nickname: nickname,
  });
  return res;
};
