'use client';

import { getProducts } from '@/api/service';
import Header from '@/components/header';
import ProductList from '@/components/productList';
import { AXIOSResponse, IProduct } from '@/types/interface';
import '@/styles/templates/main/main.scss';
import AddBtn from './addBtn';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
import Navbar from '@/components/navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function MainPage() {
  const [data, setData] = useState<IProduct[]>([]);
  const categoryParams = useSearchParams();
  const category = categoryParams.get('category') || undefined;

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<IProduct[]> = await getProducts(
        undefined,
        category,
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
