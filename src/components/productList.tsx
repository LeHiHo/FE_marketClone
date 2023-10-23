import { IProduct } from '@/types/interface';
import ProductItem from './productItem';
import '@/styles/components/productList.scss';

export default function ProductList({ data }: { data: IProduct[] }) {
  return (
    <ul className="products">
      {data?.map((product: IProduct) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
