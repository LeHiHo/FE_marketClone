import { IProduct } from '@/types/interface';
import ProductItem from './productItem';
import Link from 'next/link';

export default async function ProductList({ data }: { data: IProduct[] }) {
  return (
    <ul className="products">
      {data?.map((product: IProduct) => (
        <Link href={`/product/${product.id}`}>
          <ProductItem key={product.id} product={product} />
        </Link>
      ))}
    </ul>
  );
}
