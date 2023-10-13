export default function ProductState() {
  return (
    <>
      <div className="product__state">
        <div className="product__state__change-box">
          <p className="product__state__btn--reserve">예약중 변경</p>
        </div>
        <div className="product__state__change-box">
          <p className="product__state__btn--complete">거래완료 변경</p>
        </div>
      </div>
    </>
  );
}
