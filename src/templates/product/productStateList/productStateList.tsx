import 'src/styles/templates/product/productStateList.scss';

export default function ProductStateList({ onChangeList }) {
  return (
    <>
      <div className="productStateList">
        <div className="productState active">
          <p
            onClick={() => {
              onChangeList('all');
            }}>
            전체
          </p>
        </div>
        <div className="productState">
          <p
            onClick={() => {
              onChangeList('sale');
            }}>
            판매중
          </p>
        </div>
        <div className="productState">
          <p
            onClick={() => {
              onChangeList('completed');
            }}>
            거래완료
          </p>
        </div>
      </div>
    </>
  );
}
