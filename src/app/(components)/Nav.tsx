'use client';

import React, { useState, useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export function NavBar() {

  const router = useRouter();
  const [authenticated, setAuthenticated] = useState('none');

  function logout() {

    deleteCookie('key');
    setAuthenticated('none');
    router.push('/');

  }

  // we need to make currentToken a string or something. 
  // use effect in this space
  useEffect(() => {
    
    async function fetchData() {

      const currentToken = Cookies.get('key');
  
      if (currentToken) {
    
        const data = {
          currentToken: currentToken,
          type: 'auth'
        };
      
        try {
          const currentSession = await fetch('/api/users',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data),
          });
          const authenticatedSession = await currentSession.json();
          // handle error for logout. error in object authenticatedSession from async call on currentSession.json()
          console.log('authenticated session:', authenticatedSession);
    
          setAuthenticated(authenticatedSession.user);

        }
        catch {
          setAuthenticated('none');
        }
      } else {
        setAuthenticated('none');
      }
    }

    fetchData();
    
  });

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const clickOpenMenu = () => {
    console.log('open')
    setOpenMenu(!openMenu);
  }
  if(authenticated === 'none') {
    
    return (
      <div className='flex justify-center'>
        <Link href="/login" className="text-sm max-sm:mx-2 mx-7 my-auto hover:underline text-end">Login</Link>
        <Link href="/signup" className="text-sm bg-red-600 max-sm:mx-2 mx-7 my-auto hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded">Sign Up</Link>
      </div>
    );
    
  } else {
    
    return (
      <>
        {(openMenu === true) && (
          <div className='fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50'>
            <div className='fixed top-0 right-0 w-1/3 bg-white h-2/5 z-50 '>
              <button className='absolute top-1 p-2 right-1 text-red-400'
                onClick={clickOpenMenu}
              >
                &#10005;
              </button>
              <h1 className='text-xl text-center font-bold p-2 border-black border-b'>Menu</h1>
              <div className='flex flex-col items-center justify-between'>
                <p className="m-auto px-2 py-4 text-lg"> Welcome {authenticated} </p>
                <Link href="/componentBank" className="text-lg m-auto px-2 py-4 hover:underline"> Component Bank </Link>
                <Link href="/formBuilder" className="text-lg m-auto px-2 py-4 hover:underline"> Form Builder </Link>
                <Link className="text-center border border-black rounded-md p-2 m-2 w-1/2" href="/" onClick={logout}> Log out</Link>  
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none hidden max-lg:flex"
          onClick={clickOpenMenu}
        >
          <span className="hamburger-bar w-5 h-0.5 bg-gray-700 mb-1"></span>
          <span className="hamburger-bar w-5 h-0.5 bg-gray-700 mb-1"></span>
          <span className="hamburger-bar w-5 h-0.5 bg-gray-700 mb-1"></span>
        </div>
        <div className="flex max-lg:hidden">
          <p className="m-auto px-2 text-sm"> Welcome {authenticated} </p>
          <Link href="/componentBank" className="text-sm m-auto px-2 hover:underline"> Component Bank </Link>
          <Link href="/formBuilder" className="text-sm m-auto px-2 hover:underline"> Form Builder </Link>
          <Link className="border border-black rounded-md p-2" href="/" onClick={logout}> Log out</Link>    
        </div>
      </>
    );
  }

}

