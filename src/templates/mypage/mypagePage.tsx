'use client';

import { getMyInfo } from '@/api/service';
import Btn from '@/components/btn';
import Header from '@/components/header';
import Navbar from '@/components/navbar';
import { AXIOSResponse, IUser } from '@/types/interface';
import { useEffect, useState } from 'react';
import { RiFileList3Line } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import '@/styles/templates/mypage/mypage.scss';
import { useRouter } from 'next/navigation';

export default function MypagePage() {
  const [user, setUser] = useState<IUser>({
    email: '',
    nickname: '',
    tel: '',
    profileImage: '',
  });
  const [imageSrc, setImageSrc] = useState(user.profileImage);

  const router = useRouter();

  const onClick = (option: string) => {
    router.push(`/mypage/${option}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<IUser> = await getMyInfo();
      if (res.statusCode === 200) {
        setUser(res.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setImageSrc(user.profileImage + '?' + Date.now());
  }, [user.profileImage]);

  return (
    <div id="mypagePage">
      <Header title={'마이페이지'} border={true} />
      <div className="mypage-container">
        <div className="user__info">
          <img src={imageSrc} alt="유저 이미지" />
          <span>{user.nickname}</span>
          <Btn type="button" href="/mypage/edit" label="프로필수정" />
        </div>
        <div className="link-group">
          <div
            className="option"
            onClick={() => {
              onClick('sales');
            }}>
            <div className="icon">
              <RiFileList3Line />
            </div>
            <span>판매내역</span>
          </div>
          <div
            className="option"
            onClick={() => {
              onClick('wish');
            }}>
            <div className="icon">
              <AiOutlineHeart />
            </div>
            <span>관심목록</span>
          </div>
          <div
            className="option"
            onClick={() => {
              onClick('chats');
            }}>
            <div className="icon">
              <HiOutlineChatAlt2 />
            </div>
            <span>채팅목록</span>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
