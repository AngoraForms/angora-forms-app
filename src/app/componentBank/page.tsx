'use client'

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { getCookies } from 'cookies-next';
import router from 'next/router';
import { useEffect, useState } from 'react';

export default function ComponentBank () {
  //function that gets userID from cookie
  const getUserId = async () => {

    const currentToken = getCookies('key');

    //if the currentToken returns a value then we make fetch requst, else we reroute to login
    if (Object.keys(currentToken).length > 0) {

      const data = {
        currentToken: currentToken,
        type: 'auth'
      }
  
      const currentSession = await fetch('/api/users',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data),
    })
      const authenticatedSession = await currentSession.json()
      return authenticatedSession.userId;

    } else {
      router.push('/login')
    }
  }

  const [code, setCode] = useState('');

  useEffect(() => {
    //get code from database and the loop over it and save into variable
    const getCode = async () => {
      const userid = await getUserId();
      console.log(userid)
      const response = await fetch('/api/savedComponents', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({type: 'getCode', userid: userid})
      })
      const data = await response.json();
      setCode(data.message);

    }
    getCode();
  },[])

  //changes page aka go to the next page 
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [htmlCodes, setHtmlCodes] = useState<string[]>([]);
  const [tsCodes, setTsCodes] = useState<string[]>([])
  const changePages = (action: string) => {
    console.log(code)
    let maxPageIndex = code.length - 1;
    //ensures that page number of aligned with how many saved code templates there are
    if (action === '+') {
      setPageIndex(pageIndex + 1);
      if (pageIndex === maxPageIndex) setPageIndex(0)
    } else if (action === '-') {
      if (pageIndex !== 0) setPageIndex(pageIndex - 1);   
    }
  }

  return (
    <div className="mx-2 mt-[100px] h-screen">
      <div className="w-1/2">
        <Editor
          className='border-2 bg-gray-100 rounded-md'
          value={`3123`}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        
      </div>
      <div className='flex justify-evenly'>
          <button className='duration-500 hover:text-red-400'
            onClick={() => changePages('-')}>
            &#9664;
          </button>
          <h1>{pageIndex + 1}</h1>
          <button className='duration-500 hover:text-red-400'
            onClick={() => changePages('+')}>
            &#9654;
          </button>
        </div>
    </div>
  )
}