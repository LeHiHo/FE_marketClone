import MainPage from '@/templates/main/mainPage';
import { getProducts } from '@/api/service';

export default async function Main() {
  const { data } = await getProducts();

  return (
    <>
      <MainPage data={data} />
    </>
  );
}
