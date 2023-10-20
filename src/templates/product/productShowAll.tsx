'use client';
import Header from '@/components/header';
import ProductStateList from './productStateList/productStateList';
import { useState, useEffect, SetStateAction } from 'react';
import { AXIOSResponse, IProduct } from '@/types/interface';
import { useSearchParams } from 'next/navigation';
import { getUserProducts } from '@/api/service';
import ProductList from '@/components/productList';

export default function ProductShowAll() {
  const [filter, setFilter] = useState<string>('all');
  const [products, setProducts] = useState<IProduct[]>([]);
  const idParams = useSearchParams();
  const id = idParams.get('id') || '';
  const handleChangeList: React.Dispatch<React.SetStateAction<string>> = (
    value: SetStateAction<string>,
  ) => {
    setFilter(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<IProduct[]> = await getUserProducts(id);
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
  console.log(products);

  return (
    <>
      <Header goBack={true} title="판매상품 보기" />
      <ProductStateList onChangeList={handleChangeList} />
      <ProductList data={products} />
    </>
  );
}
