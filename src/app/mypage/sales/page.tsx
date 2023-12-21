import MypageSale from '@/templates/mypage/mypageSale';
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
      {myProductData ? (
        <MypageSale data={myProductData} />
      ) : (
        <div>데이터를 불러오는데 실패했습니다.</div>
      )}
    </>
  );
}
