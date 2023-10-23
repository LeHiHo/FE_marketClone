import { IProduct } from '@/types/interface';
import { updateProductState } from '../api/service';

export default function ProductState({
  product,
  setReLoad,
}: {
  product: IProduct;
  setReLoad: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="product__state">
        <div className="product__state__change-box">
          <button
            onClick={async () => {
              await updateProductState(product.id, 1);
              setReLoad((prev: boolean) => !prev);
            }}
            className="product__state__btn--reserve">
            판매중 변경
          </button>
        </div>
        <div className="product__state__change-box">
          <button
            onClick={async () => {
              await updateProductState(product.id, 3);
              setReLoad((prev: boolean) => !prev);
            }}
            className="product__state__btn--complete">
            거래완료 변경
          </button>
        </div>
      </div>
    </>
  );
}
