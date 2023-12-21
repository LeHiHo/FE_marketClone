'use server';

import { postAuth } from '@/api/service';
import parseCookies from '@/util/util';

export async function handleSubmit(formData: FormData) {
  console.log(formData.get('useremail'));
  console.log(formData.get('password'));

  const userEmail = formData.get('useremail')?.toString();
  const userPassword = formData.get('password')?.toString();
  if (userEmail && userPassword) {
    const response = await postAuth(userEmail, userPassword);
    if (response.headers['set-cookie']) {
      const parsedCookies = parseCookies(response.headers['set-cookie'], [
        'access-token',
        'refresh-token',
      ]);
      console.log(parsedCookies);
    }
  }
}
