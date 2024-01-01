import MypageSale from '@/templates/mypage/mypageSale';
// import { getMyProductfetch } from '@/api/service';
// import { cookies } from 'next/headers';

export default async function Mypage() {
  // const accessToken = cookies().get('access-token');
  // let myProductData = null;
  // if (accessToken) {
  //   const token = accessToken.value;
  //   const res = await getMyProductfetch(token);
  //   myProductData = res.data;
  // }

  return (
    <>
      {/* {myProductData && myProductData.length > 0 ? (
        <MypageSale data={myProductData} />
      ) : (
        <div>상품 데이터가 없습니다.</div>
      )} */}
      <MypageSale />
    </>
  );
}
