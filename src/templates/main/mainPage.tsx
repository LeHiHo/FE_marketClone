'use client';

import { getProducts } from '@/api/service';
import Header from '@/components/header';
import ProductList from '@/components/productList';
import { AXIOSResponse, IProduct } from '@/types/interface';
import '@/styles/templates/main/main.scss';
import AddBtn from './addBtn';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function MainPage() {
  const [data, setData] = useState<IProduct[]>([]);
  const categoryParams = useSearchParams();
  const category = categoryParams.get('category') || '전체';
  const categoryId = categoryParams.get('categoryId') || undefined;

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<IProduct[]> = await getProducts(
        undefined,
        categoryId,
      );
      if (res.statusCode === 200) {
        setData(res.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="mainPage">
      <header>
        <Header
          title={category}
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
      </header>
      <section className="main__content">
        <ProductList data={data} />
        <AddBtn />
      </section>
      <Navbar />
    </div>
  );
}
