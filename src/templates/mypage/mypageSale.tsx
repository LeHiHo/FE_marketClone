import { getProducts } from '@/api/service';
import Header from '@/components/header';
import ProductItem from '@/components/productItem';
import ProductState from '@/components/productState';
import { AXIOSResponse, IProduct } from '@/types/interface';
import ProductStateList from '@/templates/product/productStateList/productStateList';

export default async function MypageSale() {
  const res: AXIOSResponse<IProduct[]> = await getProducts();
  const data = res.statusCode === 200 ? res.data : [];
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
