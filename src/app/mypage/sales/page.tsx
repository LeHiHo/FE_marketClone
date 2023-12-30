import MypageSale from '@/templates/mypage/mypageSale';
import { getMyProductfetch } from '@/api/service';
import { cookies } from 'next/headers';

export default async function Mypage() {
  const accessToken = cookies().get('access-token');
  console.log('엑세스토큰', accessToken);
  let myProductData = null;
  if (accessToken) {
    const token = accessToken.value;
    const res = await getMyProductfetch(token);
    console.log(res);
    myProductData = res.data;
    console.log(myProductData);
  }

  return (
    <>
      {myProductData && myProductData.length > 0 ? (
        <MypageSale data={myProductData} />
      ) : (
        <div>상품 데이터가 없습니다.</div>
      )}
    </>
  );
}
