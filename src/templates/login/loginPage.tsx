'use client';

import Btn from '@/components/btn';
import '@/styles/templates/login/login.scss';
import Header from '@/components/header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postAuth } from '@/api/service';

// interface LoginPageProps {
//   cookies: string[] | undefined;
// }

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postAuth(email, password);
      if (response.data.statusCode === 200) {
        setIsLogin(!isLogin);
        alert('로그인되었습니다.');
        router.push('/main');
      } else if (response.data.message === 'Invalid Username Or Password') {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      } else {
        console.log(response);
      }
    } catch (error: any) {
      if (error.response.data.message === 'no such user') {
        alert('가입되지 않은 이메일입니다.');
      } else {
        alert('로그인에 실패하였습니다.');
        console.error('Login failed:', error.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
            type="submit"
            disabled={!email || !password} // 이메일과 비밀번호가 모두 입력되었을 때만 버튼 활성화
            // onClick={handleLogin}
            label="로그인"
          />
          <div className="loginPage__text-pw">
            <p>비밀번호를 잊어버리셨나요?</p>
            <div onClick={() => router.push('/login')}>비밀번호 찾기</div>
          </div>
        </footer>
      </div>
    </form>
  );
};

export default LoginPage;
