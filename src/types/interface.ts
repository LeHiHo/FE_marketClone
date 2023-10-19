// 상품
export interface IProduct {
  id: number;
  title: string;
  price: number;
  likes: number;
  like: boolean;
  status: string;
  thumbnail: string;
}

// 유저
export interface IUser {
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
