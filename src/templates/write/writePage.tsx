import '@/styles/templates/write/write.scss';
import Header from '@/components/header';

export default function WirtePage() {
  return (
    <>
      <Header
        goBack={true}
        title={'중고거래 글쓰기'}
        button={'완료'}
        color={true}
      />
      <div className="writePage">
        <div className="writePage__input">
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
          <p>자세한 설명</p>
          <textarea
            name="product_detail"
            className="writePage__input-detail"
            placeholder="게시글 내용을 작성해주세요. 품목 및 판매금지품목은 게시가
            제한된니다."></textarea>
        </div>
      </div>
    </>
  );
}
