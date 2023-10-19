import { updateProductState } from '../api/service';
import { useRouter, usePathname } from 'next/navigation';

export default function ProductState({ product }: any) {
  const router = useRouter();
  return (
    <>
      <div className="product__state">
        <div className="product__state__change-box">
          <p
            onClick={() => {
              updateProductState(product.id, 2);
              router.push('./sales')
            }}
            className="product__state__btn--reserve">
            예약중 변경
          </p>
        </div>
        <div className="product__state__change-box">
          <p
            onClick={() => {
              updateProductState(product.id, 3);
              router.push('./sales')
            }}
            className="product__state__btn--complete">
            거래완료 변경
          </p>
        </div>
      </div>
    </>
  );
}
