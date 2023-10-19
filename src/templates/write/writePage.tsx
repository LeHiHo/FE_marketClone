'use client';

import '@/styles/templates/write/write.scss';
import Header from '@/components/header';
import { useState } from 'react';
import { postProducts } from '@/api/service';
import { useRouter } from 'next/navigation';
import CategoryModal from '@/templates/write/categoryModal';
import { useHandleImg } from '@/templates/write/useHandleImg';
import Btn from '@/components/btn';

export default function WritePage() {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [images, setImages] = useState<FileList | null>(null);

  const [isModal, setIsModal] = useState<boolean>(false);

  const router = useRouter();

  const { imageArray, removeImage, handleImageChange } = useHandleImg();

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleWrite = async () => {
    try {
      if (imageArray.length > 0) {
        // 이미지 배열 -> file list로 변환
        // const dataTransfer = new DataTransfer();
        // imageArray.forEach((file) => dataTransfer.items.add(file));
        // const images = dataTransfer.files;

        const response = await postProducts(
          title,
          category,
          content,
          price,
          imageArray,
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

  const number = 2;

  const generateUniqueId = (image, index) => {
    return `${image.lastModified}-${image.name}-${index}`;
  };

  return (
    <>
      <Header
        goBack={true}
        title={'중고거래 글쓰기'}
        button={<div className="writePage__temporaryStorage">임시저장</div>}
      />
      <div className="writePage">
        <form className="writePage__input">
          <div className="previewImg">
            {imageArray.map((image, index) => (
              <div key={generateUniqueId(image, index)}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  width="50"
                  height="50"
                />
                <button onClick={() => removeImage(index)}>Delete</button>
              </div>
            ))}
          </div>
          <div className="writePage__input-container">
            <label htmlFor="fileInput" className="writePage__input-UploadBox">
              <img src="/svg/camera.svg" alt="사진기" />
              {`${number}/10`}
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
            type="number"
            name="product_price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
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
