'use client';

import '@/styles/templates/write/write.scss';
import Header from '@/components/header';
import { useState } from 'react';
import { postProducts } from '@/api/service';
import { useRouter } from 'next/navigation';
import CategoryModal from '@/templates/write/categoryModal';
import { useHandleImg } from './useHandleImg';
import Btn from '@/components/btn';

export default function WritePage() {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [isModal, setIsModal] = useState<boolean>(false);

  const router = useRouter();

  const generateUniqueId = (image: File, index: number): string => {
    return `${image.lastModified}-${image.name}-${index}`;
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const { imageArray, images, removeImage, handleImageChange } = useHandleImg();

  const handleWrite = async () => {
    try {
      if (images) {
        const response = await postProducts(
          title,
          category,
          content,
          price,
          images,
        );
        if (response.statusCode === 200) {
          router.push('/main');
          console.log('Post success', response);
        } else {
          console.error('Post failed:', response);
        }
      }
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data;
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
              {imageArray.map((image, index) => (
                <div
                  className="previewImg-item"
                  key={generateUniqueId(image, index)}>
                  <img
                    src={URL.createObjectURL(image)}
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
            onClick={handleWrite}
            label="작성완료"
          />
        </footer>
      </div>
    </>
  );
}
