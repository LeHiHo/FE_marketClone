import MypageSale from '@/templates/mypage/mypageSale';
import { getMyProductfetch } from '@/api/service';
import { cookies } from 'next/headers';

export default async function Mypage() {
  const accessToken = cookies().get('access-token');
  let myProductData = null;

  if (accessToken) {
    const token = accessToken.value;
    try {
      const res = await getMyProductfetch(token);
      myProductData = res.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  return (
    <>
      <MypageSale data={myProductData} />
    </>
  );
}
