import Header from '@/components/header';
import ProductStateList from '@/templates/product/productStateList/productStateList';



export default function SalesList() {
  return (
    <>
    <Header isBackNav={false} href={'/.'}isMainBar={true} content={'개발자님'} />
    <ProductStateList/>
    </>
  )
}
