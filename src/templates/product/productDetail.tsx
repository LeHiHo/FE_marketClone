'use client';
import {
  addWishProduct,
  deleteWishProduct,
  getProductDetail,
} from '@/api/service';
import Btn from '@/components/btn';
import Header from '@/components/header';
import '@/styles/templates/product/productDetail.scss';
import { AXIOSResponse } from '@/types/interface';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

type Seller = {
  sellerId: number;
  profileImage: string;
  nickname: string;
};

type sellerProductInfos = {
  id: number;
  price: number;
  thumbnail: string;
  title: string;
};

type Product = {
  id: number;
  title: string;
  price: number;
  categoryName: string;
  content: string;
  images: string[];
  status: string;
  like: boolean;
  likes: number;
  myProduct: boolean;
  seller: Seller;
  sellerProductInfos: sellerProductInfos[];
};

export const ProductDetail = () => {
  const router = useRouter();
  const path = usePathname();
  const id = path.split('/')[2];

  const productId: number | undefined =
    typeof id === 'string' ? parseInt(id, 10) : undefined;

  const [product, setProduct] = useState<Product | null>(null);
  const [onLike, setOnLike] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<Product> = await getProductDetail(productId);
      try {
        if (res.statusCode === 200) {
          setProduct(res.data);
          setOnLike(res.data?.like);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      setProduct(null);
      [];
    };
  }, [productId]);

  const settings = {
    dots: true, // 페이지 네비게이션(점) 표시
    infinite: true, // 무한 루프
    slidesToShow: 1, // 한 번에 보여질 슬라이드 개수
    slidesToScroll: 1, // 슬라이딩 시 한 번에 넘어갈 슬라이드 개수
    swipeToSlide: true,
    autoplay: false, // 자동 재생
    arrows: false,
  };

  return (
    <div id="product-detail">
      <div className="product-detail">
        <Header
          goBack={true}
          border={false}
          title=""
          button={
            product?.myProduct && (
              <>
                <BsThreeDotsVertical
                  size="30"
                  background="#ccc"
                  className="product-detail__icon"
                  onClick={toggleMenu}
                />
                {isMenuOpen && (
                  <div
                    role="button"
                    ref={menuRef}
                    className="product-detail__menu">
                    <div onClick={() => router.push('/product/edit')}>
                      게시글 수정
                    </div>
                    <div>삭제</div>
                  </div>
                )}
              </>
            )
          }
        />

        <Slider className="product-detail__image-wrapper" {...settings}>
          {product?.images.map((image, index) => {
            return (
              <div className="product-detail__image" key={index}>
                <img src={image} alt="" />
              </div>
            );
          })}
        </Slider>

        <div className="product-detail__main">
          <div className="product-detail__profile">
            <div onClick={() => product?.myProduct && router.push('/mypage')}>
              <img
                src={product?.seller.profileImage}
                alt="profile"
                className="profile__image"
              />
            </div>

            <p className="profile__name">{product?.seller.nickname}</p>
          </div>

          {product?.myProduct && (
            <select>
              <option>판매중</option>
              <option>예약중</option>
              <option>거래완료</option>
            </select>
          )}

          <div className="product-detail__content-wrapper">
            <p className="product-detail__title">{product?.title}</p>
            <div className="product-detail__description">
              <p className="product-detail__category">
                {' '}
                {product?.categoryName}
              </p>
            </div>

            <p className="product-detail__content">{product?.content}</p>
          </div>

          {product?.sellerProductInfos && (
            <div className="product-detail__more-product">
              <div>
                <div className="more-product__title">
                  <p>{product?.seller.nickname}님의 판매상품</p>
                  <Btn
                    type="button"
                    href={`products?id=${product?.seller.sellerId}`}
                    label="모두보기"
                  />
                </div>

                <div className="more-product__grid">
                  {product?.sellerProductInfos
                    .slice(0, 4)
                    .map((product, index) => {
                      return (
                        <div
                          onClick={() => router.push(`/product/${product.id}`)}
                          className="more-product"
                          key={index}>
                          <img src={product.thumbnail} alt="sale" />
                          <p>{product.title}</p>
                          <p>{product.price}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="product-detail__footer">
        <div className="product-detail__footer--wrapper">
          {!onLike ? (
            <AiOutlineHeart
              size="28"
              className="product-detail__footer-icon"
              onClick={() => {
                setOnLike((prev) => !prev);
                addWishProduct(productId);
              }}
            />
          ) : (
            <AiFillHeart
              size="28"
              className="product-detail__footer-icon"
              onClick={() => {
                setOnLike((prev) => !prev);
                deleteWishProduct(productId);
              }}
            />
          )}
          <span>|</span>
          <p>{product?.price}</p>
        </div>

        <div onClick={() => router.push(`/product/${id}/chats`)}>
          <button className="product-detail__chat-button">관련 채팅보기</button>
        </div>
      </footer>
    </div>
  );
};
