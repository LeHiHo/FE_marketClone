'use client';

import '@/styles/templates/write/write.scss';
import Header from '@/components/header';
import { useState } from 'react';
import { postProducts } from '@/api/service';
import { useRouter } from 'next/navigation';
import CategoryModal from '@/templates/write/categoryModal';
import Btn from '@/components/btn';

export default function WirtePage() {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<FileList | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleWrite = async () => {
    try {
      if (images !== null) {
        const response = await postProducts(
          title,
          categoryId,
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

  const handleCategorySelect = (selectedCategory: string) => {
    setCategoryId(selectedCategory); // 선택된 카테고리로 상태 업데이트
  };

  return (
    <>
      <Header
        goBack={true}
        title={'중고거래 글쓰기'}
        button={<div className="writePage__temporaryStorage">임시저장</div>}
      />
      <div></div>
      <div className="writePage">
        <form className="writePage__input">
          <input
            type="file"
            name="product_img"
            onChange={(e) => setImages(e.target.files)}
            multiple
          />
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
              value={categoryId}
              onClick={toggleModal}
              placeholder="카테고리를 선택해주세요"
            />
            <CategoryModal
              isOpen={isOpen}
              onClose={toggleModal}
              onSelectCategory={handleCategorySelect}
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
            disabled={!title || !categoryId || !content || !price || !images}
            onClick={handleWrite}
            label="작성완료"
          />
        </footer>
      </div>
    </>
  );
}
