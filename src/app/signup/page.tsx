'use client'

import { useForm } from 'react-hook-form';

export default function Signup() {

  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      username:"",
      email:"",
      password:""
    }
  });

  return (
    <div>
      <div className = "min-h-screen grid place-content-center">
      <p>signup</p>
      <form onSubmit = {handleSubmit((data) => {
        // handle async get to db here w/ try + catch
        // if their account doesn't exist, return error and route to sign up page
      })}>
        <input {...register("username", {required: 'username is required'})} className = "box-border h-25 w-40 p-4 border-4 hover:box-content" autoFocus placeholder = "Username"/>
        <p>{errors.username?.message}</p>
        <input {...register("email", {required: 'email is required'})} className = "box-border h-25 w-40 p-4 border-4 hover:box-content" placeholder = "Email"/>
        <p>{errors.email?.message}</p>
        <input {...register("password", {required: 'password is required'})} className = "box-border h-25 w-40 p-4 border-4 hover:box-content" placeholder = "Password"/>
        <p>{errors.password?.message}</p>
        <input type = "submit"/>
      </form>
      </div>
    </div>
  )
}

// signup should require username AND email
// add pseudocode 