
import Header from '@/components/header';
import ProductStateList from '@/templates/product/productStateList/productStateList';



export default function SalesList() {
  return (
    <>
    <Header goBack={true} border={true} title={'판매내역'}/>
    <ProductStateList/>
    </>
  )
}
