import { getProducts } from '@/api/product';
import Header from '@/components/header';
import ProductList from '@/components/productList';
import { IProduct } from '@/types/interface';

export default async function MainPage() {
  const data: IProduct[] = await getProducts();

  return (
    <>
      <Header title={'개발자님'} border={true} />
      <ProductList data={data} />
    </>
  );
}
