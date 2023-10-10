import React from 'react';
import '@/styles/components/btn.scss';
import Link from 'next/link';

export default function Btn({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <button>{label}</button>
    </Link>
  );
}
