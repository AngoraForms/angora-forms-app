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
//grid place-content-center
  return (
    <div>
      <div className = "flex justify-center items-center h-screen">
        <div className="h-1/2 w-1/2 justify-items-center">
        <form className="min-h-full w-full space-y-4" onSubmit = {handleSubmit((data) => {
        // handle async get to db here w/ try + catch
        // if their account doesn't exist, return error and route to sign up page
        })}>
          <p className="text-3xl my-6" >Login</p>
          <input {...register("username", {required: 'username is required'})} className = "box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-2 rounded-lg hover:border-gray-400 border-4 hover:shadow-2xl" autoFocus placeholder = "Username"/>
          <p>{errors.username?.message}</p>
          <input {...register("email", {required: 'email is required'})} className = "box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-2 rounded-lg hover:border-gray-400 border-4 hover:shadow-xl" placeholder = "Email"/>
          <p>{errors.email?.message}</p>
          <input {...register("password", {required: 'password is required'})} className = "box-border h-1/10 w-full p-4 border-4 cursor-pointer bg-cover bg-center mb-2 rounded-lg hover:border-gray-400 border-4 hover:shadow-xl" placeholder = "Password"/>
          <p>{errors.password?.message}</p>
          <input type="submit" className="text-lg cursor-pointer bg-transparent hover:to-gray-300 hover:ring-2 hover:body-gray-300 hover:outline-none py-2 px-4 rounded-full" value="Submit"/>
        </form>
        </div>
      </div>
    </div>
  )
}

// login should accept username OR email
// add pseudocode 

