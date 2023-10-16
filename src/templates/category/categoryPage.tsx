'use client';

import { getProductCategory, getProducts } from '@/api/service';
import Header from '@/components/header';
import '@/styles/templates/category/category.scss';
import { AXIOSResponse, IProduct } from '@/types/interface';
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
        console.log(res.data);
        setCategory(res.data);
      }
    };

    fetchData();
  }, []);

  const onClick = async (categoryId: number) => {
    const res: AXIOSResponse<IProduct[]> = await getProducts(
      undefined,
      categoryId,
    );
    console.log(res);
  };
  return (
    <div id="categoryPage">
      <Header goBack={true} title={'카테고리'} border={true} />
      <div className="category__content">
        {category.map((item: CategoryType) => (
          <div
            onClick={() => {
              onClick(item.id);
            }}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
