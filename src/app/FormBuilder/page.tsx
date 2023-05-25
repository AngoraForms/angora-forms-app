'use client'
import { useState } from "react";
import Customizers from "../(components)/Customizers";
import TSBuilder from "../(components)/TSBuilder"
import HTMLBuilder from "../(components)/HTMLBuilder";

export default function FormBuilder () {
  //this is where state is first defined for the form configuration
  //the formControl Arrray is going to contain all the html components and initialize to an empty array
  const [currentConfig, setCurrentConfig] = useState({
    formControl: [],
    initialValues: [],
    validators: []
  });

  //Options component: passing down currentConfig State and the setCurrentConfig method to allow Options component to alter state
  //Result component: is going to sense the change in the currentConfig state and rerender itself
  return (
    <div className='flex flex-col justify-around'>   
      <Customizers currentConfig={currentConfig} setCurrentConfig={setCurrentConfig} />
      <div className="flex flex-row justify-evenly">
        <TSBuilder currentConfig={currentConfig}/>
        <HTMLBuilder currentConfig={currentConfig}/>
      </div>
    </div>
  )
}