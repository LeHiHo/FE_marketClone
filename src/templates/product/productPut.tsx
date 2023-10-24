'use client';

import '@/styles/templates/write/write.scss';
import Header from '@/components/header';
import { useState, useEffect } from 'react';
import { putProducts, getProductDetail } from '@/api/service';
import CategoryModal from '@/templates/write/categoryModal';
import { useHandleImg } from '@/templates/write/useHandleImg';
import Btn from '@/components/btn';
import { useRouter, usePathname } from 'next/navigation';
import { AXIOSResponse } from '@/types/interface';

export default function ProductPut() {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);
  const [imgFiles, setImgFiles] = useState<File[] | string[]>([]);

  type Product = {
    id: number;
    title: string;
    price: string;
    categoryName: string;
    content: string;
    images: string[];
    status: string;
    likes: number;
    myProduct: boolean;
    seller: Seller;
    sellerProductInfos: sellerProductInfos[];
    like: boolean;
  };

  const router = useRouter();
  const id = parseInt(usePathname().split('/')[2]);

  // const urlToFile = async (
  //   url: string,
  //   filename: string,
  //   mimeType: string,
  // ): Promise<File> => {
  //   const res = await fetch(url, { mode: 'no-cors' });
  //   const blob = await res.blob();
  //   return new File([blob], filename, { type: mimeType });
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: AXIOSResponse<Product> = await getProductDetail(id);
        if (res.statusCode === 200) {
          const {
            title = '',
            categoryName = '',
            content = '',
            price = '',
          } = res.data;

          setTitle(title);
          setCategory(categoryName);
          setContent(content);
          setPrice(price);
          const imageUrls = res.data.images; // 먼저 images를 가져온다
          setImgFiles(imageUrls);
          // if (imageUrls) {
          //   const files = await Promise.all(
          //     imageUrls.map((url) => urlToFile(url, 'filename', 'image/*')), // filename과 mimeType은 적절하게 설정
          //   );
          //   setImgFiles(files);
          // }
        }
      } catch (error: any) {
        if (error.res) {
          const errorData = error.res?.data;
          console.error('get failed:', errorData);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    };
    fetchData();
  }, [id]);

  const generateUniqueId = (image: File, index: number): string => {
    return `${image.lastModified}-${image.name}-${index}`;
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const { imageArray, images, removeImage, handleImageChange } =
    useHandleImg(imgFiles);

  const handleEdit = async () => {
    try {
      if (images) {
        const res = await putProducts(
          id,
          title,
          category,
          content,
          price,
          images,
        );
        if (res.data.statusCode === 200) {
          router.push('/main');
          console.log('수정완료');
        } else {
          console.error('Post failed:', res);
        }
      }
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response?.data;
        console.error('Post failed:', errorData);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const imgCount = imageArray?.length;

  return (
    <>
      <Header
        goBack={true}
        title={'중고거래 글쓰기'}
        button={<div className="writePage__temporaryStorage">임시저장</div>}
      />
      <div className="writePage">
        <form className="writePage__input">
          <div className="writePage__input-container">
            <div className="previewImg">
              <label htmlFor="fileInput" className="writePage__input-UploadBox">
                <img src="/svg/camera.svg" alt="camera" />
                <div>
                  <span className="imgCount">{imgCount}</span>/10
                </div>
                <input
                  className="writePage__input-fileUpload"
                  accept="image/*"
                  id="fileInput"
                  type="file"
                  name="product_img"
                  onChange={handleImageChange}
                  multiple
                />
              </label>
              {imageArray.map((image: any, index: number) => (
                <div
                  className="previewImg-item"
                  key={generateUniqueId(image, index)}>
                  <img
                    src={
                      image instanceof Blob || image instanceof File
                        ? URL.createObjectURL(image)
                        : image
                    }
                    alt={`Uploaded ${index}`}
                  />
                  <div className="x_btn" onClick={() => removeImage(index)}>
                    <img src="/svg/x_btn.svg" alt="x_btn" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p>제목</p>
          <input
            type="text"
            name="product_title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 입력해주세요"
          />
          <div>
            <p>카테고리</p>
            <input
              type="text"
              readOnly
              name="product_category"
              value={category}
              onClick={toggleModal}
              placeholder="카테고리를 선택해주세요"
            />
            <CategoryModal
              isModal={isModal}
              onClose={toggleModal}
              selectCategory={handleSelectCategory}
            />
          </div>
          <p>가격</p>
          <input
            type="text" // 'number' 대신 'text'를 사용
            value={price}
            onChange={(e) => {
              const newValue = e.target.value;
              // 숫자 또는 빈 문자열만 허용
              const isNumeric = /^[0-9]*$/.test(newValue);
              if (isNumeric) {
                setPrice(newValue);
              }
            }}
            placeholder="가격을 입력해주세요"
          />
          <p>자세한 설명</p>
          <textarea
            name="product_content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="writePage__input-content"
            placeholder="게시글 내용을 작성해주세요. 품목 및 판매금지품목은 게시가
            제한됩니다."></textarea>
        </form>
        <footer>
          <Btn
            type="button"
            disabled={!title || !category || !content || !price || !images}
            onClick={handleEdit}
            label="작성완료"
          />
        </footer>
      </div>
    </>
  );
}
