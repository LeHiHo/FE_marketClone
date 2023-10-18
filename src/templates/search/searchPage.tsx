'use client';

import { getProducts } from '@/api/service';
import Header from '@/components/header';
import ProductList from '@/components/productList';
import '@/styles/templates/search/search.scss';
import { AXIOSResponse, IProduct } from '@/types/interface';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [keyword, setKeyword] = useState<string>('');
  const [data, setData] = useState<IProduct[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res: AXIOSResponse<IProduct[]> = await getProducts(keyword);
    if (res.statusCode === 200) {
      setData(res.data);
    }
  };
  return (
    <div id="searchPage">
      <Header goBack={true} border={true}>
        <form onSubmit={onSubmit}>
          <label className="searchBar__wrap">
            <input
              className="searchBar"
              type="text"
              placeholder="검색어를 입력해주세요."
              onChange={onChange}
              value={keyword}
            />
          </label>
        </form>
      </Header>
      <ProductList data={data} />
    </div>
  );
}
