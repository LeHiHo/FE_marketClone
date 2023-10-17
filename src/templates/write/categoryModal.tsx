'use client';

import '@/styles/templates/write/categoryModal.scss';
import React, { KeyboardEvent, MouseEvent } from 'react';

const category = [
  '디지털기기',
  '생활가전',
  '가구/인테리어',
  '유아동',
  '생활/가공식품',
  '스포츠/레저',
  '여성잡화',
  '여성의류',
  '남성패션/잡화',
  '유아도서',
  '게임/취미',
  '뷰티/미용',
  '반려동물용품',
  '도서/티켓/음반',
  '식물',
  '기타 중고물품',
  '중고차',
];

interface CategoryModalProps {
  isOpen: boolean;
  onClose: (
    event: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>,
  ) => void;
  onSelectCategory: (category: string) => void;
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSelectCategory,
}: CategoryModalProps) {
  if (!isOpen) return null;

  const handleCategoryClick = (category: string) => {
    onSelectCategory(category); // 선택한 카테고리를 전달
    onClose();
  };

  const modalEscape = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };
  return (
    <div className="modal" onClick={modalEscape}>
      <div className="modal-content">
        {category.sort().map((list) => (
          <div key={list} onClick={() => handleCategoryClick(list)}>
            {list}
          </div>
        ))}
      </div>
    </div>
  );
}
