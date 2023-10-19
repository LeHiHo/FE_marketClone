'use client';
import React, { ReactNode } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import '@/styles/components/header.scss';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  goBack?: boolean;
  border?: boolean;
  title?: string;
  children?: ReactNode;
  button?: ReactNode;
  color?: boolean;
}

export default function Header({
  goBack,
  border,
  title,
  children,
  button,
  color,
}: HeaderProps) {
  const router = useRouter();
  return (
    <div id="header" className={`${border ? 'header__border--bottom' : ''}`}>
      {goBack && (
        <BiArrowBack
          onClick={() => router.back()}
          className="header__btn--goback"
        />
      )}
      <h1 className="header__title">{title}</h1>
      {children}
      <div
        className={`header__btn__wrap ${
          color ? 'header__btn__wrap--color' : ''
        }`}>
        {button}
      </div>
    </div>
  );
}
