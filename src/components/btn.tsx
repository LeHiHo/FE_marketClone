import React from 'react';
import '@/styles/components/btn.scss';
import Link from 'next/link';

export default function Btn({
  type,
  href,
  label,
  disabled,
  onClick,
}: {
  type: 'button' | 'submit' | 'reset';
  href: string;
  label: string;
  disabled: boolean;
  onClick?: () => void;
}) {
  return (
    <Link id="button" href={href}>
      <button type={type} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    </Link>
  );
}
