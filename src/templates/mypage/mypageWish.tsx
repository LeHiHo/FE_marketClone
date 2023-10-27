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
      if (res.statusCode === 200) {
        switch (filter) {
          case 'all':
            setProducts(() => {
              return res.data.map((product) => ({ ...product, like: true }));
            });
            break;
          case 'completed':
            setProducts(() => {
              return res.data
                .filter((product) => product.status === '거래완료')
                .map((product) => ({ ...product, like: true }));
            });
            break;
          case 'sale':
            setProducts(() => {
              return res.data
                .filter((product) => product.status === '판매중')
                .map((product) => ({ ...product, like: true }));
            });
            break;
          default:
            return;
        }
      }
    };
    fetchData();
  }, [filter]);
  return (
    <>
      <Header goBack={true} title="관심상품" />
      <ProductStateList onChangeList={handleChangeList} />
      <ProductList data={products} />
    </>
  );
}
