'use client'
import { useEffect, useState } from "react";
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

  //these states are used to register the changes within the TS and HTML editors/IDE 
  const [htmlCode, setHTMLCode] = useState<string>('');
  const [tsCode, setTsCode] = useState<string>('');

  //save code, make post request 
  const saveEditor = async () => {
    // console.log(tsCode)
    // console.log(htmlCode)
    const savedCode: {htmlCode:string, tsCode:string} = {
      htmlCode: htmlCode,
      tsCode: tsCode
    }
    const response = await fetch('/api/savedComponents', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(savedCode)
    })
    const data = await response.json();
    console.log('data:', data)
  }
  // const [htmlComponents,setHtmlComponents] = useState<string[]>([])
  // const [tsComponents,setTsComponents] = useState<string[]>([])
  //store all the html and typescript code in a string as an array
  const htmlComponents: [] = [];
  const tsComponents: [] = [];
  const [code, setCode] = useState('');
  //get code from database and the loop over it and save into variable
  const getCode = async () => {
    const response = await fetch('/api/savedComponents')
    const data = await response.json();
    for (let i = 0; i < data.message.length; i++) {
      htmlComponents.push(data.message[i].html);
      tsComponents.push(data.message[i].typescript);
    }
    setCode(tsComponents[0]);
  }

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
            <HTMLBuilder setHTMLCode={setHTMLCode} pressResetButton={pressResetButton} currentConfig={currentConfig}/>
          </div>
          <div style={{display: fileTab === 'ts' ? 'inline-block' : 'none'}} >
            <TSBuilder setTsCode={setTsCode} pressResetButton={pressResetButton} currentConfig={currentConfig}/>
          </div>
          <button className=" m-auto border-2 border-red-400 text-red-400 rounded-md w-1/4 p-2 duration-500 hover:text-white hover:bg-red-400"
            onClick={saveEditor}
          >
            Save template
          </button>
          <button onClick={saveEditor}>Save Code</button>
          <button onClick={getCode}>Get code</button>
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
            {code}
          </pre>
        </div>
      </div>
    </>
  )
}