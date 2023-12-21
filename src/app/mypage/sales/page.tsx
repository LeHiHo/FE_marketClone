'use client';
// import MypageSale from '@/templates/mypage/mypageSale';
import { getMyProduct } from '@/api/service';
import { useEffect } from 'react';

export default function Mypage() {
  useEffect(() => {
    const fetch = async () => {
      const res = await getMyProduct();
      console.log(res);
    };
    fetch();
  }, []);

  // if (accessToken) {
  //   const token = accessToken.value;

  //   const res = await getMyProductfetch(
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYXV0aG4iOnsiaWQiOjE2LCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifSwiYXV0aGdyIjpbIlVTRVIiXSwiaXNzIjoibXd0LWJhY2stMSIsImlhdCI6MTcwMzE4MDEzMiwiZXhwIjoxNzAzMTgwNzMyfQ.sbL2LZJ8nD1tXVwLl2ZNaUcTMmHh0MM8u6H7b90JdEU',
  //   );
  // console.log(res);
  // console.log('요처어어어어어어어어어어ㅓㅇ', res);
  // myProductData = res.data;
  // }

  return (
    <>
      {/* {myProductData ? (
        <MypageSale data={myProductData} />
      ) : (
        <div>{myProductData}</div>
      )} */}
    </>
  );
}
