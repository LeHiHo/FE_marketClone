
import { getProducts } from '@/api/product';
import Header from '@/components/header';
import ProductList from '@/components/productList';
import ProductStateList from '@/templates/product/productStateList/productStateList';
import { IProduct } from '@/types/interface';



export default async function SalesList() {
  const data: IProduct[] = await getProducts();
  return (
    <>
    <Header goBack={true} border={true} title={'판매내역'}/>
    <ProductStateList/>
    <ProductList data={data} isUserProducts={true} />
    </>
  )
}

