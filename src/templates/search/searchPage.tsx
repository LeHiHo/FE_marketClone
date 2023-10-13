import Header from '@/components/header';

import { AiOutlineHeart } from 'react-icons/ai';
import '@/styles/templates/search/search.scss';

export default function SearchPage() {
  return (
    <div id="searchPage">
      <Header goBack={true} border={true}>
        <label className="searchBar__wrap">
          <input
            className="searchBar"
            type="text"
            placeholder="우리동네에서 검색"
          />
        </label>
      </Header>
      <div className="search__container">
        <div className="search__list">
          <div className="search__list__img">
            <img src="https://via.placeholder.com/119x119" alt="임시이미지" />
          </div>
          <div className="search__list__content">
            <div className="title">제목</div>
            <div className="place">장소</div>
            <div className="price">가격</div>
            <div className="like">
              <AiOutlineHeart className="heart heart--off" />
              <span className="likeCounter">n</span>
            </div>
          </div>
        </div>
        <div className="search__list">
          <div className="search__list__img">
            <img src="https://via.placeholder.com/119x119" alt="임시이미지" />
          </div>
          <div className="search__list__content">
            <div className="title">제목</div>
            <div className="place">장소</div>
            <div className="price">가격</div>
            <div className="like">
              <AiOutlineHeart className="heart heart--off" />
              <span className="likeCounter">n</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
