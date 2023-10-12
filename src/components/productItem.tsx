import '@/styles/components/productItem.scss';
import { IProduct } from '@/types/interface';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export default function ProductItem({
  product,
  isUserProducts = false,
}: {
  product: IProduct;
  isUserProducts: boolean;
}) {
  return (
    <>
      <li className="product">
        <div className="product__img">
          <img src={product.thumbnail} />
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
      </li>
      {isUserProducts && (
        <div className="product__state">
          <div className="product__state__change-box">
            <p className='product__state__btn--reserve'>예약중 변경</p>
          </div>
          <div className="product__state__change-box">
            <p className='product__state__btn--complete'>거래완료 변경</p>
          </div>
        </div>
      )}
    </>
  );
}
