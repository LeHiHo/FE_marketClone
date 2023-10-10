'use client'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/Ai';
import { GiHamburgerMenu } from 'react-icons/Gi';
import '@/styles/header.scss';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Header({
  isBackNav,
  content,
  isMainBar,
  href,
}: {
  isBackNav: boolean;
  content: string | null;
  isMainBar : boolean;
  href : string;
}) {
  function handleSearchClick() {
    isBackNav = true;
    const mainBar = document.querySelector('.mainBar');
    const searchBar = document.querySelector('.searchBar');
    const headerContent = document.querySelector('.header__content')
    mainBar?.classList.add('hide');
    headerContent?.classList.add('hide');
    searchBar?.classList.remove('hide');
    
  }

  
  return (
    <header className="header">
     
        <Link href={href} className={`backNav`+ isBackNav ?'' : 'hide' }>
          <AiOutlineArrowLeft />
        </Link>
     
      <p className='header__content'>{content}</p>
      {isMainBar && <div className="mainBar">
        <span onClick={handleSearchClick}>
          <AiOutlineSearch />
        </span>
        <GiHamburgerMenu />
      </div>}
      <div>
        <input
          className="searchBar hide"
          type="text"
          placeholder="우리동네에서 검색"
        />
      </div>
    </header>
  );
}
