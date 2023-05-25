'use client'
import React, { useEffect, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another


export default function TSEditor (props: any) {
  //currentConfig is the state that is drilled down from FormBuilder page
  const { currentConfig } = props;
  const [formControlConfig, setFormControlConfig] = useState([]);
  const [code, setCode] = useState('');

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
  },[props])
  return (
    // Editor componenet is a code editor IDE
    //value is the template of the typescript file of the form
    <div className='border'>
      <Editor
      className='bg-white'
      value={`export class angoraForm implements OnInit {
  Angoraform: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.Angoraform = this.formBuilder.group({
${formControlConfig}
    })
  }`}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </div>

  );
}