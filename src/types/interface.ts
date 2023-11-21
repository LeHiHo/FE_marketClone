// 상품
export interface IProduct {
  id: number;
  title: string;
  price: number;
  likes: number;
  like?: boolean;
  status: string;
  thumbnail: string;
}

export interface IProductProps {
  data: IProduct[];
}

export type Product = {
  id: number;
  title: string;
  price: number;
  categoryName: string;
  content: string;
  images: string[];
  status: string;
  like: boolean;
  likes: number;
  myProduct: boolean;
  seller: Seller;
  sellerProductInfos: sellerProductInfos[];
};

export type Seller = {
  sellerId: number;
  profileImage: string;
  nickname: string;
};

export type sellerProductInfos = {
  id: number;
  price: number;
  thumbnail: string;
  title: string;
};

// 유저
export interface IUser {
  id?: number;
  email: string;
  nickname: string;
  tel: string;
  profileImage: string;
}

// axios
export interface AXIOSResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// 채팅
export type ChatContent = {
  roomId: number | null;
  userId: number | null;
  nickName: string;
  profileImage: string;
  content: string;
  createAt: string;
};
