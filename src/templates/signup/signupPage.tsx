'use client';
import '@/styles/signup.scss';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  nickname: string;
}
export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    nickname: '',
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  useEffect(() => {
    if (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.name &&
      formData.phone &&
      formData.nickname &&
      formData.password === formData.confirmPassword
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    if (formData.password === formData.confirmPassword) {
      setErrormessage('');
    } else {
      setErrormessage('비밀번호가 일치하지 않습니다.');
    }
  }, [
    formData.email,
    formData.password,
    formData.confirmPassword,
    formData.name,
    formData.phone,
    formData.nickname,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // const emailIsValid = ''; // 이메일 유효성 검사
    // const passwordIsValid = ''; // 비밀번호 유효성 검사
  };

  const handleSubmit = async () => {
    console.log(formData);
    // try {
    //   // 클라이언트에서 입력한 데이터를 서버로 전송
    //   const response = await axios.post('/api/signup', formData);

    //   // 서버로부터의 응답 처리
    //   if (response.data.success) {
    //     alert('회원가입이 성공적으로 완료되었습니다.');
    //     // 필요한 리다이렉트 또는 다른 작업 수행
    //   } else {
    //     alert('회원가입에 실패했습니다.');
    //   }
    // } catch (error) {
    //   console.error('회원가입 오류:', error);
    //   alert('회원가입 중 오류가 발생했습니다.');
    // }
  };
  return (
    <form className="signup-form">
      <label className="signup-form__label" htmlFor="email">
        이메일(ID)
      </label>
      <input
        value={formData.email}
        onChange={handleInputChange}
        id="email"
        className="signup-form__input"
        type="email"
      />
      <label className="signup-form__label" htmlFor="password">
        비밀번호(PW)
      </label>
      <input
        value={formData.password}
        onChange={handleInputChange}
        id="password"
        className="signup-form__input"
        type="password"
      />
      <label className="signup-form__label" htmlFor="confirmPassword">
        비밀번호 확인(PW)
      </label>
      <input
        value={formData.confirmPassword}
        onChange={handleInputChange}
        id="confirmPassword"
        className="signup-form__input"
        type="password"
      />
      <label className="signup-form__label" htmlFor="name">
        이름
      </label>
      <input
        value={formData.name}
        onChange={handleInputChange}
        id="name"
        className="signup-form__input"
        type="text"
      />
      <label className="signup-form__label" htmlFor="phone">
        핸드폰번호
      </label>
      <input
        value={formData.phone}
        onChange={handleInputChange}
        id="phone"
        className="signup-form__input"
        type="text"
      />
      <label className="signup-form__label" htmlFor="nickname">
        닉네임
      </label>
      <input
        value={formData.nickname}
        onChange={handleInputChange}
        id="nickname"
        className="signup-form__input"
        type="text"
      />
      <p className="signup-message">{errorMessage}</p>
      <button
        onClick={handleSubmit}
        className="submit-button"
        type="button"
        disabled={!isValid}>
        가입하기
      </button>
    </form>
  );
}
