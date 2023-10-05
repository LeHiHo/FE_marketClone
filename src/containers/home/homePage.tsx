import Btn from '@/components/btn';
import '@/styles/home.scss';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="home">
      <img src="/svg/오이마켓.svg" alt="오이마켓" />
      <div className="home__text">
        <h1>오늘의이웃</h1>
        <p>이제 내동네에서</p>
        <p>간편하게 중고거래 하자</p>
      </div>
      <Btn href="/signup" label="시작하기" />
      <div className="home__login-text">
        이미 계정이 있나요?
        <Link className="login" href="login">
          로그인
        </Link>
      </div>
    </div>
  );
}
