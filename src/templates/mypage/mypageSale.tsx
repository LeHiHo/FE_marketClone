'use client';

import Header from '@/components/header';
import ProductItem from '@/components/productItem';
import ProductState from '@/components/productState';
import 'src/styles/templates/mypage/mypageSales.scss';
import ProductStateList from '@/templates/product/productStateList/productStateList';
import { IProduct, IProductProps } from '@/types/interface';
import { useState, useEffect, Fragment } from 'react';

export default function MypageSale({ data }: IProductProps) {
  const [productList, setProductList] = useState<string>('all');
  const [reLoad, setReLoad] = useState<boolean>(false);
  const [myProducts, setMyProducts] = useState<IProduct[]>([]);
  const handleChangeList: React.Dispatch<React.SetStateAction<string>> = (
    state,
  ) => {
    setProductList(state);
  };

  useEffect(() => {
    if (data) {
      setMyProducts(() => {
        return data.filter((product) => {
          if (productList === 'all') {
            return true;
          } else if (
            productList === 'completed' &&
            product.status === '거래완료'
          ) {
            return true;
          } else if (productList === 'sale' && product.status === '판매중') {
            return true;
          }
          return false;
        });
      });
    } else {
      setMyProducts([]);
    }
  }, [productList, data, reLoad]);

  return (
    <div className="saleList">
      <Header goBack={true} title={'판매내역'} />
      <ProductStateList onChangeList={handleChangeList} />
      <ul className="product-list">
        {myProducts.length === 0 ? (
          <div>데이터가 없거나 패칭에 실패했습니다.</div>
        ) : (
          myProducts.map((product) => (
            <Fragment key={product.id}>
              <ProductItem product={product} />
              <ProductState product={product} setReLoad={setReLoad} />
            </Fragment>
          ))
        )}
      </ul>
    </div>
  );
}
