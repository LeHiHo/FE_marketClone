import Btn from '@/components/btn';
import '@/styles/templates/login.scss';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <div className="sub_header">⬅️ 중고거래 글쓰기</div>
      <div></div>
      <div className="login">
        <div className="login__text">
          <input type="file" name="product_img" />
          <p>제목</p>
          <input
            type="text"
            name="product_title"
            placeholder="제목 입력해주세요"
          />
          <p>카테고리</p>
          <input
            type="text"
            name="product_category"
            placeholder="카테고리 입력해주세요"
          />
          <p>가격</p>
          <input
            type="number"
            name="product_price"
            placeholder="가격을 입력해주세요"
          />
          <div>
            게시글 내용을 작성해주세요. 가짜 품목 및 <br />
            판매금지품목은 게시가 제한된니다.
          </div>
        </div>
      </div>
    </>
  );
}
