// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // let cookie = request.cookies.get('nextjs');
//   // console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
//   // const allCookies = request.cookies.getAll();
//   // console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

//   // request.cookies.has('nextjs'); // => true
//   // request.cookies.delete('nextjs');
//   // request.cookies.has('nextjs'); // => false

//   const response = NextResponse.next();
//   // response.cookies.set({
//   //   name: 'access-token',
//   //   value: 'fast',
//   //   path: '/',
//   //   httpOnly: true,
//   //   secure: true,
//   //   sameSite: 'none',
//   //   maxAge: 1800,
//   //   // domain: 'mwt-market.store',
//   // });
//   // const cookie = response.cookies.get('access-token');
//   // console.log(cookie);

//   return response;
// }
