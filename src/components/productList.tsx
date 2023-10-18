import { IProduct } from '@/types/interface';
import ProductItem from './productItem';
import { useRouter } from 'next/navigation';

export default function ProductList({ data }: { data: IProduct[] }) {
  const router = useRouter();
  return (
    <ul className="products">
      {data?.map((product: IProduct) => (
        <div onClick={() => router.push(`/product/${[product.id]}`)}>
          <ProductItem key={product.id} product={product} />
        </div>
      ))}
    </ul>
  );
}
