import { AiOutlineArrowLeft } from 'react-icons/Ai';
import '@/styles/header.scss';
import Link from 'next/link';

export default function Header({
  isBackNav,
  href,
  content,
}: {
  isBackNav: boolean;
  href: string;
  content: string | null;
}) {
  return (
    <header>
      {isBackNav && (
        <Link href={href} className="backNav">
          
            <AiOutlineArrowLeft />
          
        </Link>
      )}
      <p>{content}</p>
    </header>
  );
}
