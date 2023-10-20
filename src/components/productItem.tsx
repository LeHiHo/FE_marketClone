import '@/styles/components/productItem.scss';
import { IProduct } from '@/types/interface';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

export default function ProductItem({ product }: { product: IProduct }) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/product/${[product.id]}`);
  };

  return (
    <div className="product" onClick={onClick}>
      <div className="product__img">
        <img src={product.thumbnail} alt="" />
      </div>
      <div className="product__content">
        <div className="title">{product.title}</div>
        <div className="price">{product.price}원</div>
        <div className="like">
          {product.like ? <AiFillHeart /> : <AiOutlineHeart />}
          <p className="like__counter">
            {product.likes > 0 ? product.likes : ' '}
          </p>
        </div>
      </div>
    </div>
  );
}
