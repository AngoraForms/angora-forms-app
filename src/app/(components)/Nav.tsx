'use client'

import React, { useState, useEffect } from "react";
import { deleteCookie } from "cookies-next";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";


export function NavBar() {

  const router = useRouter();
  const [authenticated, setAuthenticated] = useState('none')

  console.log('NavBar re-render')
  
  console.log('state is:',authenticated)
   function logout() {

    deleteCookie('key')
    setAuthenticated('none')
    router.push('/')

  }

  // we need to make currentToken a string or something. 
  // use effect in this space
  useEffect(() => {

    console.log('in useEffect')
    
    async function fetchData() {

      const currentToken = Cookies.get('key')
  
        if (currentToken) {
    
          const data = {
            currentToken: currentToken,
            type: 'auth'
          }
      
        try {
          const currentSession = await fetch('/api/users',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data),
          })
            const authenticatedSession = await currentSession.json()
            // handle error for logout. error in object authenticatedSession from async call on currentSession.json()
            console.log('authenticated session:', authenticatedSession)
    
            setAuthenticated(authenticatedSession.user)

        }
        catch {
          setAuthenticated('none')
        }
        } else {
          setAuthenticated('none')
        }
    }

    fetchData()
    
  })


  if(authenticated === 'none') {
    
    return (
      <div>
        <span className="text-lg font-bold"></span>
          <Link href="/login" className="text-sm mx-6 me-8 hover:underline">Login</Link>
          <span className="text-lg"></span>
          <Link href="/signup" className="text-sm bg-red-600 me-8 mx-8 hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded">Sign Up</Link>
      </div>
    )
    
  } else {
    
    return (
      <div>
          <Link href="/componentBank" className="text-sm bg-red-600 me-4 mx-2 hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded">Component Bank</Link>
          <Link href="/formBuilder" className="text-sm bg-red-600 me-4 ml-2 mr-64 hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded">Form Builder</Link>
          
            Welcome, {authenticated}
          
          <button className="text-sm bg-gray-500 hover:opacity-70 text-white py-1 px-2 ml-7 border-b-4 rounded border-gray-600">
            <Link href="/" onClick={logout}>Log out</Link>
          </button>          
      </div>
    )
  }

}

