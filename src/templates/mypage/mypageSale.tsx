'use client';
import 'src/styles/templates/mypage/mypageSales.scss';
import { useEffect, useState, Fragment } from 'react';
import { getMyProduct } from '@/api/service';
import Header from '@/components/header';
import ProductItem from '@/components/productItem';
import ProductState from '@/components/productState';
import ProductStateList from '@/templates/product/productStateList/productStateList';
import { AXIOSResponse, IProduct } from '@/types/interface';

export default function MypageSale() {
  const [data, setData] = useState<IProduct[]>([]);
  const [productList, setProductList] = useState<string>('all');
  const [reLoad, setReLoad] = useState<boolean>(false);
  const [myProducts, setMyProducts] = useState<IProduct[]>([]);
  const handleChangeList = (state: string) => {
    setProductList(state);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<IProduct[]> = await getMyProduct();
      if (res.statusCode === 200) {
        setMyProducts(() => {
          return res.data.filter((product) => {
            if (productList === 'all') {
              return product;
            } else if (
              productList === 'completed' &&
              product.status === '거래완료'
            ) {
              return product;
            } else if (productList === 'sale' && product.status === '판매중') {
              return product;
            } else {
              return;
            }
          });
        });
      }
    };
    fetchData();
  }, [productList, reLoad]);
  return (
    <>
      <Header goBack={true} border={true} title={'판매내역'} />
      <ProductStateList onChangeList={handleChangeList} />
      <ul className="product-list">
        {myProducts.map((product) => (
          <Fragment key={product.id}>
            <ProductItem product={product} />
            <ProductState product={product} setReLoad={setReLoad} />
          </Fragment>
        ))}
      </ul>
    </>
  );
}
