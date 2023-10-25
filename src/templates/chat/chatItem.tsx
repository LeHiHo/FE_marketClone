import ProductBadge from '@/components/productBadge';
import { useEffect, useState } from 'react';
import { AXIOSResponse, Product } from '@/types/interface';
import { getProductDetail } from '@/api/service';

type SimpleProduct = {
  images: string[];
  status: string;
  title: string;
  price: number;
};

export default function ChatItem({ productId }: { productId: number }) {
  const [product, setProduct] = useState<SimpleProduct>({
    images: [],
    status: '',
    title: '',
    price: 0,
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<Product> = await getProductDetail(productId);
      const { images, status, title, price } = res.data;
      setProduct({ images, status, title, price });
      setStatus(res.data.status);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (product.status === '판매중') {
      setStatus('');
    } else if (product.status === '예약중') {
      setStatus('reserved');
    } else {
      setStatus('sold');
    }

    return () => {
      setStatus('');
    };
  }, [status]);

  return (
    <div className="chat-detail__product">
      <div>
        <img src={product?.images[0]} alt="thumnail" />
        <div className="chat-detail__product-info">
          <p className="title">{product?.title}</p>
          <p className="price">{product?.price}원</p>
          <ProductBadge state={status} productStatus={product?.status} />
        </div>
      </div>
    </div>
  );
}
