import MypageSale from '@/templates/mypage/mypageSale';
import { getMyProductAxios } from '@/api/service';
import { cookies } from 'next/headers';

export default async function Mypage() {
  const accessToken = cookies().get('access-token');
  let myProductData = null;

  if (accessToken) {
    const token = accessToken.value;
    const res = await getMyProductAxios(token);
    myProductData = res.data;
  }

  return (
    <>
      <MypageSale data={myProductData} />
    </>
  );
}
