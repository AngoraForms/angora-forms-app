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
    console.log('open');
    setOpenMenu(!openMenu);
  };
  if(authenticated === 'none') {
    
    return (
      <div className="flex justify-between mx-4">
        <span className="justify-self-start">
          <Link href="/" className="text-lg font-sans font-bold mr-10 whitespace-nowrap">Angora Forms</Link>
          <Link href="/docs" className="text-sm me-8 underline">Docs</Link>
        </span>

        <span className="justify-self-end">
          <Link href="/login" className="text-sm mx-6 mr-10 underline">Login</Link>
          <Link href="/signup" className="text-sm bg-red-600 hover:bg-red-400 text-white py-1 px-2 border-b-4 border-red-700 hover:border-red-700 rounded">Sign Up</Link>
        </span>
      </div>
    );
    
  } else {
    
    return (
      <div className="flex justify-between mx-4">
        <span className="justify-self-start">
          <Link href="/" className="text-lg font-sans font-bold mr-10 whitespace-nowrap">Angora Forms</Link>
          <Link href="/docs" className="text-sm me-8 underline">Docs</Link>
          <Link href="/componentBank" className="text-sm bg-red-600 me-4 mx-2 hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded">Component Bank</Link>
          <Link href="/FormBuilder" className="text-sm bg-red-600 me-4 ml-2 hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded">Form Builder</Link>
        </span>
          
        <span className="justify-self-end">
              Welcome, {authenticated}!

          <button className="text-sm bg-gray-500 hover:opacity-70 text-white py-1 px-2 ml-7 border-b-4 rounded border-gray-600">
            <Link href="/" onClick={logout}>Log Out</Link>
          </button>          
        </span>
      </div>
    );
  }

}

