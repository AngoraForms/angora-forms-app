'use client'
import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another


export default function TSEditor (props: any) {
  //currentConfig is the state that is drilled down from FormBuilder page
  const { currentConfig } = props;
  const [code, setCode] = useState('');

  return (
    // Editor componenet is a code editor IDE
    <div className='border'>
      <Editor
      className='bg-white'
      value={`export class login implements OnInit {
  Angoraform: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.Angoraform = this.formBuilder.group({
      ${currentConfig.formControl[0]} : ['',[]],
      ${currentConfig.formControl[1]} : ['',[]]
    })
  }
        `}
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