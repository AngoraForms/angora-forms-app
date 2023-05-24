'use client'
import PreviousMap from "postcss/lib/previous-map";
import React from "react"
import { useState } from "react"
export default function Customizers (props: any) {
  const [formInputValue, setFormInputValue] = useState('');
  const [formInitialValue, setFormInitialValue] = useState('');
  const [validators , setValidators] = useState([]);
  //add form updates the state initially declare in FormBuilder page
  const addForm = (inputValue: string, formInitialValue: string, validators: string[]) => {
    props.setCurrentConfig((prevState: {}) => ({
      ...prevState,
      formControl: [...prevState.formControl, inputValue],
      initialValues: [...prevState.initialValues, formInitialValue],
      validators: [...prevState.validators, validators]
    }));

  }

  return (
    <div className="bg-red-400 h-screen">
      <h1 className="text-center">Options</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        addForm(formInputValue, formInitialValue, validators);
      }}>
        <div>
          <label htmlFor="inputName">inputName</label>
          <input name="inputName" onChange={(e) => setFormInputValue(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="initialValue">InitialValue</label>
          <input name="initialValue" onChange={(e) => setFormInitialValue(e.target.value)}/>
        </div>
        <h1>Validators</h1>
        <div id="validators">
          <label htmlFor="">Required</label>
          <input name="required" type="checkBox" onChange={(e) => {
            if (e.target.checked) {
              setValidators([...validators, 'Validators.required'])
            }
          }}/>
          <label htmlFor="">EmailValidation</label>
          <input name="emailValidation" type="checkBox" onChange={(e) => {
            if (e.target.checked) {
              setValidators([...validators, 'Validators.email'])
            }
          }} />
        </div>
        <input type="reset" value="Reset Input"/>
        <input type="submit" value="Create Input"/>
      </form>
    </div>
  )
}