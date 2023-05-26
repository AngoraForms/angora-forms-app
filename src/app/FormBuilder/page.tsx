'use client'
import { useState } from "react";
import Customizers from "../(components)/Customizers";
import TSBuilder from "../(components)/TSBuilder"
import HTMLBuilder from "../(components)/HTMLBuilder";

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
    validators: []
  });
  // const [fileTab, setFileTab] = useState<{htmlTab:boolean, typescriptTab: boolean}>({
  //   htmlTab: true,
  //   typescriptTab: false
  // })
  // const tabControl = (e:any) => {
  //   if (e.target.textContent === HTMLButtonText) {
  //     setFileTab(() => ({
  //       ...fileTab,
  //       htmlTab: true,
  //       typescriptTab: false
  //     }))
  //   } else if (e.target.textContent === TSButtonText) {
  //     setFileTab(() => ({
  //       ...fileTab,
  //       htmlTab: false,
  //       typescriptTab: true
  //     }))
  //   }
  // }
  //Options component: passing down currentConfig State and the setCurrentConfig method to allow Options component to alter state
  //Result component: is going to sense the change in the currentConfig state and rerender itself
  return (
    <div className="mt-6 flex justify-center items-center">   
      <Customizers currentConfig={currentConfig} setCurrentConfig={setCurrentConfig} />
      <div className=" flex flex-col justify-evenly">
        <header className="">
          <button className="border border-black w-1/2 rounded-tl-md py-1 hover:bg-red-400 hover:text-white duration-500">
            {HTMLButtonText}
          </button>
          <button className="border border-black w-1/2 rounded-tr-md py-1 hover:bg-blue-400 hover:text-white duration-500">
            {TSButtonText}
          </button>
        </header>
        <TSBuilder currentConfig={currentConfig}/>
        <HTMLBuilder currentConfig={currentConfig}/>
      </div>
    </div>
  )
}