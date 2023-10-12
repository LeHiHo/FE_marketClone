import { getProducts } from '@/api/product';
import Header from '@/components/header';
import ProductList from '@/components/productList';
import { IProduct } from '@/types/interface';
import '@/styles/templates/main/main.scss';
import AddBtn from './addBtn';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
import Link from 'next/link';
import Navbar from '@/components/navbar';

export default async function MainPage() {
  const data: IProduct[] = await getProducts();

  return (
    <div id="mainPage">
      <header>
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
      </header>
      <section className="main__content">
        <ProductList data={data} />
        <AddBtn />
      </section>
      <Navbar />
    </div>
  );
}
