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
        <button>
          <Link href="/login" className="text-sm m-auto hover:underline">Login</Link>
        </button>
        <button>
          <Link href="/signup" className="text-sm m-auto hover:underline">Sign Up</Link>
        </button>
      </div>
    )
    
  } else {
    
    return (
      <div>
        <button>
          <Link href="/componentBank" className="text-sm m-auto hover:underline">Component Bank</Link>
        </button>
        <button>
          <Link href="/formBuilder" className="text-sm m-auto hover:underline">Form Builder</Link>
        </button>
        <Link href="/" className="text-sm m-auto hover:underline" onClick={logout}>Log out</Link>
      </div>
    )
  }

}

