import MypageSale from '@/templates/mypage/mypageSale';
import { getMyProductfetch } from '@/api/service';

export default async function Mypage() {
  const res = await getMyProductfetch();

  return (
    <>
      <MypageSale data={res.data} />
    </>
  );
}
