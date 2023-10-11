import { IProduct } from '@/types/interface';
import ProductItem from './productItem';

export default async function ProductList({ data }: { data: IProduct[] }) {
  return (
    <ul className="products">
      {data?.map((product: IProduct) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
