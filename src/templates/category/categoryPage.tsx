import Header from '@/components/header';

import '@/styles/templates/category/category.scss';

export default function CategoryPage() {
  return (
    <div id="categoryPage">
      <Header goBack={true} title={'카테고리'} border={true} />
      <div className="category__content">
        <div>디지털기기</div>
        <div>생활가전</div>
        <div>가구/인테리어</div>
        <div>유아동</div>
        <div>생활/가공식품</div>
        <div>유아도서</div>
        <div>여성의류</div>
        <div>남성패션/잡화</div>
        <div>게임/취미</div>
        <div>뷰티/미용</div>
      </div>
    </div>
  );
}
