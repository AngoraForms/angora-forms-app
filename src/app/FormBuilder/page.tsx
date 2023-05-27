'use client'
import { useState } from "react";
import Customizers from "../(components)/Customizers";
import TSBuilder from "../(components)/TSBuilder"
import HTMLBuilder from "../(components)/HTMLBuilder";
import { JsxElement } from "typescript";

export default function FormBuilder () {
  //type definitions

  //define the text content of the tab buttons
  const HTMLButtonText: string = "HTML File";
  const TSButtonText: string = "TypeScript File";
  //this is where state is first defined for the form configuration
  //the formControl Arrray is going to contain all the html components and initialize to an empty array
  const [currentConfig, setCurrentConfig] = useState<{}>({
    formControl: [],
    initialValues: [],
    inputType: [],
    validators: []
  });
  const [fileTab, setFileTab] = useState<string>('html')

  // let currentTab: JSX.Element;
  // switch (fileTab) {
  //   case 'ts':
  //     currentTab = <TSBuilder currentConfig={currentConfig}/>;
  //     break;
  //   case 'html':
  //     currentTab = <HTMLBuilder currentConfig={currentConfig}/>;
  //     break;
  //   default:
  //     currentTab = <TSBuilder currentConfig={currentConfig}/>;
  // }


  //Options component: passing down currentConfig State and the setCurrentConfig method to allow Options component to alter state
  //Result component: is going to sense the change in the currentConfig state and rerender itself
  return (
    <div className="mt-6 flex justify-evenly items-center">   
      <Customizers currentConfig={currentConfig} setCurrentConfig={setCurrentConfig} />
      <div className="flex flex-col justify-evenly w-1/2 ">
        <header>
          <button className="inline border border-black w-1/2 rounded-tl-md py-1 hover:bg-red-400 hover:text-white duration-500"
          onClick={() => setFileTab('html')}>
            HTML File
          </button>
          <button className="inline border border-black w-1/2 rounded-tr-md py-1 whitespace-nowrap hover:bg-blue-400 hover:text-white duration-500"
          onClick={() => setFileTab('ts')}>
            TypeScript File
          </button>
        </header>
        <div style={{display: fileTab === 'html' ? 'inline-block' : 'none'}}>
          <HTMLBuilder currentConfig={currentConfig}/>
        </div>
        <div style={{display: fileTab === 'ts' ? 'inline-block' : 'none'}} >
          <TSBuilder currentConfig={currentConfig}/>
        </div>
      </div>
    </div>
  )
}