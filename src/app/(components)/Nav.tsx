'use client'

import React, { useState, useEffect } from "react";
import { getCookies, deleteCookie } from "cookies-next";
import Link from "next/link";


export function NavBar() {

  const [authenticated, setAuthenticated] = useState(0)

    
  console.log('NavBar re-render')
  
  console.log('state is:',authenticated)
   function logout() {
    deleteCookie('key')
    setAuthenticated(0)
  }

  // we need to make currentToken a string or something. 
  // use effect in this space
  useEffect(() => {

    console.log('in useEffect')
    
    async function fetchData() {

      const currentToken = getCookies('key')
  
        if (Object.keys(currentToken).length > 0) {
    
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
    
            setAuthenticated(authenticatedSession.userId)
        }
        catch {
          setAuthenticated(0)
        }
        } else {
          setAuthenticated(0)
        }
    }

    fetchData()
    
  })


  if(authenticated === 0) {
    
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
          <Link href="/componentBank" className="text-sm m-auto hover:underline">Component Bank</Link>
          <Link href="/formBuilder" className="text-sm me-8 hover:underline">Form Builder</Link>
        <Link href="/" className="text-sm m-auto hover:underline" onClick={logout}>Log out</Link>
      </div>
    )
  }

}

