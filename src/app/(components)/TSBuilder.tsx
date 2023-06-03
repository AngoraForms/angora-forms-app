'use client'
import React, { useEffect, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import controllers from '../../../lib/controllers';


export default function TSEditor (props: any) {

  //create a reference to the Editor component allowing to grab the value which is the code in the editor
  const IdeRef = useRef(null);

  //currentConfig is the state that is drilled down from FormBuilder page
  //press reset button allow us toreset form configuration within this component
  //setTSCode is a method that will help save the current TS code
  const { currentConfig, pressResetButton, setTsCode } = props;
  const [formControlConfig, setFormControlConfig] = useState<string[]>([]);

  const [code, setCode] = useState<string>('');
  
  //intialRender variable help us prevent useEffect from running on initial load
  //useRef makes it so that initialRender doesn't go back to true (initial state) since useEffect rerenders component
  let initialRender: {current: boolean} = useRef(true);
  //useEffect is used to detect changes of props (the states from FormBuilder)
  useEffect(() => {
    if (initialRender.current === true) {
      initialRender.current = false;
    }
    else {
      //newArray is used to contain the new set of validations
      let newArray:string[] = [];
      for (let i = 0; i < currentConfig.validators.length; i++) { 
        if (currentConfig.inputType[i] === 'submit') continue;
        //controllers stores the string version of the form controllers and the spaces needed
        // DO NOT TOUCH!!!
        let controller:string;
        ( i === 0 ) ? controller = "     " + currentConfig.formControl[i] + " : ['" + currentConfig.initialValues[i] + "', [" + currentConfig.validators[i] + "]] " 
        : controller = "\n     " + currentConfig.formControl[i] + " : ['" + currentConfig.initialValues[i] + "', [" + currentConfig.validators[i] + "]] ";
        setFormControlConfig(() => {
          newArray.push(controller);
          return newArray;
        })
      }           
    }
      // setTimeout(() => setTsCode(IdeRef.current.props.value), 250)
  },[currentConfig])

  //useEffect to detect changes in the TS code editor and gives it to parent to save
  useEffect(() => {
    //there needs to be a delay for the TS code editor to be editted before going in
    setTsCode(IdeRef.current.props.value)
  }, [currentConfig.formGroupName,formControlConfig])

  //whenever resetbutton is pressed, we refet the form configuration
  useEffect(() => {
    if (initialRender.current === true) {
      initialRender.current = false;
    } else {
      setFormControlConfig([]);
    }
  },[pressResetButton])

  return (
    // Editor componenet is a code editor IDE
    //value is the template of the typescript file of the form
    <div
      className='relative min-h-[400px] border border-blue-400 shadow-xl rounded-b-md p-2 w-full resize-y overflow-auto'>
      <Editor
      ref={IdeRef}
      value={`export class ${currentConfig.formGroupName} implements OnInit {
        ${currentConfig.formGroupName}: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.${currentConfig.formGroupName} = this.formBuilder.group({
${formControlConfig}
    })
  }
  onSubmit() {
    //this is where the submit logic goes
  }`}
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}/>
      <span onClick={(e) => controllers.copyCode(e)}
        className="material-symbols-outlined absolute top-2 right-2 duration-500 hover:text-blue-400 hover: cursor-pointer">
        content_paste
      </span>
    </div>

  );
}