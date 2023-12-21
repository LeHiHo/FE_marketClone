import MypagePage from '@/templates/mypage/mypagePage';
import { getMyProductfetch } from '@/api/service';
import { cookies } from 'next/headers';

export default async function Mypage() {
  const accessToken = cookies().get('access-token');
  let myProductData = null;

  if (accessToken) {
    const token = accessToken.value;
    const res = await getMyProductfetch(token);
    myProductData = res.data;
  }
  return (
    <>
      <div>{myProductData}</div>
      <MypagePage />
    </>
  );
}
