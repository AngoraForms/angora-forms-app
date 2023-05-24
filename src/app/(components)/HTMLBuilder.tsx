'use client'
import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another


export default function HTMLBuilder (props: any) {
  const [code, setCode] = useState('')
  const { currentConfig } = props;
  const [initialLoad, setInitialLoad] = useState(false)
  const [formStructure, setFormStructure] = useState([])
  
//useEffect is used to detect any changes within formControl property of state by looking at the length
  useEffect(() => {
//useEffect loads once on initial render so initialLoad set to false is used to make sure set Form structure isn't ran onLoad
    if (initialLoad === false) {
      setInitialLoad(true)
    } else {
//generate new Component based on the name of the buttom that was clicked by looking at the last item of formControl
      const inputName = currentConfig.formControl[currentConfig.formControl.length - 1];
      setFormStructure([...formStructure,`
  <div>
    <div> 
      <label for="${inputName}">${inputName}:</label> 
      <input type="text" id="${inputName}" name="${inputName}">
    </div>
  </div>
  `
        ])
    }
  }, [currentConfig.formControl.length]);

  return (
    <div className="h-screen">
      <Editor
        className=''
        value={(`<form [formGroup]="angoraForm" (ngSubmit)="onSubmit()"> \n ${formStructure} \n</form>`).replaceAll(',','')}
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
