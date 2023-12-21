import MypagePage from '@/templates/mypage/mypagePage';
// import { getMyProductfetch } from '@/api/service';
// import { cookies } from 'next/headers';

export default async function Mypage() {
  // const accessToken = cookies().get('access-token');
  // const res = await getMyProductfetch(accessToken?.value);

  // console.log('엑세스',accessToken?.value);

  // oductData = null;  let myPr

  // if (accessToken) {
  //   const token = accessToken.value;
  //   const res = await getMyProductfetch(token);
  //   myProductData = res.data;
  // }
  return (
    <>
      <MypagePage />
    </>
  );
}
