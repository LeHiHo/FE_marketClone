'use client';
import { getMyProduct, getProductDetail } from '@/api/service';
import Btn from '@/components/btn';
import Header from '@/components/header';
import '@/styles/templates/product/productDetail.scss';
import { AXIOSResponse, IProduct } from '@/types/interface';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

type Seller = {
  sellerId: number;
  profileImage: string;
  nickname: string;
};

type Product = {
  id: number;
  title: string;
  price: number;
  categoryId: number;
  content: string;
  images: string[];
  status: string;
  likes: number;
  seller: Seller;
};

export const ProductDetail = () => {
  const router = useRouter();
  const id = usePathname().split('/')[2];
  const productId: number | any =
    typeof id === 'string' ? parseInt(id, 10) : undefined;

  const [product, setProduct] = useState<Product | null>(null);
  const [myProduct, setMyProduct] = useState<IProduct[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<Product> = await getProductDetail(productId);
      try {
        if (res.statusCode === 200) {
          setProduct(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMyProductData = async () => {
      const res2: AXIOSResponse<IProduct[]> = await getMyProduct();
      try {
        if (res2.statusCode === 200) {
          setMyProduct(res2.data);
          console.log(res2.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchMyProductData();

    return () => {
      setProduct(null);
    };
  }, [id]);

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
            <>
              <BsThreeDotsVertical
                size="30"
                background="#ccc"
                className="product-detail__icon"
                onClick={toggleMenu}
              />
              {isMenuOpen && (
                <ul ref={menuRef} className="product-detail__menu">
                  <li onClick={() => router.push('/product/edit')}>
                    게시글 수정
                  </li>
                  <li>삭제</li>
                </ul>
              )}
            </>
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
            <div onClick={() => router.push('/mypage')}>
              <img
                src={product?.seller.profileImage}
                alt="profile"
                className="profile__image"
              />
            </div>

            <p className="profile__name">{product?.seller.nickname}</p>
          </div>

          <select>
            <option>판매중</option>
            <option>예약중</option>
            <option>거래완료</option>
          </select>

          <div className="product-detail__content-wrapper">
            <p className="product-detail__title">{product?.title}</p>
            <div className="product-detail__description">
              <p className="product-detail__category">{product?.categoryId}</p>
              <p className="product-detail__time">⋅ 1일 전</p>
            </div>

            <p className="product-detail__content">{product?.content}</p>
          </div>

          <div className="product-detail__more-product">
            <div>
              <div className="more-product__title">
                <p>{product?.seller.nickname}님의 판매상품</p>
                <Btn type="button" href="products" label="모두보기" />
              </div>

              <div className="more-product__grid">
                {myProduct?.slice(0, 4).map((product, index) => {
                  return (
                    <div className="more-product" key={index}>
                      <img src={product.thumbnail} alt="sale image" />
                      <p>{product.title}</p>
                      <p>{product.price}</p>
                    </div>
                  );
                })}
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

        <div onClick={() => router.push('/chatList')}>
          <button className="product-detail__chat-button">관련 채팅보기</button>
        </div>
      </footer>
    </div>
  );
};
