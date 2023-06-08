/* eslint-disable react/react-in-jsx-scope */
'use client';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

export default function Signup() {
  //save next router method inot variable
  const router = useRouter();

  //function used to handle signup form submission
  async function handleSubmit(event: any) {
    event.preventDefault();
    //data is the information inputted into the form
    const data = {
      username: String(event.target.username.value),
      email: String(event.target.email.value),
      password: String(event.target.password.value),
      type: 'sign up',
    };
    //make fetch request to the backend with the submitted info
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    //saved the response from the server into var
    const jsonResponse = await response.json();

    if (jsonResponse.status === 200) {
      //if signup successful, create cookie and reroute to formBuilder

      setCookie('key', jsonResponse.body);
      router.push('/formBuilder');

      window.location.reload();


    } 
  }

  return (
    <div className="bg-primary">
      <div className="flex justify-center items-center h-screen">
        <div className="h-1/2 w-1/2 relative justify-items-center">
        <div className="absolute inset-x-0 -top-40 z-0 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-20rem)] aspect-[1155/678] w-[80.125rem] -translate-x-1 rotate-[90deg] bg-gradient-to-tr from-[#FF0000] to-[#670000] opacity-30 sm:left-[calc(10%-30rem)] sm:w-[90.1875rem]"></div>
          </div>
          <h1 className="text-white relative text-5xl mb-10">Sign In</h1>
          <form className="min-h-full relative w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username"></label>
              <input
                type="text"
                required
                id="username"
                className="box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-2 rounded-lg hover:border-gray-400 border-4 hover:shadow-2xl"
                autoFocus
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email"></label>
              <input
                type="email"
                required
                id="email"
                className="box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-2 rounded-lg hover:border-gray-400 border-4 hover:shadow-2xl"
                autoFocus
                placeholder="Email"
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
