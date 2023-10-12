import { IProduct } from '@/types/interface';
import ProductItem from './productItem';

export default async function ProductList({ data,isUserProducts=false }: { data: IProduct[], isUserProducts:boolean }) {
  return (
    <ul className="products">
      {data?.map((product: IProduct) => (
        <ProductItem key={product.id} product={product} isUserProducts={isUserProducts}/>
      ))}
    </ul>
  );
}
