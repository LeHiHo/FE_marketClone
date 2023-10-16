import axios from 'axios';

const client = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getProducts = async () => {
  const res = await client.get('/products');
  return res.data;
};

export const postProducts = async (
  title: string,
  categoryId: number,
  content: string,
  price: number,
  images?: FileList,
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('categoryId', categoryId.toString()); // 숫자를 문자열로 변환
  formData.append('content', content);
  formData.append('price', price.toString()); // 숫자를 문자열로 변환

  // 여러 이미지를 처리하는 경우
  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const res = await client.post('/products', formData, config);
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

export const postAuth = async (email: string, password: string) => {
  const res = await client.post('/login', {
    email: email,
    password: password,
  });
  return res;
};

export const updateProductState = async (
  productStateId: number,
  changeStateCode: number,
) => {
  const res = await client.put(`/products/${productStateId}/status`, {
    status: changeStateCode,
  });
  return res;
};

export const getMyInfo = async () => {
  const res = await client.get('/myInfo');
  console.log(res);
  return res;
};
