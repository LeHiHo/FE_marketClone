import MainPage from '@/templates/main/mainPage';
import { getProducts } from '@/api/service';

// export const getProducts = async (searchWord?: string, category?: string) => {
//   const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
//   const url = new URL('/products', baseURL);
//   const params = {
//     searchWord,
//     categoryNames: category,
//     pageSize: 300,
//   };

//   Object.keys(params).forEach(
//     (key) => params[key] && url.searchParams.append(key, params[key]),
//   );

//   try {
//     const res = await fetch(url.toString(), {
//       credentials: 'include',
//     });

//     if (!res.ok) {
//       const text = await res.text(); // read the body as text
//       throw new Error(`Fetch failed: ${res.status} - ${text}`);
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error);
//   }
// };

export default async function Main() {
  const data = await getProducts();

  return (
    <>
      <MainPage data={data} />
    </>
  );
}
