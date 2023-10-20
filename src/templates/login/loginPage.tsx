'use client';

import Btn from '@/components/btn';
import '@/styles/templates/login/login.scss';
import Header from '@/components/header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postAuth } from '@/api/service';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await postAuth(email, password);
      if (response.data.statusCode === 200) {
        setIsLogin(!isLogin);
        router.push('/main');
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response?.data;
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
            <div onClick={() => router.push('/login')}>비밀번호 찾기</div>
          </div>
        </footer>
      </div>
    </>
  );
}
