import '@/styles/templates/chat/chatDetail.scss';
import Header from '@/components/header';
import ProductBadge from '@/components/productBadge';
import { BiPlus } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';

export default function ChatDetail() {
  return (
    <div id="chat-detail">
      <Header goBack={true} title="닉네임" border={true} />

      <div className="chat-detail">
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
      </div>

      <div className="chat-detail__main">
        <div>채팅1</div>
        <div>채팅2</div>
        <div>채팅3</div>
        <div>채팅4</div>
      </div>

      <footer className="chat-detail__footer">
        <div>
          <BiPlus size="30" />
          <input type="text" placeholder="메세지 보내기" />
          <TbSend size="25" />
        </div>
      </footer>
    </div>
  );
}
