'use client';
import Header from '@/components/header';
import { useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';

export const ProductDetail = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  const handleOnclick = () => {
    setIsMenu(!isMenu);
  };
  return (
    <div id="product-detail">
      <Header
        goBack={true}
        border={false}
        title=""
        button={
          <>
            <CiMenuKebab
              size="26"
              background="#ccc"
              className="product-detail__icon"
              onClick={handleOnclick}
            />
            {isMenu && <div className="product-detail__menu">미니메뉴</div>}
          </>
        }
      />

      <div className="product-detail__images">
        <img src="" alt="" className="product-detail__image" />
      </div>

      <div className="product-detail_profile">
        <img src="" alt="" className="profile__image" />
        <p className="profile__name">닉네임</p>
        <select>
          <option>판매중</option>
          <option>예약중</option>
        </select>
        <p className="product-detail__title">제목</p>
        <p className="product-detail__price">가격</p>
        <p className="product-detail__category">카테고리</p>
        <p className="product-detail__time">게시시간</p>
        <p className="product-detail__content">본문</p>
      </div>

      <footer className="product-detail__footer">
        <AiOutlineHeart />
        <span>|</span>
        <p>가격</p>
        <Link href={'/chatList'}>
          <button>관련 채팅보기</button>
        </Link>
      </footer>
    </div>
  );
};
