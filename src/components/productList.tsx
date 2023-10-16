import { IProduct } from '@/types/interface';
import ProductItem from './productItem';

export default function ProductList({ data }: { data: IProduct[] }) {
  console.log('hi');
  return (
    <ul className="products">
      {data?.map((product: IProduct) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
