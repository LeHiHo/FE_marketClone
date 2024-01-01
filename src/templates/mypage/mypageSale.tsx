'use client';

import Header from '@/components/header';
import ProductItem from '@/components/productItem';
import ProductState from '@/components/productState';
import 'src/styles/templates/mypage/mypageSales.scss';
import ProductStateList from '@/templates/product/productStateList/productStateList';
import { IProduct } from '@/types/interface';
import { useState, useEffect, Fragment } from 'react';
import { MypageSaleServerAction } from '@/app/mypage/sales/action';
// import { getMyProduct } from '@/api/service';

export default function MypageSale() {
  const [productList, setProductList] = useState<string>('all');
  const [reLoad, setReLoad] = useState<boolean>(false);
  const [myProducts, setMyProducts] = useState<IProduct[]>([]);
  const handleChangeList: React.Dispatch<React.SetStateAction<string>> = (
    state,
  ) => {
    setProductList(state);
  };

  // useEffect(() => {
  //   const fetchDatamy = async () => {
  //     try {
  //       const foo = await getMyProduct();
  //       console.log(foo);
  //     } catch (error) {
  //       console.error('Failed to fetch data:', error);
  //     }
  //   };

  //   fetchDatamy();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await MypageSaleServerAction();
        console.log(data);
        if (data) {
          const filteredProducts = data.filter((product: any) => {
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
          setMyProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [productList, reLoad]);

  return (
    <div className="saleList">
      <Header goBack={true} title={'판매내역'} />
      <ProductStateList onChangeList={handleChangeList} />
      <ul className="product-list">
        {myProducts === null || myProducts === undefined ? (
          <div>데이터 패칭 실패</div>
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
