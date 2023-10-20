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

  const [name, setName] = useState<string>(user.nickname);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File>();
  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<IUser> = await getMyInfo();
      if (res.statusCode === 200) {
        setUser(res.data);
      }
    };
    fetchData();
    convertURLtoFile(user.profileImage);
  }, []);

  const convertURLtoFile = async (imageUrl: string) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const filename = 'image.jpg';
        const file = new File([blob], filename, { type: 'image/*' });
        const formData = new FormData();
        formData.append('imageFile', file);
        return file;
      })
      .catch((error) => {
        console.error('Error fetching or converting the image:', error);
      });
  };

  const handleEditProfile = async () => {
    try {
      if (profileImage) {
        const res = await putEditProfile(name || user.nickname, profileImage);
        if (res.status === 200) {
          alert('프로필 수정이 완료되었습니다.');
          router.push('/mypage');
          router.refresh();
        }
      }
    } catch (error) {
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
