'use client';
import { getMyInfo, putEditProfile } from '@/api/service';
import Btn from '@/components/btn';
import Header from '@/components/header';
import '@/styles/templates/mypage/mypageEdit.scss';
import { AXIOSResponse, IUser } from '@/types/interface';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsCamera } from 'react-icons/bs';

export default function MypageEditPage() {
  const router = useRouter();

  const [isEditImg, setIsEditImg] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    email: '',
    nickname: '',
    tel: '',
    profileImage: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<IUser> = await getMyInfo();
      if (res.statusCode === 200) {
        setUser(res.data);
      }
    };
    fetchData();
  }, []);

  const [name, setName] = useState<string>(user.nickname);
  const [img, setImg] = useState<string>(user.profileImage);

  const handleOnClick = async () => {
    try {
      const res = await putEditProfile(name, img);
      if (res.status === 200) {
        alert('프로필 수정이 완료되었습니다.');
        router.push('/mypage');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImgOnClick = () => {
    // 배경 색 바뀌고, img가 input으로 바뀌어야 함. 미리보기도 떠야 함. footer도 변해야 함.
    console.log('click');
  };

  return (
    <div id="mypage-edit">
      <Header goBack={true} border={true} title="프로필" />

      <div className="mypage-edit__main">
        <div className="mypage-edit__image">
          <img src={user.profileImage} alt="profile" />
          <div onClick={handleImgOnClick} className="mypage-edit__icon">
            <BsCamera size="28" />
          </div>
        </div>
        <div className="mypage-edit__input">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={user.nickname}
          />
        </div>
      </div>

      <footer className="mypage-edit__footer">
        <Btn label="완료" onClick={handleOnClick} />
      </footer>
    </div>
  );
}
