import Header from '@/components/header';
import Link from 'next/link';

import { AiOutlineSearch } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Product() {
  return (
    <>
      <Header
        title={'개발자님'}
        border={true}
        button={
          <>
            <Link href="search">
              <AiOutlineSearch className="header__btn" />
            </Link>
            <Link href="category">
              <RxHamburgerMenu className="header__btn" />
            </Link>
          </>
        }
      />
    </>
  );
}
