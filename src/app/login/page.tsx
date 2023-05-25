'use client'

import { useForm } from 'react-hook-form';

export default function Login() {

  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      username:"",
      email:"",
      password:""
    }
  });

  return (
    <div>
      <div className = "grid place-content-center">
      <form className="min-h-screen w-screen justify-items-center" onSubmit = {handleSubmit((data) => {
        // handle async get to db here w/ try + catch
        // if their account doesn't exist, return error and route to sign up page
      })}>
        <p className="text-3xl my-6" >Login</p>
        <input {...register("username", {required: 'username is required'})} className = "box-border h-1/10 w-2/5 p-4 border-4 cursor-pointer bg-cover bg-center mb-2 hover:border-gray-400 border-4 hover:shadow-2xl" autoFocus placeholder = "Username"/>
        <p>{errors.username?.message}</p>
        <input {...register("email", {required: 'email is required'})} className = "box-border h-1/10 w-2/5 p-4 border-4 cursor-pointer bg-cover bg-center mb-2 hover:border-gray-400 border-4 hover:shadow-xl" placeholder = "Email"/>
        <p>{errors.email?.message}</p>
        <input {...register("password", {required: 'password is required'})} className = "box-border h-1/10 w-2/5 p-4 border-4 cursor-pointer bg-cover bg-center mb-2 hover:border-gray-400 border-4 hover:shadow-xl" placeholder = "Password"/>
        <p>{errors.password?.message}</p>
        <input type = "submit" className="text-lg cursor-pointer bg-cover bg-center hover:underline" />
      </form>
      </div>
    </div>
  )
}

// login should accept username OR email
// add pseudocode 

