/* eslint-disable react/react-in-jsx-scope */
'use client';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';


export default function Login() {
  //save router method to variable
  const router = useRouter();

  //when form is submitted fetch request is made 
  async function handleSubmit(event: any) {
    event.preventDefault();
    //data is the info we are submitted to the backend
    const data = {
      usernameEmail: String(event.target.usernameEmail.value),
      password: String(event.target.password.value),
      type: 'log in',
    };

    //response from fetch request is saved into response variable
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    //response from server is saved
    const jsonResponse = await response.json();
    if (jsonResponse.status === 200) {
      //if the login request was successful, create a cookie with 
      //reroute to form builder after creating cookie
      setCookie('key',jsonResponse.body);

      router.push('/FormBuilder')

      setTimeout(() => {
        window.location.reload()
      }, 500)

      
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
              <input
                type="password"
                required
                id="password"
                className="box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-5 rounded-lg hover:border-gray-400 border-4 hover:shadow-2xl"
                autoFocus
                placeholder="Password"
              />
            </div>
            <input
              value="Start Building"
              type="submit"
              className="text-lg cursor-pointer bg-transparent hover:to-gray-300 hover:ring-2 hover:body-gray-300 hover:outline-none py-2 px-4 rounded-full text-white"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
