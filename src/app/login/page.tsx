import LoginPage from '@/templates/login/loginPage';
// import { postAuth } from '@/api/service';

export default async function Login() {
  // async function handleSubmit(formData: FormData) {
  //   'use server';
  //   console.log(formData.get('useremail'));
  //   console.log(formData.get('password'));

  //   const userEmail = formData.get('useremail')?.toString();
  //   const userPassword = formData.get('password')?.toString();
  //   if (userEmail && userPassword) {
  //     const response = await postAuth(userEmail, userPassword);
  //   }
  // }

  return (
    <>
      <LoginPage />
      {/* <div>
        <form action={handleSubmit}>
          <p>이메일(ID)</p>
          <input type="email" name="useremail" />
          <p>비밀번호(PW)</p>
          <input className="pw" type="password" name="password" />
          <button type="submit">버튼</button>
        </form>
      </div> */}
    </>
  );
}
