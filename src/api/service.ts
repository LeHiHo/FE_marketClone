import axios from 'axios';

const client = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getProductDetail = async (id: number) => {
  const res = await client.get(`/products/${id}`, {
    params: {
      productId: id,
    },
  });
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

export const getProductCategory = async () => {
  const res = await client.get(`/products/categories`);
  return res.data;
};

export const getProducts = async (searchWord?: string, categoryId?: string) => {
  const res = await client.get('/products', {
    params: {
      searchWord,
      categoryIds: categoryId,
    },
  });
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
  return res.data;
};

// 내 판매 상품 리스트 조회
export const getMyProduct = async () => {
  const res = await client.get('/myPage/products');
  return res.data;
};

// 판매자의

export const getMyChatList = async () => {
  const res = await client.get('/myPage/chats');
  return res.data;
};

export const getProductChatList = async (id: number | null) => {
  const res = await client.get(`/products/${id}/chats`);
  return res.data;
};
