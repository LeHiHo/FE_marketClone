import React, { ReactNode } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import '@/styles/components/header.scss';

interface HeaderProps {
  goBack?: boolean;
  border?: boolean;
  title?: string;
  children?: ReactNode;
  button?: ReactNode;
}

export default function Header({
  goBack,
  border,
  title,
  children,
  button,
}: HeaderProps) {
  return (
    <div id="header" className={`${border ? 'header__border--bottom' : ''}`}>
      {goBack && <AiOutlineArrowLeft className="header__btn--goback" />}
      <h1 className="header__title">{title}</h1>
      {children}
      <div className="header__btn__wrap">{button}</div>
    </div>
  );
}
