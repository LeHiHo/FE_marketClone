// const client = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
// });

// export const getProducts = async () => {
//   const res = await client.get('/products');
//   return res.data;
// };

// export const postSignUp = async (
//   email: string,
//   password: string,
//   phone: string,
//   nickname: string,
// ) => {
//   const res = await client.post('/signup', {
//     email: email,
//     password: password,
//     phone: phone,
//     nickname: nickname,
//   });
//   return res;
// };

// export const getAuth = async (email: string, password: string) => {
//   const res = await client.post('/login', {
//     email: email,
//     password: password,
//   });
//   return res;
// };

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getProducts = async () => {
  const res = await fetch(`${baseURL}/products`);
  const data = await res.json();
  return data;
};

export const postSignUp = async (
  email: string,
  password: string,
  phone: string,
  nickname: string,
) => {
  const res = await fetch(`${baseURL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      phone,
      nickname,
    }),
  });
  return res;
};

export const getAuth = async (email: string, password: string) => {
  const res = await fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return res;
};
