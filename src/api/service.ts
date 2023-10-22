import axios from 'axios';

const client = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const getProductDetail = async (id: number | undefined) => {
  const res = await client.get(`/products/${id}`, {
    params: {
      productId: id,
    },
  });
  return res.data;
};

// 상품등록
export const postProducts = async (
  title: string,
  categoryName: string,
  content: string,
  price: string,
  images?: FileList | null,
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('categoryName', categoryName);
  formData.append('content', content);
  formData.append('price', price.toString());

  // 여러 이미지를 처리하는 경우
  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
  }

  const res = await client.post('/products', formData, config);
  return res;
};

// 상품삭제
export const deleteProducts = async (id: number) => {
  const res = await client.delete(`products/${id}`);
  return res;
};

export const getProductCategory = async () => {
  const res = await client.get(`/products/categories`);
  return res.data;
};

export const getProducts = async (searchWord?: string, category?: string) => {
  const res = await client.get('/products?pageSize=100', {
    params: {
      searchWord,
      categoryNames: category,
      pageSize: 300, // 추후 수정 예정입니다.
    },
  });
  return res.data;
};

export const getUserProducts = async (id: string) => {
  const res = await client.get(`/products/${id}/list`);
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

//로그인
export const postAuth = async (email: string, password: string) => {
  const res = await client.post('/login', {
    email: email,
    password: password,
  });
  return res;
};

export const updateProductState = async (
  productStateId: number | undefined,
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

export const getMyChatList = async () => {
  const res = await client.get('/myPage/chats');
  return res.data;
};

export const getMyWishList = async () => {
  const res = await client.get('/wish');
  return res.data;
};

export const getProductChatList = async (id: number | null) => {
  const res = await client.get(`/products/${id}/chats`);
  return res.data;
};

export const getSellerProduct = async (id: number | null) => {
  const res = await client.get(`/products/${id}/list`);
  return res.data;
};

// 위시상품 추가 / 삭제

export const addWishProduct = async (id: number | undefined) => {
  const res = await client.post(`wish/${id}`);
  return res;
};

export const deleteWishProduct = async (id: number | undefined) => {
  const res = await client.delete(`wish/${id}`);
  return res;
};

export const putEditProfile = async (nickname: string, profileImg: File) => {
  const profileFormData = new FormData();
  profileFormData.append('nickname', nickname);
  profileFormData.append('profileImg', profileImg);
  const res = await client.put('/myPage/profile', profileFormData, config);
  return res;
};

// 채팅 관련 api
export const createNewChat = async (id: number) => {
  const res = await client.post(`/products/${id}/chats`);
  return res.data;
};

export const getChatContents = async (chatRoomId: number) => {
  const res = await client.get(`/chatContents/${chatRoomId}`);
  return res.data;
};
