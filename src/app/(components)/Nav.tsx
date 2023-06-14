'use client';

import React, { useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HamburgerMenu from './HamburgerMenu';
import { loginAuthRedux, logoutAuthRedux } from '../GlobalRedux/Features/slice/slice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../GlobalRedux/store';

export function NavBar() {
  const auth = useSelector((state:RootState) => state.auth.authenticated)
  const dispatch = useDispatch();

  const router = useRouter();
  // const [authenticated, setAuthenticated] = useState<string>('none');

  function logout() {

    deleteCookie('key');
    dispatch(logoutAuthRedux());
    // setAuthenticated('none');
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
          dispatch(loginAuthRedux(authenticatedSession.user))
          // setAuthenticated(authenticatedSession.user);

        }
        catch {
          dispatch(logoutAuthRedux())
          // setAuthenticated('none');
        }
      } else {
        dispatch(logoutAuthRedux())
        // setAuthenticated('none');
      }
    }

    fetchData();
    
  },[auth]);

  if(auth === 'none') {
    
    return (
      <div className="flex justify-between mx-4">
        <span className="justify-self-start">
          <Link href="/" className="text-lg font-sans font-bold mr-10 whitespace-nowrap">Angora Forms</Link>
          <Link href="/docs" className="text-sm me-8 underline max-md:hidden">Docs</Link>
        </span>

        <span className="justify-self-end flex items-end">
          <HamburgerMenu />
          <Link href="/login" className="text-sm mx-6 underline max-md:hidden">Login</Link>
          <Link href="/signup" className="text-sm bg-red-600 hover:bg-red-400 text-white py-1 px-2 border-b-4 border-red-700 hover:border-red-700 rounded max-md:hidden">Sign Up</Link>
        </span>
        
      </div>
    );
    
  } else {
    
    return (
      <div className="flex justify-between mx-4">
        <span className="justify-self-start flex items-end">
          <Link href="/" className="text-lg font-sans font-bold mr-8 whitespace-nowrap">Angora Forms</Link>
          <Link href="/docs" className="text-sm mx-4 underline max-md:hidden">Docs</Link>
          <Link href="/componentBank" className="text-sm inline-block bg-red-600 mx-4 hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded max-md:hidden">
            Component Bank
          </Link>
          <Link href="/FormBuilder" className="text-sm inline-block bg-red-600 mx-4 hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded max-md:hidden">
            Form Builder
          </Link>
        </span>

        <span className="justify-self-end flex items-end "> 
          <HamburgerMenu/>
          <p className='max-md:hidden'>Welcome, {auth}!</p>
          <button className="text-sm bg-gray-500 hover:opacity-70 text-white py-1 px-2 ml-7 border-b-4 rounded border-gray-600 max-md:hidden">
            <Link href="/" onClick={logout}>Log Out</Link>
          </button>          
        </span>
      </div>
    );
  }

}

