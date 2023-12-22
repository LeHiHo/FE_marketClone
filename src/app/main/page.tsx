import MainPage from '@/templates/main/mainPage';
import { getProductsfetch } from '@/api/service';

export default async function Main() {
  const res = await getProductsfetch();

  return (
    <>
      <MainPage data={res.data} />
    </>
  );
}
