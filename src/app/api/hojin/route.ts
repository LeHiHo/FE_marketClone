import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;

    // 외부 백엔드로 로그인 요청 전송
    const response = await client.post('/login', {
      email,
      password,
    });

    // 외부 백엔드의 응답을 클라이언트에게 전달
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: '에러남너' });
  }
}
