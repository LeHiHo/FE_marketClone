import MypagePage from '@/templates/mypage/mypagePage';
import { getMyProductAxios } from '@/api/service';
import { cookies } from 'next/headers';

export default async function Mypage() {
  const accessToken = cookies().get('access-token');
  const res = await getMyProductAxios(accessToken?.value);
  console.log(accessToken);
  console.log(res);

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
