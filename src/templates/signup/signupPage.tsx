'use client';
import { postSignUp } from '@/api/service';
import Btn from '@/components/btn';
import Header from '@/components/header';
import '@/styles/templates/signup/signup.scss';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  nickname: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
  });

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    setIsValid(true);

    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      nickname: '',
    };

    // 이메일 유효성 검사
    if (formData.email.trim() === '') {
      newErrors.email = '이메일을 입력하세요.';
      setIsValid(false);
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
      setIsValid(false);
    }

    // 비밀번호 유효성 검사
    if (formData.password.trim() === '') {
      newErrors.password = '비밀번호를 입력하세요.';
      setIsValid(false);
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
      setIsValid(false);
    }

    // 비밀번호 일치 검사
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      setIsValid(false);
    }

    // 휴대폰 번호 유효성 검사
    if (formData.phone.trim() === '') {
      newErrors.phone = '휴대폰 번호를 입력하세요.';
      setIsValid(false);
    } else if (!/^(010|02)-\d{3,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '010-1234-1234 형식으로 입력해주세요';
      setIsValid(false);
    }

    // 닉네임 유효성 검사
    if (formData.nickname.trim() === '') {
      newErrors.nickname = '닉네임을 입력하세요.';
      setIsValid(false);
    } else if (formData.nickname.length < 2 || formData.nickname.length > 20) {
      newErrors.nickname = '닉네임은 2자에서 20자 사이어야 합니다.';
      setIsValid(false);
    } else if (!/^[a-zA-Z0-9가-힣]+$/.test(formData.nickname)) {
      newErrors.nickname = '특수 문자를 포함할 수 없는 닉네임입니다.';
      setIsValid(false);
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleButtonClick = async () => {
    if (validateForm()) {
      try {
        const res = await postSignUp(
          formData.email,
          formData.password,
          formData.phone,
          formData.nickname,
        );
        console.log(res.data);
        alert('회원가입 성공!');
        router.push('/login');
      } catch (error: any) {
        if (error.response.data.statusCode === 401) {
          alert('이미 가입된 이메일이 있습니다.');
        } else if (error.response.data.statusCode === 402) {
          alert('이미 가입된 휴대폰 번호가 있습니다.');
        } else if (error.response.data.statusCode === 403) {
          alert('이미 가입된 닉네임이 있습니다.');
        } else {
          console.log(error.response);
          alert('회원가입 실패');
        }
      }
    } else {
      alert('유효하지 않은 값을 입력하셨습니다.');
    }
  };
  return (
    <div id="signup">
      <Header goBack={false} border={false} title="회원가입" />
      <form className="signup-form">
        <div>
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
          <p className="signup-form__message">{errors.email}</p>
        </div>
        <div>
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
          <p className="signup-form__message">{errors.password}</p>
        </div>
        <div>
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
          <p className="signup-form__message">{errors.confirmPassword}</p>
        </div>

        <div>
          <label className="signup-form__label" htmlFor="phone">
            휴대폰 번호
          </label>
          <input
            value={formData.phone}
            onChange={handleInputChange}
            id="phone"
            className="signup-form__input"
            type="text"
          />
          <p className="signup-form__message">{errors.phone}</p>
        </div>

        <div>
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
          <p className="signup-form__message">{errors.nickname}</p>
        </div>
        <footer>
          <Btn
            type="button"
            onClick={handleButtonClick}
            label="가입하기"
            disabled={!isValid}
          />
        </footer>
      </form>
    </div>
  );
}
