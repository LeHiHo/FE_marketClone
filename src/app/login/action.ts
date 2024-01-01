'use server';

import { postAuth } from '@/api/service';
import parseCookies from '@/util/parsedCookies';
import { cookies } from 'next/headers';

export async function LoginServerAction(formData: FormData) {
  const userEmail = formData.get('useremail')?.toString();
  const userPassword = formData.get('password')?.toString();

  if (userEmail && userPassword) {
    try {
      const res = await postAuth(userEmail, userPassword);
      if (res.data.statusCode === 400) {
        return {
          redirectUri: null,
          message: '이메일 또는 패스워드가 일치하지 않습니다.',
        };
      }

      if (res.headers['set-cookie']) {
        const parsedCookies = parseCookies(res.headers['set-cookie'], [
          'access-token',
          'refresh-token',
        ]);
        cookies().set({
          name: 'access-token',
          value: `${parsedCookies['access-token']}`,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 1800,
          domain: 'mwt-market.store',
        });
        cookies().set({
          name: 'refresh-token',
          value: `${parsedCookies['refresh-token']}`,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 86400,
          domain: 'mwt-market.store',
        });
      }
      return {
        redirectUri: '/main',
        message: '로그인에 성공했습니다.',
      };
    } catch (error: any) {
      return {
        redirectUri: null,
        message: '로그인에 실패했습니다.',
      };
    }
  } else {
    return {
      redirectUri: null,
      message: '아이디와 비밀번호를 입력해주세요',
    };
  }
}
