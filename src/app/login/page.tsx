/* eslint-disable react/react-in-jsx-scope */
'use client';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';


export default function Login() {
  const router = useRouter();
  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = {
      usernameEmail: String(event.target.usernameEmail.value),
      password: String(event.target.password.value),
      type: 'log in',
    };

    console.log(data);

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();
    
    if (jsonResponse.status === 200) {
      console.log('response is 200', jsonResponse);

      setCookie('key',jsonResponse.body);

      router.push('/formBuilder')

      setTimeout(() => window.location.reload(),500)
      
    } else {
      console.log('response is not 200', jsonResponse);
    }
  }

  return (
    <div className="bg-primary">
      <div className="flex justify-center items-center h-screen">
        <div className="h-1/2 w-1/2 relative z-0 justify-items-center">
          <div className="absolute inset-x-0 -top-40 z-0 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-20rem)] aspect-[1155/678] w-[80.125rem] -translate-x-1 rotate-[90deg] bg-gradient-to-tr from-[#FF0000] to-[#670000] opacity-30 sm:left-[calc(10%-30rem)] sm:w-[90.1875rem]"></div>
          </div>
          <h1 className="text-white relative text-5xl mb-10">Log In</h1>
          <form
            className="min-h-full w-full space-y-4 relative"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="usernameEmail"></label>
              <input
                type="text"
                required
                id="usernameEmail"
                className="box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-2 rounded-lg hover:border-gray-400 border-4 hover:shadow-2xl"
                autoFocus
                placeholder="Username or Email"
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                required
                id="password"
                className="box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-5 rounded-lg hover:border-gray-400 border-4 hover:shadow-2xl"
                autoFocus
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="text-lg cursor-pointer bg-black hover:to-gray-300 border-gray-500 hover:bg-gray-800 py-2 px-4 rounded-full text-white"
            >
              Login
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
