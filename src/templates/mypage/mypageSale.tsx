import { getProducts } from '@/api/product';
import Header from '@/components/header';
import ProductItem from '@/components/productItem';
import ProductState from '@/components/productState';

import ProductStateList from '@/templates/product/productStateList/productStateList';
import { IProduct } from '@/types/interface';

export default async function MypageSale() {
  const data: IProduct[] = await getProducts();
  return (
    <>
      <Header goBack={true} border={true} title={'판매내역'} />
      <ProductStateList />
      {data.map((product) => (
        <>
          <ProductItem key={product.id} product={product} />
          <ProductState />
        </>
      ))}
    </>
  );
}
