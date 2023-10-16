'use client';

import { getProductCategory } from '@/api/service';
import Header from '@/components/header';
import '@/styles/templates/category/category.scss';
import { AXIOSResponse } from '@/types/interface';
import { useEffect, useState } from 'react';

type CategoryType = {
  id: number;
  name: string;
};

export default function CategoryPage() {
  const [category, setCategory] = useState<CategoryType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<CategoryType[]> = await getProductCategory();
      if (res.statusCode === 200) {
        setCategory(res.data);
      }
    };

    fetchData();
  }, []);
  return (
    <div id="categoryPage">
      <Header goBack={true} title={'카테고리'} border={true} />
      <div className="category__content">
        {category.map((item: CategoryType) => (
          <div>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
