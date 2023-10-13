// Next.js 서버 모듈에서 필요한 타입들을 가져옵니다.
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 비동기 미들웨어 함수를 정의합니다.
export async function middleware(request: NextRequest) {
  // 로그인을 위한 외부 API에 POST 요청을 합니다.
  const apiResponse = await fetch('https://api.mwt-market.store/api/v1/login', {
    method: 'POST',
    // 요청과 함께 쿠키를 전송합니다.
    credentials: 'include',
    headers: {
      // 요청 본문의 콘텐츠 타입이 JSON임을 지정합니다.
      'Content-Type': 'application/json',
    },
    // 이메일과 비밀번호를 JSON 문자열로 변환하여 요청 본문으로 전송합니다.
    body: JSON.stringify({
      email: 'donghar@naver.com',
      password: '123123',
    }),
  });

  // 기본 Next.js 응답 객체를 생성합니다.
  const response = NextResponse.next();

  // API 응답에서 'Set-Cookie' 헤더를 추출하고 Next.js 응답 객체에 설정합니다.
  apiResponse.headers
    .getSetCookie()
    .forEach((x) => response.headers.set('Set-cookie', x));

  // 요청에서 'access-token' 쿠키를 검색합니다.
  // console.log(request.cookies.get('refresh-token'));
  // 요청에 'access-token' 쿠키가 있는지 확인합니다.
  console.log(request.cookies.has('access-token'));
  // 쿠키 삭제
  // request.cookies.delete('access-token')

  // 응답 객체를 반환합니다.
  return response;
}

// // 미들웨어를 위한 설정 객체입니다.
// export const config = {
//   // 이 미들웨어가 일치해야 하는 경로 패턴을 지정합니다.
//   matcher: '/login',
// };
