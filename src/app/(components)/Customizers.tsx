'use client';
import React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import { ConfigType } from '../../../lib/types'

const initialValidationState = {
  required: false,
  emailValidation: false,
  minLength: null,
  maxLength: null,
  passwordValidation: null,
  phoneNumberValidation: null,
};

export default function Customizers(props: {formGroupName: string, currentConfig: ConfigType, setCurrentConfig: Dispatch<SetStateAction<ConfigType>>}) {
  const {formGroupName, setCurrentConfig, currentConfig } = props;

  //keep track of the what was inputted into the input elements
  const [formInputValue, setFormInputValue] = useState<string>('');
  const [formLabelText, setFormLabelText] = useState<string>('');
  const [formInitialValue, setFormInitialValue] = useState<string>('');
  const [formTypeValue, setFormTypeValue] = useState<string>('');
  const [formErrorMessage, setFormErrorMessage] = useState<string>('');

  //state to track if necessary inputs were clicked on
  //this is used for error handling
  const [isTouched, setIsTouched] = useState<{
    [key: string]: boolean | string;
  }>({
    labelTextTouched: false,
    inputNameTouched: false,
    inputTypeTouched: false,
  });

  //detect if we touched the input elements 
  const handleBlur = (inputName: string) => {
    setIsTouched((prevIsTouched) => ({
      ...prevIsTouched,
      [inputName]: true,
    }));
  };

  //validation States
  //keep tracks of all validators
  const [validatorConfiguration, setValidatorConfiguration] = useState<any>(
    initialValidationState
  );

  const [minLength, setMinLength] = useState<number | null>(null);
  const [maxLength, setMaxLength] = useState<number | null>(null);
  const [validators, setValidators] = useState<string[][]>([]);
  
  //state to render dropdown of validator part of form
  const [validatorDropdown, setValidatorDropdown] = useState<{
    height: number | string;
    overflow: string;
  }>({ height: 0, overflow: 'hidden' });
  
  //function that open the validator dropdown by changing height style
  const openValidator = (): void => {
    if (validatorDropdown.height === 0)
      setValidatorDropdown({ height: 'auto', overflow: 'auto' });
    else setValidatorDropdown({ height: 0, overflow: 'hidden' });  };

  //function that checks if conditions are met and if so disable the submit functionality
  const checkConditions = (): boolean => {
    if (formInputValue.length > 0 && formTypeValue.length > 0) {
      return false;
    }
    return true;
  };

  //bottom state is suppose to be used to toggle usage of error messag input
  //if a validator is selected error message is not disabled. Will expand on later date
  // const [checkValidators, setCheckValidators] = useState<boolean>(true);

  //add form updates the state initially declare in FormBuilder page
  const addForm = (): void => {
    //this is the logic to ensure all the required input of the customizer form is fullfilled
    //if it isn't stop the function, else do the other logic
    let requirementFullfilled = true;
    for (const keys in isTouched) {
      if (!isTouched[keys]) {
        requirementFullfilled = false;
        break;
      }
    }
    if (requirementFullfilled === false) return;

    const currentInputValidator: string[] = [];
    //setting up the validator state using setValidator based on validator configuration
    for (const [key, value] of Object.entries(validatorConfiguration)) {
      if (key === 'required' && value === true) {
        currentInputValidator.push(' Validators.required');
      } else if (key === 'emailValidation' && value === true) {
        currentInputValidator.push(' Validators.email');
      } else if (key === 'minLength' && typeof value === 'number') {
        currentInputValidator.push(` Validators.minLength(${value})`);
      } else if (key === 'maxLength' && typeof value === 'number') {
        currentInputValidator.push(` Validators.maxLength(${value})`);
      } else if (key === 'passwordValidation' && value === true) {
        currentInputValidator.push(
          'Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+-=[]{};\':"|,.<>/?]).*$/)'
        );
      } else if (key === 'phoneNumberValidation' && value === true) {
        currentInputValidator.push(
          'Validators.pattern(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im)'
        );
      }
    }
    setValidators(() => {
      validators.push(currentInputValidator);
      return validators;
    });
    //using useState to change the configuration of the form
    setCurrentConfig((): ConfigType => ({
        ...currentConfig,
        formGroupName: formGroupName,
        formControl: [...currentConfig.formControl, formInputValue],
        initialValues: [...currentConfig.initialValues, formInitialValue],
        inputType: [...currentConfig.inputType, formTypeValue],
        labelText: [...currentConfig.labelText, formLabelText],
        errorMessage: [...currentConfig.errorMessage, formErrorMessage],
        validators: [...currentConfig.validators, validators],
      })
    );
    //reset state
    setFormInputValue('');
    setFormLabelText('');
    setFormInitialValue('');
    setFormTypeValue('');
  };
  return (
    <>
      {/* onSubmit, invoke addForm to build form controllers
      e.target.reset() empties the form after submission
       */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addForm();
          const formElement = e.target as HTMLFormElement;
          formElement.reset();
          setValidatorConfiguration(initialValidationState);
          setValidators([]);
        }}
        className="flex flex-col justify-evenly w-full
        border border-black shadow-xl rounded-lg px-10 py-5 
        overflow-auto resize-y min-h-[500px]
        max-sm:w-full"
      >
        <h1 className="text-2xl text-center">Form Customizer</h1>
        <div id="input-customizer">
          <div className="flex justify-between">
            <label htmlFor="label">LabelText</label>
            <input
              className="border border-black rounded-md px-2 w-1/2"
              name="labelText"
              onChange={(e) => {
                setFormLabelText(e.target.value);
              }}
              onBlur={() => handleBlur('labelTextTouched')}
            />
          </div>
          {/* Will display message under the input if condition isn't fullfilled: required and touched */}
          {formLabelText.length < 1 && isTouched.labelTextTouched == true && (
            <p className="text-end text-red-400">This is a required field</p>
          )}
          <div className="flex justify-between">
            <label htmlFor="inputName">InputName</label>
            <input
              className="border border-black rounded-md px-2 w-1/2"
              name="inputName"
              onChange={(e) => setFormInputValue(e.target.value)}
              onBlur={() => handleBlur('inputNameTouched')}
            />
          </div>
          {/* Will display message under the input if condition isn't fullfilled: required and touched */}
          {formInputValue.length < 1 && isTouched.inputNameTouched == true && (
            <p className="text-end text-red-400">This is a required field</p>
          )}

          <div className="flex justify-between">
            <label htmlFor="InputType">InputType</label>
            <select
              className="border border-black rounded-md px-2 w-1/2"
              name="InputType"
              id="selectInputTypes"
              onChange={(e) => setFormTypeValue(e.target.value)}
              onBlur={() => handleBlur('inputTypeTouched')}
            >
              <option value=""></option>
              <option value="button">button</option>
              <option value="checkbox">checkbox</option>
              <option value="color">color</option>
              <option value="date">date</option>
              <option value="datetime-local">datetime-local</option>
              <option value="email">email</option>
              <option value="file">file</option>
              <option value="hidden">hidden</option>
              <option value="image">image</option>
              <option value="month">month</option>
              <option value="number">number</option>
              <option value="password">password</option>
              <option value="radio">radio</option>
              <option value="range">range</option>
              <option value="reset">reset</option>
              <option value="search">search</option>
              <option value="submit">submit</option>
              <option value="tel">tel</option>
              <option value="text">text</option>
              <option value="time">time</option>
              <option value="url">url</option>
              <option value="">week</option>
            </select>
          </div>
          {/* Will display message under the input if condition isn't fullfilled: required and touched */}
          {formTypeValue.length < 1 && isTouched.inputTypeTouched == true && (
            <p className="text-end text-red-400">This is a required field</p>
          )}
          <div className="flex justify-between">
            <label htmlFor="initialValue">InitialValue</label>
            <input
              className="border border-black rounded-md px-2 w-1/2"
              name="initialValue"
              onChange={(e) => setFormInitialValue(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="errorMessage">Error Message</label>
            <input
              className="border border-black rounded-md px-2 w-1/2"
              name="errorMessage"
              onChange={(e) => setFormErrorMessage(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div
            onClick={openValidator}
            className="border border-black px-5 py-1 rounded-md
          hover:bg-black hover:text-white duration-500
          "
          >
            Validators &#9660;
          </div>
        </div>
        <div
          id="validators"
          className="flex flex-col justify-evenly"
          style={validatorDropdown}
        >
          <div className="flex justify-between">
            <label htmlFor="required">Required</label>
            <input
              name="required"
              type="checkBox"
              onClick={(e) => {
                const checkboxElement = e.target as HTMLInputElement;
                if (checkboxElement.checked) {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    required: true,
                  });
                } else {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    required: false,
                  });
                }
              }}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="emailValidation">Email Validation</label>
            <input
              name="emailValidation"
              type="checkBox"
              onChange={(e) => {
                if (e.target.checked) {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    emailValidation: true,
                  });
                } else {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    emailValidation: false,
                  });
                }
              }}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="passwordValidation">Password Validation</label>
            <input
              name="passwordValidation"
              type="checkBox"
              onChange={(e) => {
                if (e.target.checked) {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    passwordValidation: true,
                  });
                } else {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    passwordValidation: false,
                  });
                }
              }}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="phoneNumberValidation">
              Phone Number Validation
            </label>
            <input
              name="phoneNumberValidation"
              type="checkBox"
              onChange={(e) => {
                if (e.target.checked) {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    phoneNumberValidation: true,
                  });
                } else {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    phoneNumberValidation: false,
                  });
                }
              }}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="minLengthValidation">MinLength</label>
            <input
              className="border border-black rounded-md px-2 w-1/2"
              name="minLengthValidationInput"
              onChange={(e) => {
                setMinLength(Number(e.target.value));
              }}
            />
            <input
              type="checkBox"
              name="minLengthValidationConfirm"
              onChange={(e) => {
                if (e.target.checked) {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    minLength: minLength,
                  });
                } else {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    minLength: null,
                  });
                }
              }}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="maxLengthValidation">MaxLength</label>
            <input
              className="border border-black rounded-md px-2 w-1/2"
              name="maxLengthValidationInput"
              onChange={(e) => {
                setMaxLength(Number(e.target.value));
              }}
            />
            <input
              type="checkBox"
              name="maxLengthValidationConfirm"
              onChange={(e) => {
                if (e.target.checked) {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    maxLength: maxLength,
                  });
                } else {
                  setValidatorConfiguration({
                    ...validatorConfiguration,
                    maxLength: null,
                  });
                }
              }}
            />
          </div>
        </div>
        {/* first input (button) resets form by detecting the form that wraps it */}
        {/* second input is a submit input that will trigger an event noted within the form */}
        <div className="flex justify-evenly">
          <input
            className="border border-black p-3 rounded-md duration-500 hover:bg-red-600 hover:text-white"
            type="button"
            value="Clear Form"
            onClick={(e) => {
              const element = e.target as Element;
              const formElement = element.closest('form') as HTMLFormElement;
              if (formElement) {
                formElement.reset();
              }
            }}
          />
          <input
            className={`border border-black p-3 duration-500 
          ${
    checkConditions()
      ? 'bg-gray-300 text-gray-400 cursor-not-allowed rounded-md border-gray-400'
      : 'hover:bg-blue-600 hover:text-white rounded-md'
    } `}
            type="submit"
            value="Create Input"
            disabled={checkConditions()}
          />
        </div>
        {checkConditions() === true && (
          <p className="text-center text-red-400">
            Create Input button disabled, please fill out required field
          </p>
        )}
      </form>
    </>
  );
}
