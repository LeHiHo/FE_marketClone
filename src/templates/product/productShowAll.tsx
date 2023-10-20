'use client';
import Header from '@/components/header';
import ProductStateList from './productStateList/productStateList';
import { useState } from 'react';
import { IProduct } from '@/types/interface';

export default function ProductShowAll() {
  const [filter, setFilter] = useState<string>('all');
  const [products, setProducts] = useState<IProduct[]>([]);
  const handleChangeList = (state: string) => {
    setFilter(state);
  };
  return (
    <>
      <Header goBack={true} title="판매상품 보기" />
      <ProductStateList onChangeList={handleChangeList} />
    </>
  );
}
