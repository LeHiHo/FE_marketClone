import ProductBadge from '@/components/productBadge';

export default function ChatItem() {
  return (
    <div className="chat-detail__product">
      <div>
        <img src="/svg/cat.jpg" alt="thumnail" />
        <div className="chat-detail__product-info">
          <div>
            <ProductBadge state="reserved" productStatus="판매중" />
            <p>상품제목</p>
          </div>
          <p>가격</p>
        </div>
      </div>
    </div>
  );
}
