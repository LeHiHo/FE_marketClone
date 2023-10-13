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

// axios
export interface AXIOSResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
