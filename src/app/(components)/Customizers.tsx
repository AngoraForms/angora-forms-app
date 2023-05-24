'use client'
import PreviousMap from "postcss/lib/previous-map";
import React from "react"
import { useState } from "react"

const initialValidationState = {
  required: false,
  emailValidation: false,
  minLengthValidation: null,
  maxLengthValidation: null,
  passwordValidation: null
};

export default function Customizers (props: any) {

  const [formInputValue, setFormInputValue] = useState('');
  const [formInitialValue, setFormInitialValue] = useState('');

  //validation States
  const [validatorConfiguration, setValidatorConfiguration] = useState(initialValidationState)
  const [minLength, setMinLength] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [validators , setValidators] = useState([]);
  //function that manipulate validatorConfiguration depending on selection
  //add form updates the state initially declare in FormBuilder page
  const addForm = (inputValue: string, formInitialValue: string, validatorConfiguration: {}) => {
    const currentInputValidator: string[] = [];
    //setting up the validator state using setValidator based on validator configuration
    for (const [key, value] of Object.entries(validatorConfiguration)) {
      if (key === 'required' && value === true) {
        currentInputValidator.push('Validators.required');   
      } else if (key === 'emailValidation' && value === true) {
        currentInputValidator.push('Validators.email')
      }
    }

    setValidators(() => {
      validators.push(currentInputValidator);
      return validators;
    });  
    console.log('the validator', validators)
    //using useState to change the configuration of the form
    props.setCurrentConfig((prevState: {
      formControl: string[],
      initialValues: string[],
      validators: string[][],
    }) => ({
      ...prevState,
      formControl: [...prevState.formControl, inputValue],
      initialValues: [...prevState.initialValues, formInitialValue],
      validators: [...prevState.validators, validators]
    }));
    console.log('post sretCuyrrent', props)
  }

  return (
    <div className="bg-red-400 h-screen">
      <h1 className="text-center">Options</h1>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        addForm(formInputValue, formInitialValue, validatorConfiguration);
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
        <div id="validators" className="flex flex-col">
          <div>
            <label htmlFor="">Required</label>
            <input name="required" type="checkBox" onClick={(e) => {
              if (e.target.checked) setValidatorConfiguration({...validatorConfiguration, required: true});
              else setValidatorConfiguration({...validatorConfiguration, required: false});
            }}/>            
          </div>
          <div>
            <label htmlFor="emailValidation">EmailValidation</label>
            <input name="emailValidation" type="checkBox" onChange={(e) => {
              if (e.target.checked) {
                setValidatorConfiguration({...validatorConfiguration, emailValidation: true});
              } else {
                setValidatorConfiguration({...validatorConfiguration, emailValidation: false});
              }
            }} />
          </div>
          {/* <div>
              <label htmlFor="minLengthValidation">MinLength</label>
              <input name="minLengthValidationInput" onChange={(e) => {
                setMinLength(Number(e.target.value));
              }}/>
              <input type="checkBox" name="minLengthValidationConfirm" onChange={(e) => {
                if (e.target.checked) {
                  setValidatorConfiguration({...validatorConfiguration, minLength: minLength});
                }
              }}/>
          </div> */}
          {/* <div>
              <label htmlFor="maxLengthValidation">MaxLength</label>
              <input name="maxLengthValidation" onChange={(e) => {
                setMaxLength(e.target.value)
              }}/>
          </div> */}
        </div>
        <input type="reset" value="Reset Input"/>
        <input type="submit" value="Create Input"/>
      </form>
    </div>
  )
}