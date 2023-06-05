'use client'

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import controllers from '../../../lib/controllers'
import { useEffect, useState } from 'react';

export default function ComponentBank () {
  //code state is going to be the code that is displayed in the Editor component after being fetched
  const [code, setCode] = useState< {componentid: number, html:string, ts:string}[] | string>('');

  //getCode function is going to fetch the saved Code and set it into code state
  const getCode = async () => {
    //getUserId is a component saved in lib that gets the userId based on cookie
    const userid = await controllers.getUserId();
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

  useEffect(() => {
    //get code from database and the loop over it and save into variable
    getCode();
  },[])

  //changes page aka go to the next page 
  const [pageIndex, setPageIndex] = useState<number>(0);
  const changePages = (action: string) => {
    let maxPageIndex = code.length - 1;
    //ensures that page number of aligned with how many saved code templates there are
    if (action === '+') {
      setPageIndex(pageIndex + 1);
      if (pageIndex >= maxPageIndex) setPageIndex(0)
    } else if (action === '-') {
      if (pageIndex !== 0) setPageIndex(pageIndex - 1);   
    }
  }

  //function to remove the current code from the dataBase utilizing pageIndex and componentId
  const deleteComponent = async () => {
    //getting the component id that we are currently on and sending it as part of the body with fetch
    const currentComponentId = code[pageIndex].componentid;
    const response = await fetch('/api/savedComponents',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({type:'deleteCode', componentid: currentComponentId})
    });
    const data = await response.json();
    //invoking getCode allow us to reload code state which determines what is displayed on the editor component
    getCode();
    //resets back to initial page after resetting
    setPageIndex(0);
  }

  return (
    <div className="flex flex-col mx-2 mt-[120px] h-screen ">
      <div id="buttons" className='flex justify-between mb-3'>
        <button className='p-5 border-2 border-primary text-primary rounded duration-500 hover:bg-primary hover:text-white'
          onClick={deleteComponent}>
          Remove Current Code
        </button>
        <div className='flex justify-between items-center w-1/4'>
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
      <div className="w-full flex max-sm:grid max-sm:grid-cols-1 ">
        {/* if code is empty, then display Loading page, otherwise show Editor component */}
        { 
        (code === '') ? (<h1 className='text-4xl text-primary m-auto p-5 animate-bounce'>
          Loading...
          </h1>) : 
        (<>
          <div className='w-1/2 relative max-sm:w-full'>
            <Editor
              className='border-2 bg-gray-100 rounded-md w-full'
              value={`${code[pageIndex]?.html}`}
              highlight={code => highlight(code, languages.js)}
              padding={10}
              style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 12}}
            />
            <span onClick={(e) => controllers.copyCode(e)}
              className="material-symbols-outlined absolute top-2 right-2 duration-500 hover:text-red-400 hover: cursor-pointer">
              content_paste
            </span>
          </div>
          <div className='w-1/2 relative max-sm:w-full'>
            <Editor
              className='border-2 bg-gray-100 rounded-md w-full'
              value={`${code[pageIndex]?.typescript}` }
              highlight={code => highlight(code, languages.js)}
              padding={10}
              style={{fontFamily: '"Fira code", "Fira Mono", monospace',fontSize: 12,}}
            />
            <span onClick={(e) => controllers.copyCode(e)}
              className="material-symbols-outlined absolute top-2 right-2 duration-500 hover:text-blue-400 hover: cursor-pointer">
              content_paste
            </span>
          </div>
        </>)}
      </div>
    </div>
  )
}