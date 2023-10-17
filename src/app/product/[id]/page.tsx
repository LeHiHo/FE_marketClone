'use client';
import { ProductDetail } from '@/templates/product/productDetail';

type Params = {
  id: string;
};

export default function Page({ params }: { params: Params }) {
  console.log(params);

  return <ProductDetail />;
}
