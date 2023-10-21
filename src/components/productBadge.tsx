import 'src/styles/components/productBadge.scss';

export default function ProductBadge({
  productStatus,
  state,
}: {
  productStatus: string | undefined;
  state: string;
}) {
  return <p className={`badge ${state}`}>{productStatus}</p>;
}
