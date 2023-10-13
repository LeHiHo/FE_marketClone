'use client';

import Btn from '@/components/btn';
import '@/styles/templates/login/login.scss';
import Link from 'next/link';
import Header from '@/components/header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        'api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        // 여기에서 응답 데이터를 확인하고 필요한 처리를 수행합니다.
        setIsLogin(true);
        router.push('/main');
        console.log(data);
      } else {
        // 로그인 실패 시의 처리를 추가합니다.
        console.error('Login failed:', await response.json());
      }
    } catch (error) {
      const errorData = await response.json(); // 실패 응답의 본문을 가져옵니다.
      console.error('Login failed:', errorData);
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
