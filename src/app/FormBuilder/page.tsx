'use client'
import { useState } from "react";
import Customizers from "../(components)/Customizers";
import TSBuilder from "../(components)/TSBuilder"
import HTMLBuilder from "../(components)/HTMLBuilder";

export default function FormBuilder () {
  //this is where state is first defined for the form configuration
  //the formControl Arrray is going to contain all the html components and initialize to an empty array
  const [currentConfig, setCurrentConfig] = useState({
    formControl: []
  });

  //Options component: passing down currentConfig State and the setCurrentConfig method to allow Options component to alter state
  //Result component: is going to sense the change in the currentConfig state and rerender itself
  return (
    <div className='grid grid-cols-3'>   
      <Customizers currentConfig={currentConfig} setCurrentConfig={setCurrentConfig} />
      <TSBuilder currentConfig={currentConfig}/>
      <HTMLBuilder currentConfig={currentConfig}/>
    </div>
  )
}