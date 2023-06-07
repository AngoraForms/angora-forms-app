/* eslint-disable react/react-in-jsx-scope */
'use client';
import { useRouter } from 'next/navigation';
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

export default function Signup() {

  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();

    const data = {
      username: String(event.target.username.value),
      email: String(event.target.email.value),
      password: String(event.target.password.value),
      type: 'sign up'
    };

    const response = await fetch('/api/users',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });

    const jsonResponse = await response.json();

    if (jsonResponse.status === 200) {

      console.log('response is 200',jsonResponse);

      setCookie('key',jsonResponse.body);
      router.push('/formBuilder');
      
    } else {
      console.log('response is not 200', jsonResponse);

    } 
  }

  return (
    <div className="bg-primary">
      <div className = 'flex justify-center items-center h-screen'>
        <div className = 'h-1/2 w-1/2 justify-items-center'>
          <form className = 'min-h-full w-full space-y-4' onSubmit={handleSubmit}>
            <p className = 'text-3xl my-6 text-white'>Sign Up</p>
            <div>
              <label htmlFor = 'username'></label>
              <input type = 'text' required id = 'username' className = 'box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-2 rounded-lg hover:border-gray-400 border-4 hover:shadow-2xl' autoFocus placeholder = 'Username'/>
            </div>
            <div>
              <label htmlFor = 'email' ></label>
              <input type = 'email' required id = 'email' className = 'box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-2 rounded-lg hover:border-gray-400 border-4 hover:shadow-2xl' autoFocus placeholder = 'Email'/>
            </div>
            <div>
              <label htmlFor = 'password' ></label>
              <input type = 'password' required id = 'password' className = 'box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-2 rounded-lg hover:border-gray-400 border-4 hover:shadow-2xl' autoFocus placeholder = 'Password'/>
            </div>
            <button type = 'submit' className = 'text-white text-lg cursor-pointer bg-transparent hover:to-gray-300 hover:ring-2 hover:body-gray-300 hover:outline-none py-2 px-4 rounded-full'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}