'use client'
import { useState } from "react";
import Customizers from "../(components)/Customizers";
import TSBuilder from "../(components)/TSBuilder"
import HTMLBuilder from "../(components)/HTMLBuilder";

export default function FormBuilder () {
  //detects when reset button is pressed by incrementing the numericla value 
  //allow child component to detch when the button is pressed by looking at the value/count
  const [pressResetButton, setPressResetButton] = useState<number>(0);

  //stores group name
  const [formGroupName, setFormGroupName] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const handleBlur = () => {
    setIsTouched(true)
  };

  //this is where state is first defined for the form configuration
  //the formControl Arrray is going to contain all the html components and initialize to an empty array
  const [currentConfig, setCurrentConfig] = useState<{}>({
    formGroupName: '',
    formControl: [],
    initialValues: [],
    inputType: [],
    labelText: [],
    validators: []
  });
  const [fileTab, setFileTab] = useState<string>('html')

  //Options component: passing down currentConfig State and the setCurrentConfig method to allow Options component to alter state
  //Result component: is going to sense the change in the currentConfig state and rerender itself
  return (
    <>
      <div className="flex justify-evenly items-end">
        <div className="flex flex-col w-1/2 text-center mt-5">
          <label htmlFor="formGroup">Form Group Name</label>
          <input className="border border-black rounded-md p-2" 
            onChange={(e) => setFormGroupName(e.target.value)}
            name="formGroup" type="text" 
            onBlur={handleBlur}
          />
        { (formGroupName.length < 1) && (isTouched === true) && <p className="text-red-400"> Form Group is a required field</p>}
        </div>
        <button className="p-2 border border-black rounded-md hover:bg-red-400 duration-500"
          onClick={() => {
            //increment pressResetbutton so child can detech button press
            setPressResetButton(pressResetButton + 1);
            //turn it back to the default configuration after pressing reset
            setCurrentConfig({
              formGroupName: '',
              formControl: [],
              initialValues: [],
              inputType: [],
              labelText: [],
              validators: []
            })
          }}
        >
          RESET
        </button>
      </div>
      <div className="mt-6 flex flex-row justify-evenly items-start max-sm:flex-col">   
        <Customizers formGroupName={formGroupName} currentConfig={currentConfig} setCurrentConfig={setCurrentConfig} />
        <div className="flex flex-col justify-center w-1/2 h-1/2 max-sm:w-full max-sm:mt-5">
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
            <HTMLBuilder pressResetButton={pressResetButton} currentConfig={currentConfig}/>
          </div>
          <div style={{display: fileTab === 'ts' ? 'inline-block' : 'none'}} >
            <TSBuilder pressResetButton={pressResetButton} currentConfig={currentConfig}/>
          </div>
        </div>
      </div>
    </>
  )
}