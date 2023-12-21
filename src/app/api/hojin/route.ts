import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const client = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const email = 'test@test.com';
  const password = '123456';

  try {
    const response = await client.post('/login', { email, password });
    const cookies = response.headers['set-cookie'];

    if (cookies) {
      cookies.forEach((cookie) => res.setHeader('Set-Cookie', cookie));
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// export async function POST(req: Request) {
//   const res = await req.json();
//   console.log(res.email);
//   return NextResponse.json({ res });
// }

// try {
//   // 외부 백엔드로 로그인 요청 전송
//   const res = await client.post('/login', {
//     email,
//     password,
//   });

//   // 외부 백엔드의 응답을 클라이언트에게 전달
//   res.status(response.status).json(response.data);
// } catch (error: any) {
//   res
//     .status(error.response?.status || 500)
//     .json(error.response?.data || { message: '에러남너' });
// }
