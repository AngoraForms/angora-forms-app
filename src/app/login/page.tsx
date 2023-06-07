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
      setCookie('key', jsonResponse.body);
      router.push('/formBuilder');
    } 
  }

  return (
    <div className="bg-primary">
      <div className="flex justify-center items-center h-screen">
        <div className="h-1/2 w-1/2 justify-items-center">
          <form
            className="min-h-full w-full space-y-4 "
            onSubmit={handleSubmit}
          >
            <p className="text-3xl my-6 text-white">Log In</p>
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
                className="box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-2 rounded-lg hover:border-gray-400 border-4 hover:shadow-2xl"
                autoFocus
                placeholder="Password"
              />
            </div>
            <input
              value="Login"
              type="submit"
              className="text-lg cursor-pointer bg-transparent hover:to-gray-300 hover:ring-2 hover:body-gray-300 hover:outline-none py-2 px-4 rounded-full text-white"
            />

          </form>

        </div>
      </div>
    </div>
  );
}
