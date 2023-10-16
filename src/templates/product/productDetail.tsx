'use client';
import Btn from '@/components/btn';
import Header from '@/components/header';
import '@/styles/templates/product/productDetail.scss';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export const ProductDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const settings = {
    dots: true, // 페이지 네비게이션(점) 표시
    infinite: true, // 무한 루프
    slidesToShow: 1, // 한 번에 보여질 슬라이드 개수
    slidesToScroll: 1, // 슬라이딩 시 한 번에 넘어갈 슬라이드 개수
    swipeToSlide: true,
    autoplay: false, // 자동 재생
    arrows: false,
  };

  const slides = [
    <div className="product-detail__image" key={1}>
      <img src="/svg/cat.jpg" />
    </div>,
    <div className="product-detail__image" key={2}>
      <img src="/svg/default_profile.png" />
    </div>,
    <div className="product-detail__image" key={3}>
      <img src="/svg/cat.jpg" />
    </div>,
  ];

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
                onClick={toggleMenu}
              />
              {isMenuOpen && (
                <ul ref={menuRef} className="product-detail__menu">
                  <li>게시글 수정</li>
                  <li>삭제</li>
                </ul>
              )}
            </>
          }
        />

        <Slider className="product-detail__image-wrapper" {...settings}>
          {slides}
        </Slider>

        <div className="product-detail__main">
          <div className="product-detail__profile">
            <Link href={'/mypage'}>
              <img
                src="/svg/default_profile.png"
                alt="profile"
                className="profile__image"
              />
            </Link>

            <p className="profile__name">닉네임</p>
          </div>

          <select>
            <option>판매중</option>
            <option>예약중</option>
            <option>거래완료</option>
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

          <div className="product-detail__more-product">
            <div>
              <div className="more-product__title">
                <p>닉네임님의 판매상품</p>
                <Btn type="button" href="products" label="모두보기" />
              </div>

              <div className="more-product__grid">
                <div className="more-product">
                  <img src="/svg/cat.jpg" alt="cat" />
                  <p>고양이는 귀엽다 고양이는 귀엽다 고양이는 귀엽다</p>
                  <p>가격</p>
                </div>
                <div className="more-product">
                  <img src="/svg/cat.jpg" alt="cat" />
                  <p>고양이는 귀엽다</p>
                  <p>가격</p>
                </div>
                <div className="more-product">
                  <img src="/svg/cat.jpg" alt="cat" />
                  <p>고양이는 귀엽다 고양이는 귀엽다 고양이는 귀엽다</p>
                  <p>가격</p>
                </div>
                <div className="more-product">
                  <img src="/svg/cat.jpg" alt="cat" />
                  <p>고양이는 귀엽다</p>
                  <p>가격</p>
                </div>
              </div>
            </div>
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
