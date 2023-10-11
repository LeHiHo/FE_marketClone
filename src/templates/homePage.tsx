import Btn from '@/components/btn';
import '@/styles/templates/home.scss';
import Link from 'next/link';
import Header from '@/components/header';

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="homePage">
        <img className="homePage__img" src="/svg/오이마켓.svg" alt="오이마켓" />
        <div className="homePage__text">
          <h1>오늘의이웃</h1>
          <p>이제 내동네에서</p>
          <p>간편하게 중고거래 하자</p>
        </div>
        <footer>
          <Btn href="/signup" label="시작하기" />
          <div className="homePage__text--login">
            이미 계정이 있나요?
            <Link href="/login">로그인</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
