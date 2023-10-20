'use client';
import { getMyInfo, putEditProfile } from '@/api/service';
import Btn from '@/components/btn';
import Header from '@/components/header';
import '@/styles/templates/mypage/mypageEdit.scss';
import { AXIOSResponse, IUser } from '@/types/interface';

// 2. useRouter 가져오는 경로 수정
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsCamera } from 'react-icons/bs';

export default function MypageEditPage() {
  const router = useRouter();

  const [user, setUser] = useState<IUser>({
    email: '',
    nickname: '',
    tel: '',
    profileImage: '',
  });

  const [name, setName] = useState<string>('');

  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File>();

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<IUser> = await getMyInfo();
      if (res.statusCode === 200) {
        setUser(res.data);

        // 3. useEffect 내에서 setName을 사용하여 user.nickname 설정
        setName(res.data.nickname);
      } else {
        console.log('실패');
      }
    };
    fetchData();
  }, []);

  const convertURLtoFile = async (imageUrl: string, filename: string) => {
    console.log('변환 시작');
    const response = await fetch(imageUrl);
    console.log('fetch 완료');
    const blob = await response.blob();
    console.log('변환 완료');
    return new File([blob], filename, { type: blob.type });
  };

  const handleEditProfile = async () => {
    // 4. convertURLtoFile 함수 호출 시 await 사용
    const file = await convertURLtoFile(user.profileImage, 'image.png');

    try {
      const res = await putEditProfile(
        name || user.nickname,
        profileImage || file,
      );
      if (res.status === 200) {
        alert('프로필 수정이 완료되었습니다.');
        router.push('/mypage');
        router.refresh();
      }
    } catch (error) {
      // 6. 에러 처리 개선
      alert('프로필 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
      console.log(error);
    }
  };

  const handleImgOnClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files) {
      setProfileImage(input.files && input.files[0]);
    }
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewImg(e.target?.result as string); // Set the selected image URL
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  return (
    <div id="mypage-edit">
      <Header goBack={true} border={true} title="프로필" />

      <div className="mypage-edit__main">
        <div className="mypage-edit__image">
          <img src={previewImg || user.profileImage} alt="profile" />
          <label htmlFor="imgInput">
            <div className="mypage-edit__icon">
              <BsCamera size="28" />
              <input
                id="imgInput"
                className="mypage-edit__file-input"
                type="file"
                accept="image/*"
                onChange={handleImgOnClick}
              />
            </div>
          </label>
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
        <Btn label="완료" onClick={handleEditProfile} />
      </footer>
    </div>
  );
}
