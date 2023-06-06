'use client';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function NavHeader () {

  
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [cookieState, setCookieState] = useState<boolean>(false);
  const [forceRender, setForceRender] = useState<number>(0);


  
  useEffect(() => {
    const loggedInCookies = Cookies.get('key');
    if (loggedInCookies) setLoggedIn(true);
    else {
      removeCookies();
      setLoggedIn(false);
    }
  },[cookieState, forceRender]);


  const removeCookies = ():void => {
    const allCookies = Object.keys(Cookies.get());
    allCookies.forEach((curr) => {
      if (curr == 'key') {
        Cookies.remove(curr);
        setCookieState(false);
      }
    });
    setForceRender(forceRender + 1);
  };

  return (
    <>
      {(loggedIn === true) ? 
        (<>
          <Link href="/formBuilder" className="text-sm text-center hover:underline">
            Form Builder
          </Link>
          <Link href="/componentBank" className="text-sm text-center hover:underline">
            Component Bank
          </Link> 
          <Link onClick={removeCookies} href="/" className='text-sm bg-red-600 text-center hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded'>
            SignOut
          </Link>
        </>) : 
        (<>
          <Link href="/login" className="text-sm text-center hover:underline">
            Login
          </Link>
          <Link href="/signup" className="text-sm bg-red-600 text-center hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded">
            Signup
          </Link>
        </>)     
      }

    </>
  );
}

