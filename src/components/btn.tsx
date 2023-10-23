'use client';
import React from 'react';
import '@/styles/components/btn.scss';
import { useRouter } from 'next/navigation';

interface BtnProps {
  type?: 'button' | 'submit' | 'reset';
  href?: string; // href는 선택적인 프로퍼티로 변경
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Btn({
  type = 'button',
  href,
  label,
  disabled,
  onClick,
}: BtnProps) {
  const router = useRouter();

  return (
    <div id="button" onClick={() => href && router.push(href)}>
      <button type={type} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    </div>
  );
}
