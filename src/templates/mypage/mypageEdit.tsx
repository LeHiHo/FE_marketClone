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
        try {
          const file = await convertURLtoFile(res.data.profileImage);
          setProfileImage(file);
        } catch (error) {
          console.error('Failed to convert profile image to file:', error);
        }
      } else {
        console.log('실패');
      }
    };
    fetchData();
  }, []);

  const convertURLtoFile = async (imageUrl: string): Promise<File> => {
    try {
      const response = await fetch(imageUrl, { mode: 'no-cors' });
      const blob = await response.blob();
      const filename = 'profile';
      const file = new File([blob], filename, { type: blob.type });
      return file;
    } catch (error) {
      console.error('Error fetching or converting the image:', error);
      throw new Error('Image conversion failed');
    }
  };

  const handleEditProfile = async () => {
    try {
      if (profileImage) {
        const res = await putEditProfile(name || user.nickname, profileImage);
        if (res.status === 200) {
          alert('프로필 수정이 완료되었습니다.');
          router.push('/mypage');
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      alert('프로필 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files) {
      setProfileImage(input.files && input.files[0]);
    }
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewImg(e.target?.result as string);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  return (
    <div id="mypage-edit">
      <Header goBack={true} border={true} title="프로필" />

      <div className="mypage-edit__main">
        <div className="mypage-edit__image">
          <img
            src={previewImg || user.profileImage + '?' + new Date().getTime()}
            alt="profile"
          />
          <label htmlFor="imgInput">
            <div className="mypage-edit__icon">
              <BsCamera size="28" />
              <input
                id="imgInput"
                className="mypage-edit__file-input"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
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
