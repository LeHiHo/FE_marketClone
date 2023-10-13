'use client';

import Btn from '@/components/btn';
import '@/styles/templates/login/login.scss';
import Link from 'next/link';
import Header from '@/components/header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from '@/api/service';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await getAuth(email, password);
      if (response.data.statusCode === 200) {
        setIsLogin(true);
        router.push('/main');
        return response.data;
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data;
        console.error('Login failed:', errorData);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <>
      <Header title={'로그인'} />
      <div className="loginPage">
        <div className="loginPage__text">
          <p>이메일(ID)</p>
          <input
            type="email"
            name="useremail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>비밀번호(PW)</p>
          <input
            className="pw"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <footer>
          <Btn
            type="button"
            disabled={!email || !password} // 이메일과 비밀번호가 모두 입력되었을 때만 버튼 활성화
            onClick={handleLogin}
            label="로그인"
          />
          <div className="loginPage__text-pw">
            <p>비밀번호를 잊어버리셨나요?</p>
            <Link href="/login">비밀번호 찾기</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
