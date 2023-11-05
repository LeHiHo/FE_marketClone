'use client';

import Header from '@/components/header';
import ProductList from '@/components/productList';
import '@/styles/templates/main/main.scss';
import AddBtn from './addBtn';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
interface MainPageProps {
  data: any[]; // Use a more specific type based on your data structure
}

export default function MainPage({ data }: MainPageProps) {
  const categoryParams = useSearchParams();
  const category = categoryParams.get('category') || undefined;

  const router = useRouter();

  return (
    <div id="mainPage">
      <header>
        <Header
          title={category ?? '전체'}
          border={true}
          button={
            <>
              <div onClick={() => router.push('/search')}>
                <AiOutlineSearch className="header__btn" />
              </div>
              <div onClick={() => router.push('/category')}>
                <RxHamburgerMenu className="header__btn" />
              </div>
            </>
          }
        />
      </header>
      <section className="main__content">
        <ProductList data={data} />
        <AddBtn />
      </section>
      <Navbar />
    </div>
  );
}
