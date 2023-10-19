import 'src/styles/templates/product/productStateList.scss';

export default function ProductStateList({ onChangeList }) {
  const productStates = document.querySelectorAll('.productState');
  return (
    <>
      <div className="productStateList">
        <div className="productState active">
          <p
            onClick={(e) => {
              
              onChangeList('all');
              productStates.forEach((product) => {
                product.classList.remove('active');
              });
              e.currentTarget.closest('.productState')?.classList.add('active')
            }}>
            전체
          </p>
        </div>
        <div className="productState">
          <p
            onClick={(e) => {
              onChangeList('sale');
              productStates.forEach((product) => {
                product.classList.remove('active');
              });
              e.currentTarget.closest('.productState')?.classList.add('active')
            }}>
            판매중
          </p>
        </div>
        <div className="productState">
          <p
            onClick={(e) => {
              onChangeList('completed');
              productStates.forEach((product) => {
                product.classList.remove('active');
              });
              e.currentTarget.closest('.productState')?.classList.add('active')
            }}>
            거래완료
          </p>
        </div>
      </div>
    </>
  );
}
