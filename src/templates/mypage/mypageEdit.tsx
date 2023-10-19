'use client';
import Btn from '@/components/btn';
import Header from '@/components/header';
import '@/styles/templates/mypage/mypageEdit.scss';
import { BsCamera } from 'react-icons/bs';

export default function MypageEditPage() {
  const handleOnClick = () => {
    console.log('click');
  };

  return (
    <div id="mypage-edit">
      <Header goBack={true} border={true} title="프로필" />

      <div className="mypage-edit__main">
        <div className="mypage-edit__image">
          <img src="/svg/default_profile.png" alt="profile image" />
          <div className="mypage-edit__icon">
            <BsCamera size="28" />
          </div>
        </div>
        <input className="mypage-edit__input" type="text" />
      </div>

      <footer>
        <Btn label="완료" onClick={handleOnClick} />
      </footer>
    </div>
  );
}
