'use client';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import controllers from '../../../lib/controllers';
import { ConfigType } from '../../../lib/types';

export default function HTMLBuilder(props: {currentConfig: ConfigType, pressResetButton: number, setHTMLCode: Dispatch<SetStateAction<string>>}) {

  //create a reference to the Editor component allowing to grab the value which is the code in the editor
  const IdeRef = useRef<any | undefined>(null);
  
  // const [code, setCode] = useState('')
  const { currentConfig, pressResetButton, setHTMLCode } = props;
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [formStructure, setFormStructure] = useState<string[]>([]);

  //useEffect is used to detect any changes within formControl property of state by looking at the length
  useEffect(() => {
    //useEffect loads once on initial render so initialLoad set to false is used to make sure set Form structure isn't ran onLoad
    if (initialLoad === false) {
      setInitialLoad(true);
    } else {
      //generate new Component based on the name of the buttom that was clicked by looking at the last item of formControl
      const inputName =
        currentConfig.formControl[currentConfig.formControl.length - 1];
      const inputType =
        currentConfig.inputType[currentConfig.inputType.length - 1];
      const labelText =
        currentConfig.labelText[currentConfig.labelText.length - 1];
      let errorHandler = '';
      if (currentConfig.validators.length !== 0) {

        const errorMessage = currentConfig.errorMessage[currentConfig.errorMessage.length - 1];
        if (errorMessage !== '') {
          errorHandler = `<div *ngIf="form.${inputName}.invalid && (form.${inputName}.dirty || form.${inputName}.touched)">
            <div *ngIf="form.${inputName}.errors">${errorMessage}</div>
          </div>`;
        }
      }

      setFormStructure([
        ...formStructure,`
<div>
  <div> 
    <label for="${inputName}">${labelText}</label> 
    <input type="${inputType}" id="${inputName}" name="${inputName}">
    ${errorHandler}
  </div>
</div>
`,
      ]);
    }
  }, [currentConfig]);
  //useEffect to detect changes in the HTML code editor and gives it to parent to save
  useEffect(() => {
    if (initialLoad === false) {
      setInitialLoad(true);
    } else {
      if (IdeRef.current !== null || IdeRef.current !== undefined) {
        setHTMLCode(IdeRef.current.props.value);
      }
    }
  }, [formStructure]);

  //will detect reset button pressing in parent component
  useEffect(() => {
    if (initialLoad === false) {
      setInitialLoad(true);
    } else setFormStructure([]);
  }, [pressResetButton]);

  return (
    <div
      className="inline-block relative p-2 
    border border-black shadow-xl rounded-b-md 
    w-full min-h-[400px] overflow-auto resize-y"
    >
      <Editor
        ref={IdeRef}
        value={`<form [formGroup]="${currentConfig.formGroupName}" \n (ngSubmit)="onSubmit()"> \n ${formStructure} \n</form>`.replaceAll(
          ',',
          ''
        )}
        onValueChange={() => null}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <span
        onClick={(e) => controllers.copyCode(e)}
        className="material-symbols-outlined absolute top-2 right-2 duration-500 hover:text-red-400 hover: cursor-pointer"
      >
        content_paste
      </span>
    </div>
  );
}
