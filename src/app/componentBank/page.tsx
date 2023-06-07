'use client';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import controllers from '../../../lib/controllers';
import { useEffect, useState } from 'react';

export default function ComponentBank() {
  //code state is going to be the code that is displayed in the Editor component after being fetched
  const [code, setCode] = useState<
    | {
        componentid: number;
        html: string | undefined | null;
        typescript: string | null | undefined;
      }[]
    | null
  >(null);

  // if (code !== null) {
  //getCode function is going to fetch the saved Code and set it into code state
  const getCode = async () => {
    //getUserId is a component saved in lib that gets the userId based on cookie
    const userid = await controllers.getUserId();
    const response = await fetch('/api/savedComponents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'getCode', userid: userid }),
    });
    const data = await response.json();
    setCode(data.message);
  };

  useEffect(() => {
    //get code from database and the loop over it and save into variable
    getCode();
  }, []);

  //changes page aka go to the next page
  const [pageIndex, setPageIndex] = useState<number>(0);
  const changePages = (action: string) => {
    let maxPageIndex;
    if (!code) maxPageIndex = 0;
    else maxPageIndex = code.length - 1;
    //ensures that page number of aligned with how many saved code templates there are
    if (action === '+') {
      setPageIndex(pageIndex + 1);
      if (pageIndex >= maxPageIndex) setPageIndex(0);
    } else if (action === '-') {
      if (pageIndex !== 0) setPageIndex(pageIndex - 1);
    }
  };

  //inputSearch: tracks keypress into input
  //searchBlurred: track if the form has been submitted once already, error message onyl appear if set true
  //goodSearch: tracks searched formGroup is valid
  const [inputSeach, setInputSearch] = useState<string>('');
  const [searchBlurred, setSearchBlurred] = useState<boolean>(false);
  const [goodSearch, setGoodSearch] = useState<boolean>(false);
  //iterate through code array and search for groupname that matches with input
  const searchByGroupName = (formGroup: string): void => {
    setSearchBlurred(true);
    if (code !== null && code.length === 0) {
      setGoodSearch(false);
      return;
    }
    let found = false;
    if (code !== null) {
      for (let i = 0; i < code.length; i++) {
        if (
          code[i] &&
          code[i].html?.includes(formGroup) &&
          code[i].typescript?.includes(formGroup)
        ) {
          found = true;
          setPageIndex(i);
          break;
        }
      }
    }
    found ? setGoodSearch(true) : setGoodSearch(false);
  };

  //function to remove the current code from the dataBase utilizing pageIndex and componentId
  const deleteComponent = async () => {
    if (code !== null) {
      //getting the component id that we are currently on and sending it as part of the body with fetch
      const currentComponentId = code[pageIndex].componentid;
      const response = await fetch('/api/savedComponents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'deleteCode',
          componentid: currentComponentId,
        }),
      });
      const data = await response.json();
      //invoking getCode allow us to reload code state which determines what is displayed on the editor component
      getCode();
      //resets back to initial page after resetting
      setPageIndex(0);
    }
  };
  // }

  return (
    <div className="flex flex-col mx-2 mt-[120px] h-full ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchByGroupName(inputSeach);
        }}
        className="relative m-5 flex justify-evenly bg-gray-300 rounded-full p-2"
      >
        <input 
          className="w-3/4 p-2 rounded-md bg-gray-300"
          onChange={(e) => setInputSearch(e.target.value)}
          type="search"
          placeholder="Search for component"
        />
        <input
          className="absolute top-1/2 right-10 -translate-y-1/2 rounded-md duration-500 hover:text-white"
          value="&#128269;"
          type="submit"
        />
      </form>
      {goodSearch === false && searchBlurred && (
        <div className="text-red-400 text-center mb-5">
          FormGroup is not found, please check and search again
        </div>
      )}
      
      <div className="w-full flex max-sm:grid max-sm:grid-cols-1 ">
        {/* if code is empty, then display Loading page, otherwise show Editor component */}
        {code === null ? (
          <h1 className="text-4xl text-primary m-auto p-5 animate-bounce">
            Loading...
          </h1>
        ) : (
          <>
            <div className="w-1/2 relative max-sm:w-full">
              <Editor
                className="border-2 bg-gray-100 rounded-md w-full min-h-[400px] duration-500 hover:border-red-400"
                value={`${code[pageIndex]?.html}`}
                onValueChange={() => null}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
              <span
                onClick={(e) => controllers.copyCode(e)}
                className="material-symbols-outlined absolute top-2 right-2 duration-500 hover:text-red-400 hover: cursor-pointer"
              >
                content_paste
              </span>
            </div>
            <div className="w-1/2 relative max-sm:w-full">
              <Editor
                className="border-2 bg-gray-100 rounded-md w-full min-h-[400px] duration-500 hover:border-blue-400"
                value={`${code[pageIndex]?.typescript}`}
                onValueChange={() => null}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
              <span
                onClick={(e) => controllers.copyCode(e)}
                className="material-symbols-outlined absolute top-2 right-2 duration-500 hover:text-blue-400 hover: cursor-pointer"
              >
                content_paste
              </span>
            </div>
          </>
        )}
      </div>
      {/* buttons */}
      <div id="buttons" className="flex justify-between mb-3 mt-5">
        <button
          className="p-2 border-2 border-primary text-primary rounded duration-500 hover:bg-primary hover:text-white"
          onClick={deleteComponent}
        >
          Delete
        </button>
        <div className="flex justify-between items-center w-1/4">
          <button
            className="duration-500 hover:text-red-400"
            onClick={() => changePages('-')}
          >
            &#9664;
          </button>
          <h1>{pageIndex + 1}</h1>
          <button
            className="duration-500 hover:text-red-400"
            onClick={() => changePages('+')}
          >
            &#9654;
          </button>
        </div>
      </div>
    </div>
  );
}
