import 'src/styles/templates/product/productStateList.scss';

export default function ProductStateList({
  onChangeList,
}: {
  onChangeList: React.Dispatch<React.SetStateAction<S>>;
}) {
  return (
    <>
      <div className="productStateList">
        <div className="productState active">
          <p
            onClick={(e) => {
              const productStates = document.querySelectorAll('.productState');
              onChangeList('all');
              productStates.forEach((product) => {
                product.classList.remove('active');
              });
              e.currentTarget.closest('.productState')?.classList.add('active');
            }}>
            전체
          </p>
        </div>
        <div className="productState">
          <p
            onClick={(e) => {
              const productStates = document.querySelectorAll('.productState');
              onChangeList('sale');
              productStates.forEach((product) => {
                product.classList.remove('active');
              });
              e.currentTarget.closest('.productState')?.classList.add('active');
            }}>
            판매중
          </p>
        </div>
        <div className="productState">
          <p
            onClick={(e) => {
              const productStates = document.querySelectorAll('.productState');
              onChangeList('completed');
              productStates.forEach((product) => {
                product.classList.remove('active');
              });
              e.currentTarget.closest('.productState')?.classList.add('active');
            }}>
            거래완료
          </p>
        </div>
      </div>
    </>
  );
}
