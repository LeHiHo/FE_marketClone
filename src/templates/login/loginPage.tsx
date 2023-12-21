'use client';

import Btn from '@/components/btn';
import '@/styles/templates/login/login.scss';
import Header from '@/components/header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginServerAction } from '@/app/login/action';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  return (
    <form
      action={async (formData: FormData) => {
        const result = await LoginServerAction(formData);
        console.log(result);

        alert(result?.message);
        if (result?.redirect && result.redirectUri) {
          router.push(result.redirectUri);
        }
      }}>
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
