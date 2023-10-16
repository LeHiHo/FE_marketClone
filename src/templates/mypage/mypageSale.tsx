'use client';
import 'src/styles/templates/mypage/mypageSales.scss';
import { useEffect, useState, Fragment } from 'react';
import { getProducts } from '@/api/service';
import Header from '@/components/header';
import ProductItem from '@/components/productItem';
import ProductState from '@/components/productState';
import ProductStateList from '@/templates/product/productStateList/productStateList';
import { AXIOSResponse, IProduct } from '@/types/interface';

export default function MypageSale() {
  const [data, setData] = useState<IProduct[]>([]);
  const [productList, setProductList] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<IProduct[]> = await getProducts();
      if (res.statusCode === 200) {
        setData(res.data);
      }
    };

    fetchData();
  }, []);

  const test = data.filter((product) => {
    console.log('test');
    if (productList === 'all') {
      return product;
    } else if (productList === 'completed' && product.status === '판매완료') {
      return product;
    }
  });
  // console.log(data)
  return (
    <>
      <Header goBack={true} border={true} title={'판매내역'} />
      <ProductStateList />
      <ul className="product-list">
        {test.map((product) => (
          <Fragment key={product.id}>
            <ProductItem product={product} />
            <ProductState product={product} />
          </Fragment>
        ))}
      </ul>
    </>
  );
}
