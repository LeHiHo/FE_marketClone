import LoginPage from '@/templates/login/loginPage';
// import axios from 'axios';

// const client = axios.create({
//   withCredentials: true,
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
// });
// export const postAuth = async (email: string, password: string) => {
//   const res = await client.post('/login', {
//     email: email,
//     password: password,
//   });
//   return res.headers;
// };

export default async function Login() {
  // const res = await postAuth('hojin@naver.com', '123456');
  // console.log(res['set-cookie']);

  return (
    <>
      <LoginPage />
    </>
  );
}
