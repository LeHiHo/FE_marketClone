import Btn from '@/components/btn';
import '@/styles/templates/login/login.scss';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <div className="sub_header">로그인</div>
      <div className="login">
        <div className="login__text">
          <p>이메일(ID)</p>
          <input />
          <p>비밀번호(PW)</p>
          <input />
        </div>
        <Btn href="/main" label="로그인" disabled={false} />
        <div className="login__pw-text">
          <p>비밀번호를 잊어버리셨나요?</p>
          <Link className="pw" href="login">
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </>
  );
}
