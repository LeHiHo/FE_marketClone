import Btn from '@/components/btn';
import '@/styles/templates/login/login.scss';
import Link from 'next/link';
import Header from '@/components/header';

export default function LoginPage() {
  return (
    <>
      <Header title={'로그인'} />
      <div className="loginPage">
        <div className="loginPage__text">
          <p>이메일(ID)</p>
          <input type="email" name="useremail" />
          <p>비밀번호(PW)</p>
          <input className="pw" type="password" name="password" />
        </div>
        <footer>
          <Btn href="/main" label="로그인" />
          <div className="loginPage__text-pw">
            <p>비밀번호를 잊어버리셨나요?</p>
            <Link href="/login">비밀번호 찾기</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
