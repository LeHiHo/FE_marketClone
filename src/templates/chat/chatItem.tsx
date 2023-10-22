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

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<Product> = await getProductDetail(productId);
      const { images, status, title, price } = res.data;
      setProduct({ images, status, title, price });
    };
    fetchData();
  }, []);

  return (
    <div className="chat-detail__product">
      <div>
        <img src={product?.images[0]} alt="thumnail" />
        <div className="chat-detail__product-info">
          <div>
            <ProductBadge state="" productStatus={product?.status} />
            <p>{product?.title}</p>
          </div>
          <p>{product?.price}</p>
        </div>
      </div>
    </div>
  );
}
