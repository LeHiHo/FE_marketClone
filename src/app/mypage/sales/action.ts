'use server';

import { getMyProductfetch } from '@/api/service';
import { cookies } from 'next/headers';

export async function MypageSaleServerAction() {
  const accessToken = cookies().get('access-token');

  if (accessToken) {
    const token = accessToken.value;

    try {
      const res = await getMyProductfetch(token);
      return res.data;
    } catch (e) {
      return null;
    }
  }
}
