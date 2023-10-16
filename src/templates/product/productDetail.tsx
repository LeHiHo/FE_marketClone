'use client';
import Header from '@/components/header';
import '@/styles/templates/product/ProductDetail.scss';
import Link from 'next/Link';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const ProductDetail = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  const handleOnclick = () => {
    setIsMenu(!isMenu);
  };

  return (
    <div id="product-detail">
      <div className="product-detail">
        <Header
          goBack={true}
          border={false}
          title=""
          button={
            <>
              <BsThreeDotsVertical
                size="30"
                background="#ccc"
                className="product-detail__icon"
                onClick={handleOnclick}
              />
              {isMenu && <div className="product-detail__menu">미니메뉴</div>}
            </>
          }
        />

        <div className="product-detail__image-wrapper">
          <img src="" alt="img" className="product-detail__image" />
        </div>

        <div className="product-detail__main">
          <div className="product-detail__profile">
            <img
              src="@/styles/templates/product/cat.jpg"
              alt="profile"
              className="profile__image"
            />
            <p className="profile__name">닉네임</p>
          </div>

          <select>
            <option>판매중</option>
            <option>예약중</option>
          </select>

          <div className="product-detail__content-wrapper">
            <p className="product-detail__title">
              2022 맥북에어 M2 256GB 판매합니다!
            </p>
            <div className="product-detail__description">
              <p className="product-detail__category">디지털기기</p>
              <p className="product-detail__time">⋅ 1일 전</p>
            </div>

            <p className="product-detail__content">
              2022 맥북에어 M2 256GB 판매합니다! <br />
              사진에 관련된 업무를 하다보니 아이폰이랑 연동이 잘 되어서 1월에
              구매하였는데 조심한다고 거의 들고 나가질 않았습니다! 퇴사하게되어
              판매합니다! <br /> <br />
              금액대가 있는 제품이라 마곡역에서 직거래했으면 좋겠습니다! <br />
              <br />
              ✔️ 기스 없음 <br />
              ✔️ 풀박 <br />ㄴ 필요하시면 멀티포트 같이 드리겠습니다.
            </p>
          </div>
        </div>
      </div>

      <footer className="product-detail__footer">
        <div className="product-detail__footer--wrapper">
          <AiOutlineHeart size="28" className="product-detail__footer-icon" />
          <span>|</span>
          <p>125만원</p>
        </div>

        <Link href={'/chatList'}>
          <button className="product-detail__chat-button">관련 채팅보기</button>
        </Link>
      </footer>
    </div>
  );
};
