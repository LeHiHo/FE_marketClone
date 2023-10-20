'use client';
import Header from '@/components/header';

import { useState, useEffect, SetStateAction } from 'react';
import { AXIOSResponse, IProduct } from '@/types/interface';
import { getMyWishList } from '@/api/service';
import ProductList from '@/components/productList';
import ProductStateList from '../product/productStateList/productStateList';

export default function MypageWish() {
  const [filter, setFilter] = useState<string>('all');
  const [products, setProducts] = useState<IProduct[]>([]);
  const handleChangeList: React.Dispatch<React.SetStateAction<string>> = (
    value: SetStateAction<string>,
  ) => {
    setFilter(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<IProduct[]> = await getMyWishList();
      console.log(res);
      if (res.statusCode === 200) {
        setProducts(() => {
          return res.data.filter((product) => {
            if (filter === 'all') {
              return product;
            } else if (
              filter === 'completed' &&
              product.status === '거래완료'
            ) {
              return product;
            } else if (filter === 'sale' && product.status === '판매중') {
              return product;
            } else {
              return;
            }
          });
        });
      }
    };
    fetchData();
  }, [filter]);

  return (
    <>
      <Header goBack={true} title="판매상품 보기" />
      <ProductStateList onChangeList={handleChangeList} />
      <ProductList data={products} />
    </>
  );
}
