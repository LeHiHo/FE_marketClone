// ProductDelete.tsx
import React, { MouseEvent } from 'react';
import '@/styles/templates/product/productDelete.scss';
import { deleteProducts } from '@/api/service';
import { useRouter } from 'next/navigation';

interface ProductDeleteProps {
  isModal: boolean;
  onClose: () => void;
  productID: number;
}

export default function ProductDelete({
  isModal,
  productID,
  onClose,
}: ProductDeleteProps) {
  const router = useRouter();
  if (!isModal) return null;

  const modalEscape = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteProducts(productID);
      if (response.data.statusCode === 200) {
        router.push('/mypage/sales');
        console.log('Delete success', response);
      } else {
        console.error('Delete failed:', response);
      }
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response?.data;
        console.error('Delete failed:', errorData);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <div className="modal_delete" onClick={modalEscape}>
      <div className="modal_delete-content">
        <p>게시글을 정말 삭제 하시겠어요?</p>
        <div>
          <button className="cancelDelete" onClick={onClose}>
            취소
          </button>
          <button
            className="approveDelete"
            onClick={() => {
              handleDelete();
              onClose();
            }}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
