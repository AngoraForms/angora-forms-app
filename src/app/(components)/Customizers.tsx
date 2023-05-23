'use client'
import React from "react"

export default function Customizers (props: any) {

  //add form updates the state initially declare in FormBuilder page
  const addForm = (e: {}) => {
    props.setCurrentConfig((prevState: {}) => ({
      ...prevState,
      formControl: [...prevState.formControl, e.target.name]
    }));
  }

  return (
    <div className="bg-red-400 h-screen">
      <h1 className="text-center">Options</h1>
      <ul>
        <li className="flex">
          <label htmlFor="">Username</label> 
          <button name="username" className="bg-red-700" onClick={(e) => addForm(e)}> Add </button>
        </li>
        <li className="flex">
          <label htmlFor="">Password</label> 
          <button name="password" className="bg-red-700" onClick={(e) => addForm(e)}> Add </button>
        </li>
      </ul>
    </div>
  )
}