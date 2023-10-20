import '@/styles/components/productItem.scss';
import { IProduct } from '@/types/interface';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import ProductBadge from './productBadge';

export default function ProductItem({ product }: { product: IProduct }) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/product/${[product.id]}`);
  };

  return (
    <li className="product" onClick={onClick}>
      <div className="product__img">
        <img src={product.thumbnail} />
      </div>
      <div className="product__content">
        <div className="title">{product.title}</div>
        <div className="price">{product.price}원</div>
        {product.status === '예약중' && (
          <ProductBadge productStatus={product.status} state={'reserved'} />
        )}
        {product.status === '거래완료' && (
          <ProductBadge productStatus={product.status} state={'sold'} />
        )}
        <div className="like">
          {product.like ? <AiFillHeart /> : <AiOutlineHeart />}
          <p className="like__counter">
            {product.likes > 0 ? product.likes : ' '}
          </p>
        </div>
      </div>
    </li>
  );
}
